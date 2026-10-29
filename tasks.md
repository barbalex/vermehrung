typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-28 final: tsc 953, remaining is the Data long tail
(~120 files, biggest: Kultur Timeline index 22, SammelLieferung Form
index 13, Kultur FormTitle cluster ~35, rest <12 each). Everything
else at zero incl. Header, Tree, shared, QK, all Forms, tests, utils,
modules, store, dbModel. type-coverage ~95.5%.
Fixers in tools/: nullsafe.py jsxfix.py formfix.py - run all, they
are position-driven from tsc output.
Phase E after Data: noUnusedLocals/noUnusedParameters, drop
allowJs/checkJs, wire lint+typecheck+test into npm run deploy, update
CLAUDE.md.(0 problems, --max-warnings 0)

- `npm run typecheck` (tsc --noEmit): 6281 errors to burn down, bottom-up:
  utils -> dbSchema/dbModel -> store/modules -> components/shared,Header,Documentation
  -> components/Data -> components/Tree -> routes/Router/App/main
- `npm run type-coverage`: 73.49% -> goal 100%
- kanel types: `npm run models:generate` against the running backend-dev db,
  output committed in src/models, eslint/prettier ignored. timestamps map to
  string, numerics to number (PostgREST JSON reality)
- deferred: react-hooks rules set-state-in-effect/refs/static-components are
  off in eslint config until the effects get refactored (same as ps)
- last steps once tsc is clean: enable noUnusedLocals/noUnusedParameters,
  drop allowJs/checkJs, wire lint+typecheck+test into npm run deploy

---

---

---

---

---

---

---

---

lets implement: Breadcrumbs (as called in the ps project) / Bookmarks (as called in the apf2 project). These will replace the nav buttons currently used in form headers.

---

lets implement: dynamic menus: top menu's menus need to adapt to narrow windows by folding into a more menu. Currently the light/dark mode menu, the account menu and the online menu do not

---

---

---

---
