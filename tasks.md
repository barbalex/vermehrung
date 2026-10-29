typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

state 2026-10-29 (evening): PHASE D COMPLETE. tsc 0 (from 6746 at start,
683 at day start). lint 0 problems (--max-warnings 0 equivalent), tests
54/54 green, type-coverage 97.98% (73.49% at start). ALL of Data's entity
stacks typed: Forms, FormTitles, Choosers, History/Conflict twins, list
pages + Rows, entity indexes, Files, QK, Timelines, TaxonSelect, Root.
Working recipe per file: type dataState useState with entity model
types, cast combinedObservables to Observable<[ModelA[], ModelB[]]>,
db?.get<Entity>('table'), Record casts for dynamic-column props
(tk_/ga_/hk_/ev_/tz_/ku_ prefixes), handler casts to
MouseEventHandler<HTMLElement>, errors-atom reads cast to string.
Entity History/Row twins and Settings menus all follow identical
patterns - check a done sibling before typing the next one.

latent runtime bugs found while typing (behavior preserved, flagged):
- SammelLieferung Copy updateAllLieferungen iterates watermelon Query
  (not iterable) - for...of would throw
- Root getShow* helpers receive UserRole model but compare to strings
  (role logic always truthy)
- Lieferungen add() called insertLieferungRev() without args (would
  throw when sammel_lieferung lookup fails) - now { values: {} }
- Lieferschein pageContainer was unbound since css-modules refactor
  (ReferenceError on render) - fixed to styles.pageContainer
- Teilzaehlung teilkultur relation was read as t.kultur (undefined) -
  fixed to t.teilkultur
- Teilkultur Teilzaehlungen read auspflanzebereit_beschreibung (typo,
  always undefined) - fixed to auspflanzbereit_beschreibung
- SammelLieferung printPreview initializer referenced itself (TDZ in
  esbuild) - fixed to useState(isPrint)
- MUI 9: PaperProps -> slotProps.paper in two delete menus

Phase E next: noUnusedLocals/noUnusedParameters, drop
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
