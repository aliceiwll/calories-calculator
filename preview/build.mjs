/**
 * build.mjs — bundles the project's components into one standalone
 * preview/index.html that opens straight from the filesystem.
 *
 * No install step: React and Babel come from a CDN, JSX is compiled in
 * the browser. The component sources are read from disk unmodified —
 * only `import`/`export` keywords are stripped, since everything is
 * concatenated into a single scope.
 *
 * Run: node preview/build.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

/* tokens.css lives one directory above the project — Layer 1 + 2 are
   shared with the rest of the case study. */
const CSS = [resolve(root, '..', 'tokens.css'), join(root, 'components.css')];

/* Dependency order matters: everything lands in one scope. */
const COMPONENTS = [
  'Glyph.jsx',
  'data.js',
  'recommend.js',
  'IconButton.jsx',
  'SearchField.jsx',
  'InputBar.jsx',
  'Row.jsx',
  'SectionHeader.jsx',
  'Sheet.jsx',
  'PortionControl.jsx',
  'composition.js',
  'CompositionDetail.jsx',
  'SwipeRow.jsx',
  'SuggestionCard.jsx',
  'benefits.js',
  'forYou.js',
  'RecipePhoto.jsx',
  'SaveButton.jsx',
  'RecipeCard.jsx',
  'QuickIdea.jsx',
  'ContextCard.jsx',
  'FilterChips.jsx',
  'ScreenHead.jsx',
  'TabBar.jsx',
  'AddSheet.jsx',
  'CalendarSheet.jsx',
  'CompositionBar.jsx',   /* parked — no screen renders it right now */
  'PortionSheet.jsx',
  'CameraScreen.jsx',
  'BarcodeScreen.jsx',
  'HelpScreen.jsx',
  'PhotoReviewScreen.jsx',
  'TodayScreen.jsx',
  'RecipesScreen.jsx',
  'SavedScreen.jsx',
  'ManifestoScreen.jsx',
  'RecipeDetailScreen.jsx',
  'SearchScreen.jsx',
  'ProfileScreen.jsx',
  'App.jsx',
];

/* Imports are dropped because every module's exports are hoisted to the
   top level under their own names — but an aliased import has no such
   name, so `import { A as B }` used to leave B undefined and the screen
   crashed only once the code path that used it ran. Aliases are now
   re-bound explicitly. */
const aliases = (src) =>
  [...src.matchAll(/^import\s*\{([^}]*)\}\s*from\s*['"][^'"]+['"];?\s*$/gm)]
    .flatMap((m) => m[1].split(','))
    .map((part) => part.trim().match(/^([A-Za-z0-9_$]+)\s+as\s+([A-Za-z0-9_$]+)$/))
    .filter(Boolean)
    .map((m) => `const ${m[2]} = ${m[1]};`)
    .join('\n');

const strip = (src) => {
  const rebound = aliases(src);
  const body = src
    .replace(/^import[\s\S]*?from\s*['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^export\s+(function|const|class)\b/gm, '$1');
  return rebound ? `${rebound}\n${body}` : body;
};

const exportsOf = (src) =>
  [...src.matchAll(/^export\s+(?:function|const|class)\s+([A-Za-z0-9_$]+)/gm)].map((m) => m[1]);

/* Each file gets its own scope, with only its exports hoisted to the
   top level. Everything used to be concatenated flat, which meant two
   modules could not both keep a private helper of the same name — real
   ES modules have no such rule, so the preview was failing on code that
   was correct. The IIFE is what restores module semantics. */
const wrap = (file, src) => {
  const names = exportsOf(src);
  const body = strip(src);
  if (!names.length) return `${banner(file)}(() => {\n${body}\n})();`;
  const list = names.join(', ');
  return `${banner(file)}const { ${list} } = (() => {\n${body}\nreturn { ${list} };\n})();`;
};

const banner = (f) => `\n/* ${'='.repeat(60)}\n   ${f}\n   ${'='.repeat(60)} */\n`;

const css = CSS.map((f) => `/* @source ${f.replace(root, '.')} */\n${readFileSync(f, 'utf8')}`).join('\n');
const js = [
  ...COMPONENTS.map((f) => wrap(f, readFileSync(join(root, f), 'utf8'))),
  wrap('preview/gallery.jsx', readFileSync(join(here, 'gallery.jsx'), 'utf8')),
].join('\n');

/* Preview-only chrome, all namespaced `pv-`. Screen layout now lives
   in components.css. */
const chrome = `
/* ---------- preview chrome ---------- */

body {
  margin: 0;
  background: var(--paper-200);
  font-family: var(--family-record);
  -webkit-font-smoothing: antialiased;
}

.pv-page--app { color: var(--text-primary); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); align-items: flex-start; }
.pv-page--solo { color: var(--text-primary); display: flex; gap: var(--space-6); align-items: flex-start; padding: var(--space-5); }
.pv-page { color: var(--text-primary); max-width: 1180px; margin: 0 auto; padding: var(--space-7) var(--space-5) var(--space-7); }

.pv-head { padding-bottom: var(--space-6); border-bottom: 1px solid var(--border-hairline); }
.pv-head__title { margin: 0; font-size: var(--size-500); font-weight: var(--weight-medium); }
.pv-head__note { margin: var(--space-2) 0 0; max-width: 60ch; font-size: var(--size-200); color: var(--text-muted); line-height: var(--leading-body); }
.pv-head__note code { font-family: var(--family-figure); font-size: var(--size-100); }

.pv-specimen { padding: var(--space-7) 0; border-bottom: 1px solid var(--border-hairline); }
.pv-specimen:last-child { border-bottom: 0; }
.pv-specimen__head { margin-bottom: var(--space-5); }
.pv-specimen__title { margin: 0; font-size: var(--size-400); font-weight: var(--weight-medium); }
.pv-specimen__note { margin: var(--space-1) 0 0; max-width: 62ch; font-size: var(--size-200); color: var(--text-muted); line-height: var(--leading-body); }

.pv-stage { display: flex; flex-wrap: wrap; gap: var(--space-6); align-items: flex-start; }

.pv-column {
  flex-shrink: 0;
  width: 390px;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--surface-page);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.pv-column > .row + .row { margin-top: calc(var(--space-4) * -1); }

.pv-frame {
  position: relative;
  flex-shrink: 0;
  width: 390px;
  border: 1px solid var(--border-strong);
  border-radius: var(--space-5);
  background: var(--surface-page);
  overflow: hidden;
}

.pv-frame__inner { position: relative; height: 100%; }

.pv-echo {
  margin: 0;
  font-family: var(--family-figure);
  font-size: var(--size-100);
  color: var(--text-muted);
  word-break: break-all;
}
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>piece — component preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400&family=Space+Grotesk:wght@400;500&display=swap">
<style>
${css}
${chrome}
</style>
</head>
<body>
<div id="root"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.4/babel.min.js"></script>

<script>
  if (!window.React || !window.Babel) {
    document.getElementById('root').innerHTML =
      '<p style="font:14px system-ui;padding:32px">React or Babel failed to load — this page needs a network connection the first time.</p>';
  }
</script>

<script type="text/babel" data-presets="react">
const { useState, useEffect, useMemo, useRef, Fragment } = React;
${js}
</script>
</body>
</html>
`;

const out = join(here, 'index.html');
writeFileSync(out, html);
console.log(`preview → ${out}  (${(html.length / 1024).toFixed(0)} KB)`);
