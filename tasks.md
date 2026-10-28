typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-28 night: tsc 1373, all in components/Data long tail
(forms mostly done: Art, Kultur, SammelLieferung, Lieferung, Teilzaehlung,
Bedarf, Event, Garten, Person... zero; remaining: Kultur Timeline
buildData 76, buildExceljsWorksheets 32, Header export 32, QK files ~45,
scattered forms <20 each). Fixers in tools/: nullsafe.py, jsxfix.py,
formfix.py - run all three, they are position-driven and idempotent-ish.
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
