#!/usr/bin/env node
/*
 * RG Design System — lint di coerenza (zero dipendenze).
 * Uso:  node tools/ds-lint.mjs         (dalla radice del DS)
 * Exit: 0 se tutto coerente, 1 se ci sono violazioni (adatto a CI / pre-commit).
 *
 * Controlla che NON riparta la deriva doc<->CSS:
 *  1) ogni classe rg-* citata nel manifest (classes + snippet), nei doc components/*.md
 *     e patterns/*.md, e negli examples/*.html sia DEFINITA in styles/*.css;
 *  2) ogni percorso doc/patternRef/rulesRef del manifest esista su disco;
 *  3) ogni specimenAnchor del manifest esista come id nella components-library;
 *  4) i moduli (tutti tranne tokens.css) non contengano colori HEX crudi (solo token).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => path.join(ROOT, ...s);
const read = (f) => fs.readFileSync(f, 'utf8');
const listFiles = (dir, ext) => fs.existsSync(p(dir)) ? fs.readdirSync(p(dir)).filter(f => f.endsWith(ext)).map(f => path.join(dir, f)) : [];
const stripCssComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const violations = [];
const fail = (where, msg) => violations.push(`${where}: ${msg}`);

// Classi-marcatore volutamente non stilizzate (agganci JS), ammesse ovunque.
const MARKERS = new Set(['rg-autocomplete__input']);

// --- 1. Insieme delle classi rg-* DEFINITE nei moduli CSS ---
const styleFiles = [...listFiles('styles', '.css'), 'tokens.css'];
const defined = new Set();
for (const f of styleFiles) {
  for (const m of stripCssComments(read(p(f))).matchAll(/\.(rg-[A-Za-z0-9_-]+)/g)) defined.add(m[1]);
}
const isKnown = (cls) => defined.has(cls) || MARKERS.has(cls);
const rgClassesInAttr = (html) => [...html.matchAll(/class="([^"]*)"/g)]
  .flatMap(m => m[1].split(/\s+/)).filter(c => c.startsWith('rg-'));

// --- id presenti nella vetrina ---
const libFile = 'examples/rg-components-library.html';
const libIds = new Set(fs.existsSync(p(libFile))
  ? [...read(p(libFile)).matchAll(/id="([^"]+)"/g)].map(m => m[1]) : []);

// --- 2/3. Manifest ---
const manifest = JSON.parse(read(p('components.json')));
const appLocal = new Set((manifest.appLocalExceptions || []).flatMap(e => e.classes || []));
const collectRgStrings = (v, out) => {
  if (typeof v === 'string') { if (v.startsWith('rg-')) out.push(v); }
  else if (Array.isArray(v)) v.forEach(x => collectRgStrings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach(x => collectRgStrings(x, out));
  return out;
};
for (const c of manifest.components) {
  const where = `manifest/${c.id}`;
  for (const cls of collectRgStrings(c.classes, [])) {
    if (!isKnown(cls) && !appLocal.has(cls)) fail(where, `classe non definita nel CSS: .${cls}`);
  }
  if (c.snippet) for (const cls of rgClassesInAttr(c.snippet)) {
    if (!isKnown(cls) && !appLocal.has(cls)) fail(where, `snippet usa classe non definita: .${cls}`);
  }
  for (const key of ['doc', 'patternRef', 'rulesRef']) {
    const ref = c[key];
    if (ref) { const file = ref.split('#')[0]; if (!fs.existsSync(p(file))) fail(where, `${key} punta a un file inesistente: ${ref}`); }
  }
  if (c.specimenAnchor && libIds.size && !libIds.has(c.specimenAnchor)) {
    fail(where, `specimenAnchor "#${c.specimenAnchor}" assente nella vetrina`);
  }
}

// --- 1b. Doc (components + patterns + integration) e examples ---
for (const f of [...listFiles('components', '.md'), ...listFiles('patterns', '.md'),
                 ...listFiles('integration', '.md'), ...listFiles('examples', '.html')]) {
  for (const cls of rgClassesInAttr(read(p(f)))) {
    if (!isKnown(cls) && !appLocal.has(cls)) fail(f, `usa classe rg-* non definita nel CSS: .${cls}`);
  }
}

// --- 4. Nessun HEX crudo nei CSS (tokens.css escluso: è lì che i colori vivono).
//        Il raccordo in integration/ è soggetto alla stessa regola. ---
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;
for (const f of [...listFiles('styles', '.css'), ...listFiles('integration', '.css')]) {
  const hits = stripCssComments(read(p(f))).match(HEX);
  if (hits) fail(f, `colore HEX crudo (usare un token): ${[...new Set(hits)].join(', ')}`);
}

// --- 5. Il contratto di consumo deve restare allineato all'importOrder del manifest ---
const declaredOrder = manifest.importOrder || [];
const helper = 'integration/rg_ds_streamlit.py';
if (fs.existsSync(p(helper)) && declaredOrder.length) {
  const block = read(p(helper)).match(/MODULES[^=]*=\s*\(([\s\S]*?)\)/);
  const inHelper = block ? [...block[1].matchAll(/"([^"]+)"/g)].map(m => m[1]) : [];
  if (inHelper.join('|') !== declaredOrder.join('|')) {
    fail(helper, `MODULES diverge da components.json/importOrder:\n      helper:   ${inHelper.join(', ')}\n      manifest: ${declaredOrder.join(', ')}`);
  }
}

// --- 6. Icone (v1.17.0): ogni id citato (…rg-icons.svg#rg-icon-x o href="#rg-icon-x") esiste nello sprite ---
const spriteFile = 'icons/rg-icons.svg';
if (fs.existsSync(p(spriteFile))) {
  const iconIds = new Set([...read(p(spriteFile)).matchAll(/<symbol[^>]*\sid="([^"]+)"/g)].map(m => m[1]));
  const iconRefs = (txt) => [...txt.matchAll(/(?:rg-icons\.svg#|href="#)(rg-icon-[a-z0-9-]+)/g)].map(m => m[1]);
  for (const f of [...listFiles('components', '.md'), ...listFiles('patterns', '.md'),
                   ...listFiles('integration', '.md'), ...listFiles('examples', '.html')]) {
    for (const id of iconRefs(read(p(f)))) if (!iconIds.has(id)) fail(f, `icona inesistente nello sprite: #${id}`);
  }
  for (const c of manifest.components) {
    if (c.snippet) for (const id of iconRefs(c.snippet)) if (!iconIds.has(id)) fail(`manifest/${c.id}`, `snippet usa un'icona inesistente: #${id}`);
  }
}

// --- Report ---
if (violations.length) {
  console.error(`\n✗ ds-lint: ${violations.length} violazioni\n`);
  for (const v of violations) console.error('  - ' + v);
  console.error('');
  process.exit(1);
}
console.log(`✓ ds-lint: coerente — ${defined.size} classi definite, ${manifest.components.length} componenti nel manifest, 0 violazioni`);
