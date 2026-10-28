typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-28 late: tsc 1850 errors, all in components/Data
(Kultur 369, Art 251, Zaehlung 151, Lieferung 146, SammelLieferung 145,
Garten 119, Person 117, Event 71, rest smaller). Everything else at 0:
store, modules, utils, dbModel, dbSchema, shared, Tree, Header (minus
~50), routes, entry. type-coverage 94.7%, lint 0.
Biggest files: Kultur/Form/Timeline/buildData.ts (76, complex - read
fully before typing), Kultur/FormTitle/buildExceljsWorksheets.ts (68),
Zaehlung Teilzaehlung Form (58), Person/Form (53).
Workflow that works: type row props as the entity model class, db.get<
Model>('table') on query chains, Werte option arrays as Select option
shape, cast errors-atom reads to string | undefined, ?? null on model
field reads into control value props. /tmp/nullsafe.py inserts
optional chains at tsc-reported positions (run to fixpoint).
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
