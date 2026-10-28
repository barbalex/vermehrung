typescript migration (started 2026-10-28): all src files are now .ts/.tsx.

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

When this project began it needed uuid's to enable offline editing. but uuidv7 did not exist yet, so random uuid's were implemented. Meanwhile though uuidv7 exists and would make sense due to better ressource usage. can we design a migration path to

1. change to creating uuidv7 for all future inserts and
2. migrate all existing data to uuidv7 (as we did with apf2)?

What makes this more challenging are the _rev tables that need to be migrated as well (while missing relations). And the fact that users need to reload from the server discarding all changes made offline locally on the next update of their app. this is a risk I'm willing to run as so far only one user is really working with this app in a meaningfull way and she works on a desktop pc that always is online

---

---

---

---
