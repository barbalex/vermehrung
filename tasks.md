typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-28 latest: tsc 1030, remaining scattered Data long tail
(Header bedarfsplanung export 32, QK createMessageFunctions 45,
Kultur Timeline index 22, Kultur FormTitle cluster ~35, plus ~120 files
with <10 each). All entity Forms, Tree, shared, Header (1 file), tests,
utils, modules, store, dbModel at zero. type-coverage ~95%.
Fixers in tools/: nullsafe.py jsxfix.py formfix.py.
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

---

---

---

---

---
