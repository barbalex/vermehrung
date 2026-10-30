# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`vermehrung.ch` — a German-language PWA for breeding endangered plant species for the [Aktionsplan Flora des Kantons Zürich](https://aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fl.html). In production since September 2020. The UI language is German (`lang="de"`); entity names in code are German (Sammlung, Kultur, Zaehlung, Lieferung, Herkunft, Garten, Person, Event, Teilkultur, Teilzaehlung, SammelLieferung).

## Commands

```bash
npm run dev              # Vite dev server on http://localhost:5175 (PWA, SW auto-update)
npm run build            # vite build  (NOTE: skips tsc — does NOT type-check)
npm run build_ts         # tsc && vite build
npm run serve            # vite preview (serve the production build locally)
npm run deploy           # lint + typecheck + test + bump + build + firebase deploy --only hosting  (production; optional bump type arg: npm run deploy [patch|minor|major], default patch)
npm run deploy_preview   # lint + typecheck + test + build + firebase hosting:channel:deploy preview
npm test                 # vitest unit tests
npm run test:api         # api equivalence tests — needs the local backend + docker (NOT in CI)
npm run test:e2e         # Playwright e2e: boot smoke + local-first scenario (no backend needed)
npm run lint             # eslint . --max-warnings 0
npm run typecheck        # tsc --noEmit (strict, noUnusedLocals/noUnusedParameters — expect zero errors)
```

- `npm test` runs the vitest suite under `src/**/__tests__/` (store persistence, queue observer, revision builders).
- `npm run test:api` runs `api-tests/` against the **local backend**: it tests the sync rpc (row visibility per role, delta cursors, GeoJSON geodata, gaertner column exclusions) and the upsert write path. Start the backend with `docker compose -f backend-dev/docker-compose.yaml up` first. (The PostgREST-vs-Hasura equivalence oracle was removed with Hasura — see git history, `permissions.equivalence.test.ts`.)
- `npm run test:e2e` runs `e2e/`: boot smoke tests plus `local-first.spec.ts`, a full browser scenario (login → initial sync → offline boot from cache → re-login) that pins the seams `test:api` cannot reach. It mocks firebase identity toolkit, the auth service `/token` and PostgREST via `page.route` — no backend and no real credentials are used. Offline is emulated by spoofing `navigator.onLine` and aborting backend routes (like production, where the service worker still serves assets).
- The whole codebase is TypeScript (`strict`, `noUnusedLocals`/`noUnusedParameters`); `npm run typecheck` and `npm run lint` are both at zero. `npm run build` deliberately skips `tsc`, but the deploy scripts gate on lint + typecheck + test before building.
- Dependencies are pinned to exact versions (`.npmrc`: `save-exact=true`, `force=true`, `allow-git=none`). Bump with `ncu -c 5 -i` (the `-c 5` cooldown avoids brand-new releases).
- **Revision aggregation**: field edits update the local row immediately (labels stay live) but no longer create a revision per field change. One revision per row and editing session is queued by `src/modules/revAggregation.ts` when it ends: ~5s after the last change, on navigation, on tab-hide/close, plus a boot heal that flushes rows left dirty by a crash (registry in localStorage, `vermehrung:unflushed-revs`) before the sync starts. The sync never overwrites rows with unflushed edits (`isUnflushedRev` guard in `processSubscriptionResult`). The rev-table field lists live in `src/modules/revTableFields.ts` - keep them in sync with the schema.
- Deploys are manual via `npm run deploy` / `npm run deploy_preview` (the former GitHub Actions auto-deploy was removed — see git history, `743acdbce`).

## Architecture

This is a **local-first** app. Three concerns are split across the repo:

