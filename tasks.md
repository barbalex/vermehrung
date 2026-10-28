typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-28 evening: tsc 2022 errors remaining, all in
components/Data (~1950, the per-entity forms/exports/qk files) and
components/Header (~50). Zero errors in: store, modules, utils,
dbModel, dbSchema, components/shared, components/Tree, routes, entry.
type-coverage ~82.5%. Working order for the rest: type one entity
completely (Herkunft is smallest), then replicate - Form/index.tsx,
FormTitle files, QK dirs, lists (Arten/index etc), Lieferschein.
Proven fixers in /tmp/nullsafe.py (position-driven optional chains).
Phase E after: noUnusedLocals/noUnusedParameters, drop allowJs/checkJs,
wire lint+typecheck+test into npm run deploy, update CLAUDE.md.

state after the rename commit:

- eslint clean: `npm run lint` (0 problems, --max-warnings 0)
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
