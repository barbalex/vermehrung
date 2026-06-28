# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`vermehrung.ch` — a German-language PWA for breeding endangered plant species for the [Aktionsplan Flora des Kantons Zürich](https://aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fl.html). In production since September 2020. The UI language is German (`lang="de"`); entity names in code are German (Sammlung, Kultur, Zaehlung, Lieferung, Herkunft, Garten, Person, Event, Teilkultur, Teilzaehlung, SammelLieferung).

## Commands

```bash
npm run dev              # Vite dev server on http://localhost:5175 (PWA, SW auto-update)
npm run build            # vite build  (NOTE: skips tsc — does NOT type-check)
npm run build_ts         # tsc && vite build  (run this to catch type errors)
npm run serve            # vite preview (serve the production build locally)
npm run deploy           # build + firebase deploy --only hosting  (production)
npm run deploy_preview   # build + firebase hosting:channel:deploy preview
npx eslint .             # lint (no npm script is defined for it)
```

- There is **no test suite** — no test runner is configured. Do not claim one exists.
- `npm run build` deliberately skips `tsc`, so type errors do not fail the build. Run `npm run build_ts` (or `npx tsc`) to type-check.
- Dependencies are pinned to exact versions (`.npmrc`: `save-exact=true`, `force=true`, `allow-git=none`). Bump with `ncu -c 5 -i` (the `-c 5` cooldown avoids brand-new releases).
- The GitHub Actions in `.github/workflows/` auto-deploy Firebase Hosting on PR (preview channel) and on merge to `master`.

## Architecture

This is a **local-first** app. Three concerns are split across the repo:

### 1. Backend (`backend/` — deployed separately, Docker Compose)
- **Postgres/PostGIS** (`db/`): source of truth. The schema + Hasura metadata are versioned **in this repo** under `src/sql/` (`createTables.sql`, `createViews.sql`, `createRevTriggers_*.sql`, `one-offs/`) and `src/hasuraMetadata/metadata.json`.
- **Hasura** GraphQL Engine v2.48 (`graphql`): exposes Postgres over GraphQL (HTTP + WS), JWT-authenticated.
- **Auth** (`auth/`, Hapi + `firebase-admin`): mints Hasura JWTs from Firebase Auth tokens.
- **Caddy** (`caddy/`): reverse proxy / TLS termination.
- `backend-dev/docker-compose.yaml` runs just `db` + `graphql` for local development; `backend/docker-compose.yaml` adds `auth` + `caddy`.

### 2. Frontend (`src/` — this Vite app, hosted on Firebase Hosting)
- **React 19** + **MUI 9** (Emotion; `jsxImportSource: '@emotion/react'`), **React Compiler** enabled, **mobx-state-tree** for app/UI state.
- **urql** + **graphql-ws** for GraphQL queries/subscriptions (client built in `src/utils/initiateApp.js`).
- **WatermelonDB** is the local-first store: models in `src/dbModel.ts`, schema in `src/dbSchema/`, instantiated over LokiJS/IndexedDB in `src/utils/initiateDb.js`. Migrations in `src/utils/migrations.js` — bump the schema version there whenever you change `src/dbSchema/*`.
- Entry chain: `src/main.jsx` → `src/App.jsx` (wires all providers: `DatabaseProvider` → MUI theme → `MobxStoreProvider` → `UrqlProvider`) → `src/Router.jsx`.

### 3. The local-first data flow (the core of the app)
The **UI reads from WatermelonDB, not from Hasura.** This is the most important thing to understand when debugging data:

- **Reads:** `src/utils/initializeSubscriptions.js` opens GraphQL subscriptions that push backend changes into WatermelonDB. Each table tracks a `*_lastUpdated` / `*_initially_queried` flag on the MST store. The UI can therefore **lag or drift from the backend** — query the backend directly for ground truth rather than trusting what the UI shows.
- **Writes:** go through `@writer` methods on each WatermelonDB model in `src/dbModel.ts` (`edit`, `delete`, `removeConflict`). A write (a) optimistically updates the local WDB row and (b) enqueues a GraphQL mutation via `store.addQueuedQuery` (`src/store/QueuedQuery.js`). The queue drains to Hasura when online; offline edits queue and replay on reconnect.

### 4. Revision & conflict system
Every editable row is versioned. Columns on each model: `_rev` (`"<depth>-<md5>"`), `_parent_rev`, `_revisions` (pg text array of ancestor revs), `_depth`, `_deleted`, `_conflicts`.

- An `edit` **does not mutate in place** — it inserts a NEW child row into the `<table>_rev` table (a new revision whose `_parent_rev` is the current `_rev`), then optimistically updates the materialized row. See the `edit` writer in `src/dbModel.ts`.
- On the backend, **AFTER-INSERT triggers on each `<table>_rev` table** (`src/sql/createRevTriggers_<table>.sql`) recompute the "winning" revision (deepest non-deleted leaf; max `_rev` breaks ties) and write it back to the materialized `<table>` row, and recompute `_conflicts` from the non-deleted leaves of the rev tree.
- Conflicts surface in the UI as a version picker (`src/components/shared/Conflict/`, `ConflictList/`). Bug-hunting the conflict/resolution flow almost always involves both the WDB `edit`/`removeConflict` writers **and** the matching `createRevTriggers_*.sql`.

## Local backend & debugging

When the app runs on `localhost`, it talks to a **local Hasura at `http://localhost:8080/v1/graphql`**, decided in [src/utils/constants.js](src/utils/constants.js) (`hostname === 'localhost'` → `:8080`, else `api.vermehrung.ch`). **`.env.development`'s `HASURA_GRAPHQL_URL` points at prod and is misleading for local debugging** — the admin secret for the local backend lives in `backend-dev/.env` / `backend/.env`. Bring the backend up with `docker compose -f backend-dev/docker-compose.yaml up`.

## Navigation & code layout

- **Routing:** `react-router` v8 data router in `src/Router.jsx`. `/Vermehrung/*` is the app; `/Dokumentation/*` is in-app documentation. All routes are lazy-loaded.
- **Tree navigation:** `src/store/Tree.js` holds `activeNodeArray` (bound to the URL path) and `openNodes`. `src/components/Tree/` renders it.
- **Forms:** `src/components/Data/<Entity>/` — each data entity has a singular dir (the form, e.g. `Data/Sammlung/`) and a plural dir (the list, e.g. `Data/Sammlungen/`). `Data/index.jsx` dispatches to the right form from the active node.
- **App state:** the MST root store is `src/store/index.js` (large). Per-entity filter defaults live in `src/store/Filter/`, validation errors in `src/store/Errors/`. Accessed via `useContext(MobxStoreContext)`.
- **utils:** `src/utils/` holds many small helpers (label formatters, URL id extractors, sorts) plus the larger `initializeSubscriptions.js`, `mutations.js`, and `fragments.js`.
- App version (from `package.json`) is shown in the document title at runtime.

## Conventions

- Imports carry explicit extensions (`.js`/`.jsx`/`.ts`) — enforced by the eslint `import/extensions` rule. Note that `src/dbModel.ts` (TypeScript) is imported into `.js` files.
- `src/dbModel.ts` is the one `.ts` file; the rest of the app is JSX/JS. `tsconfig` is `strict` with `checkJs`.
- CSS Modules use `camelCaseOnly` for class names (`vite.config.ts`).
- `vite.config.ts` sets `legacy.inconsistentCjsInterop: true` to work around CJS-interop issues with `@nozbe/watermelondb/adapters/lokijs` under Vite 8.