### 1. Backend (`backend/` — deployed separately, Docker Compose)
- **Postgres/PostGIS** (`db/`): source of truth. The schema is versioned **in this repo** under `src/sql/` (`createTables.sql`, `createViews.sql`, `createRevTriggers_*.sql`, `createApiAccess.sql`, `createSyncFunction.sql`, `one-offs/`).
- **PostgREST** v16.5 (`api`): exposes Postgres over REST, JWT-authenticated. Roles, column grants and row level security live in `src/sql/createApiAccess.sql` — **generated** from the permission definitions in `src/hasuraMetadata/metadata.json` by `tools/generate_api_access_sql.py`. The directory name is historical (the JSON is Hasura's metadata format and the migration source); nothing Hasura runs anymore — regenerate with the tool after changing permissions.
- **Auth** (`auth/`, Hapi + `firebase-admin`): `POST /token` verifies a Firebase ID token and returns the api JWT (HS256) carrying `role` + `user_id`.
- **Caddy** (`caddy/`): reverse proxy / TLS termination (PostgREST handles CORS itself).
- `backend-dev/docker-compose.yaml` runs `db` + `api` + `auth` locally. `backend/docker-compose.yaml` (production) runs `db` + `auth` + `api` + `caddy`.

### 2. Frontend (`src/` — this Vite app, hosted on Firebase Hosting)
- **React 19** + **MUI 9** (Emotion; `jsxImportSource: '@emotion/react'`), **React Compiler** enabled, **jotai** for app/UI state.
- **apiClient** (`src/utils/apiClient.ts`): thin fetch wrapper over PostgREST (auth header from localStorage, `Prefer:` handling for upserts).
- **WatermelonDB** is the local-first store: models in `src/dbModel.ts`, schema in `src/dbSchema/`, instantiated over LokiJS/IndexedDB in `src/utils/initiateDb.ts` — the LokiJS database runs in a **dedicated Web Worker** (`useWebWorker: true`). nitromelondb's own web-worker path expects webpack worker-loader semantics and is deprecated, so `vite.config.ts` swaps the dispatcher for `src/utils/lokiDispatcher.ts`, which talks to `src/utils/lokiWebWorker.ts` (real worker running `src/utils/lokiWorkerEntry.ts`). Note: adapter-option callbacks cannot cross `postMessage` and are dropped in worker mode (only `onQuotaExceededError` is affected — `onSetUpError` is still called on the main thread). Migrations in `src/utils/migrations.ts` — bump the schema version there whenever you change `src/dbSchema/*`.
- Entry chain: `src/main.tsx` → `src/App.tsx` (wires providers: `DatabaseProvider` → MUI theme) → `src/Router.tsx`.

### 3. The local-first data flow (the core of the app)
The **UI reads from WatermelonDB, not from the api.** This is the most important thing to understand when debugging data:

- **Reads:** `src/utils/syncPoller.ts` polls `POST /rpc/sync` (every 5s, server-side watermark cursors in `lastUpdated`) and upserts changed rows into WatermelonDB via `processSubscriptionResult`. The poll doubles as the online check (`shortTermOnline`). The UI can therefore **lag or drift from the backend** — query the backend directly for ground truth rather than trusting what the UI shows.
- **Writes:** go through `@writer` methods on each WatermelonDB model in `src/dbModel.ts` (`edit`, `delete`, `removeConflict`). A write (a) optimistically updates the local WDB row and (b) enqueues an upsert via `store.addQueuedQuery`. The queue (`src/modules/observeQueuedQueries.ts`) drains to PostgREST (`POST /<table>_rev` with `Prefer: resolution=merge-duplicates`) when online; offline edits queue and replay on reconnect — replays of identical mutations are no-ops.

### 4. Revision & conflict system
Every editable row is versioned. Columns on each model: `_rev` (`"<depth>-<md5>"`), `_parent_rev`, `_revisions` (pg text array of ancestor revs), `_depth`, `_deleted`, `_conflicts`.

- An `edit` **does not mutate in place** — it inserts a NEW child row into the `<table>_rev` table (a new revision whose `_parent_rev` is the current `_rev`), then optimistically updates the materialized row. See the `edit` writer in `src/dbModel.ts`.
- On the backend, **AFTER-INSERT triggers on each `<table>_rev` table** (`src/sql/createRevTriggers_<table>.sql`) recompute the "winning" revision (deepest non-deleted leaf; max `_rev` breaks ties) and write it back to the materialized `<table>` row, and recompute `_conflicts` from the non-deleted leaves of the rev tree.
- Conflicts surface in the UI as a version picker (`src/components/shared/Conflict/`, `ConflictList/`). Bug-hunting the conflict/resolution flow almost always involves both the WDB `edit`/`removeConflict` writers **and** the matching `createRevTriggers_*.sql`.

## Local backend & debugging

When the app runs on `localhost`, it talks to a **local PostgREST at `http://localhost:8090`** and the local auth service at `http://localhost:7010`, decided in [src/utils/constants.ts](src/utils/constants.ts) (`hostname === 'localhost'` → dev ports, else `api.vermehrung.ch` / `auth.vermehrung.ch`). The dev backend's host ports are a dedicated block — db **5434**, api **8090**, auth **7010** (`backend-dev/docker-compose.yaml`) — chosen so the stack can run next to other local projects claiming 3000/3100/5000/5432/5433 (apf2, ae3). When changing them, update `src/utils/constants.ts`, the mocks in `e2e/*.spec.ts`, `api-tests/helpers.ts` and the port rewrite in `kanel.config.mjs`. The backend secrets live in `backend-dev/.env` / `backend/.env` (note: mixed line endings — strip `\r` when parsing them in scripts). Bring the backend up with `docker compose -f backend-dev/docker-compose.yaml up`. A fresh `db_data` volume initializes from `vermehrung.backup`, then `backend-dev/db/init/04_api_access.sh` applies `src/sql/createApiAccess.sql` + `createSyncFunction.sql` (mounted at `/api_sql`) — a pg_dump contains no cluster-level roles, so without that step PostgREST crash-loops with `password authentication failed for user "authenticator"`. `backend/` (production) has the same hook for building a new server from a backup.

## Navigation & code layout

- **Routing:** `react-router` v8 data router in `src/Router.tsx`. `/Vermehrung/*` is the app; `/Dokumentation/*` is in-app documentation. All routes are lazy-loaded.
- **Tree navigation:** `src/store/index.ts` holds `activeNodeArray` (bound to the URL path) and `openNodes`. `src/components/Tree/` renders it.
- **Forms:** `src/components/Data/<Entity>/` — each data entity has a singular dir (the form, e.g. `Data/Sammlung/`) and a plural dir (the list, e.g. `Data/Sammlungen/`). `Data/index.tsx` dispatches to the right form from the active node.
- **App state:** `src/store/index.ts` holds a jotai store (atoms for db, filters, errors, navigation). Per-entity filter defaults live in `src/store/Filter/`, validation errors in `src/store/Errors/`. Accessed via `useAtomValue`/`store.get`.
- **utils:** `src/utils/` holds many small helpers (label formatters, URL id extractors, sorts) plus the larger `initiateDb.ts`, `syncPoller.ts`, `processSubscriptionResult.ts`, and `apiClient.ts`.
- App version (from `package.json`) is shown in the document title at runtime.

## Conventions

- Imports carry explicit extensions (`.ts`/`.tsx`) — enforced by the eslint `import/extensions` rule.
- `src/dbModel.ts` is the one `.ts` src file; the rest of the app is JSX/JS (plus TypeScript in `api-tests/`). `tsconfig` is `strict` with `checkJs`.
- CSS Modules use `camelCaseOnly` for class names (`vite.config.ts`).
- `vite.config.ts` sets `legacy.inconsistentCjsInterop: true` to work around CJS-interop issues with `nitromelondb/adapters/lokijs` under Vite 8, and contains the plugins + `optimizeDeps` wiring that make the LokiJS worker bundle correctly in dev and build (see the WatermelonDB bullet above).
