typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-29: tsc 683 (from 6746). ALL of Data's entity stacks are
typed except scattered long tail (~130 files, <12 errors each; biggest:
SammelLieferung Form 13, Kultur FormTitle buildExceljsWorksheets 13,
Kultur FormTitle FormTitle 12, Sammlung Form 11, Lieferschein 11).
Working recipe per file: type dataState useState with entity model
types, cast combinedObservables to Observable<[ModelA[], ModelB[]]>,
db?.get<Entity>('table'), Record casts for dynamic-column props
(tk_/ga_/hk_/ev_/tz_/ku_ prefixes), handler casts to
MouseEventHandler<HTMLElement>, errors-atom reads cast to string.
Fixers: tools/nullsafe.py tools/jsxfix.py tools/formfix.py (position
driven, run to fixpoint after each batch). Entity History/Row twins
and Settings menus all follow identical patterns - check a done
sibling before typing the next one.
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
