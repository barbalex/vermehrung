# Workoff list — optimizations & fixes

Found during the 2026-11-13 codebase survey. Work top to bottom.

## A. Bugs found while surveying (fix before optimizing)

1. [x] **Unauthenticated admin routes on the auth service** — `GET /create-user/{email}` and `GET /delete-user/{uid}` in `backend/auth/server.js` required no auth; `backend/docker-compose.yaml` published Postgres (5432) and auth (7000) on all interfaces. Fixed: routes now require an api JWT with `role=manager` (`Authorization: Bearer`), ports bound to `127.0.0.1`.
2. [x] **Inverted QK query** — Art's `zaehlungsWithoutDatum` (`src/components/Data/Art/Form/QK/Qk/createMessageFunctions.ts`) selected Zählungen _with_ a datum (`Q.notEq(null)`); Kultur's version filters `!z.datum`. Fixed: `Q.where('datum', null)`. B6 (unifying the two QK libraries) remains the proper cure for this class of drift.
3. [x] **Crash window in the sync loop** — `processSubscriptionResult` persisted the watermark cursor _before_ the SQLite write committed. Fixed: the function now resolves only after the write commits (setTimeout staggering kept), and `setLastUpdated` runs exclusively on the success path — a failed write leaves the cursor put so the next sync re-delivers the rows. Also closes a latent double-create race: the poller's `await` now spans the writes, so overlapping polls can't both see the same rows as missing.
4. [x] Wrong `observeWithColumns` — three lists (not just Lieferungen) observed herkunft's `['gemeinde', 'lokalname', 'nr']` columns on their own tables (copy-paste from Herkuenfte). Fixed per table: Lieferungen `['datum', 'anzahl_pflanzen', 'anzahl_auspflanzbereit', 'geplant']` (label + sort fields), Sammlungen `['nr', 'datum', 'geplant']`, SammelLieferungen `['datum', 'anzahl_pflanzen']` (sort fields; row labels self-observe via `row.label`).

## B. The bored list (ranked by payoff)

1. [x] **Event-driven, batched sync** — DONE 13.11.2026: row-level `pg_notify` triggers on all synced tables (`createNotifyTriggers.sql`) → SSE `/events` endpoint on the auth service (JWT-gated, debounced, heartbeat; caddy `flush_interval -1`, auth `compression: false` — gzip buffered the never-ending stream); client fetch-SSE (`syncEvents.ts`) drives the poll (200ms after a signal, 60s fallback while connected, immediate sync on tab-visible); queue drains batch per table into bulk upserts (atomic removal, per-query fallback on batch errors). Initial sync fetches one table per request (`p_tables` param on the sync rpc) — dumps fit the 15s timeout and progress survives failures; the dead `event` block is gone. **RLS inlining investigated and rejected**: the differential test (definer vs inlined fingerprints per role/table, dev db) shows postgres' `infinite recursion detected in policy` on garten↔kultur for gaertner/artverantwortlich — the definer helpers are load-bearing recursion breakers, and the expensive policies are exactly the cyclic ones. Real fix if ever needed: per-role visibility precomputation (e.g. `app.my_gartens()` set-returning definer chokepoints, or an ACL table maintained by triggers).
2. [x] **Cache the search corpus** — DONE 13.11.2026: per-table corpus + Fuse cache keyed on the table's sync watermark and filter; a keystroke only runs `fuse.search` on cached indexes (group order preserved, sequential assembly). Caveat documented in code: purely offline edits catch up with the next sync. Bonus: fixed the pre-existing `nach_ausgeflanzt` typo that silently disabled the 'ausgepflanzt' search keyword.
3. [x] **Stop rebuilding the whole tree on every click** — DONE 13.11.2026 (core): the rebuild effect no longer depends on the whole url — `buildNodes` only reads the top folder segment (folder visibility) and, when a filter is set, the active row id per table; both collapsed into derived deps, so navigating within a folder no longer rebuilds the tree. Art labels are resolved once per rebuild and shared between sorting and node building (was: two async round trips per art). Remaining follow-up (C-list sized): per-branch incremental rebuild for data-change rebuilds — the 14-observable path still rebuilds all open branches on any write (correct, just not incremental); moving the builder into the sqlite worker is not possible with WatermelonDB (model queries are main-thread).
4. [~] **Schema-driven components** — PHASE 1 DONE 13.11.2026: `VermehrungModel` + `VermehrungFileModel` base classes replace 68 identical writer methods in `dbModel.ts` (2,822 → 1,955 lines; Person keeps a `delete` override for the firebase account); `triStateDeletedQuery` helper replaces 58× the `_deleted` ternary across 46 files. PHASE 2 DONE 13.11.2026: component testing established (jsdom + testing-library, jotai Provider, react-window stub; Personen list pinned by 3 tests), `useEntityList` hook (+ generalized `triStateQuery`), Personen and Sammlungen migrated. PHASE 3 DONE 13.11.2026: all 11 plural lists run on `useEntityList` (incl. Arten's apFilter and Lieferungen's von/nach kultur-field switch). PHASE 4 DONE 13.11.2026: `useRelationOptions` hook built (observe + chosen-row merge + async sort/label options); both `Was` components (Lieferung, Sammel-Lieferung) migrated — ~10 more instances of the same pattern exist in the forms and can migrate mechanically. REMAINING: one generic Form/History/Conflict each behind declarative per-entity field lists (generatable via kanel).
5. [x] **Bundle/asset diet on the hot path** — DONE 13.11.2026: uploadcare/image-gallery now lazy (425KB → on-demand `LazyUploader` chunk behind a placeholder button; gallery loads on lightbox open); all three timelines lazy-load recharts on Collapsible expand (389KB); react-datepicker + date-fns locale moved from boot into the Date chunk (157KB off startup); docs media converted (felderBlenden1 1.1MB→123KB webm, teilkultur_new 332KB→37KB, teilkultur_option 96KB→82KB, structure.png→webp; unused src/images/structure dropped).
6. [x] **Unify the two QK `createMessageFunctions`** — DONE 13.11.2026: both files (Art 1,171→594 lines, Kultur 889→544) run entirely on the shared `buildQkMessages`/`labelOf`/`lieferungText` builders (unit-tested; `buildMessage` variant for shared url/text resolutions). Drift bugs fixed en route: Art's inverted `zaehlungsWithoutDatum` (A2), Art's `kultursWithoutZaehlungThisYear` comparing against a nonexistent `kultur.zaehlung_id` (never matched - flagged every kultur), Kultur's `anLieferungsWithoutDatum` filtering the wrong direction, Kultur's async-predicate-in-filter (tk check never filtered), and the QK 'Juhui' loading flash. Art's per-message re-queries for zaehlung/datum checks replaced with in-memory filters over the pre-fetched scope.
7. [ ] **Ops hygiene** — CI (lint/typecheck/unit tests + backend-free Playwright e2e; pin `type-coverage` baseline, currently 394 `as unknown as` casts); rev-table retention/pruning (full O(n²) ancestry arrays, zero cleanup, 21 tables grow forever); backup hardening (size-equality heuristic can skip real changes; nothing schedules `backup.sh`; no restore test); SW `maximumFileSizeToCacheInBytes` from 1GB to ~10–20MB; compose resource limits + healthchecks + log rotation for auth/api/caddy; shorten the 12h JWT TTL / add revocation.

## C. Tiny delights (an afternoon each)

- [ ] `triStateQuery(column, value)` helper — the tri-state `_deleted` ternary appears 205× in 62 files (~1.5k lines).
- [ ] Remove the dead `event` block from `createSyncFunction.sql` (client never reads it since the bedarf migration — wasted work every 5s).
- [ ] `processSubscriptionResult`: delete the duplicated identical `query()` call; swap `find`/`includes` O(n²) passes for a `Map`.
- [ ] Persist `lastUpdatedAtom` once per poll instead of 27 IndexedDB writes every 5 seconds.
- [ ] Replace proj4 (139KB) with closed-form LV03→WGS84 math (~20 lines).
- [ ] Delete dead code: `Tree/nodes/sammelLieferung/` modules, `DataProviderHOC.tsx`, unused shared components (`Checkbox2StatesNonUpdatable`, `StringToCopyOnlyButton`, `InfoWithPopover`), orphan CSS modules, `.DS_Store` files, commented-out console.logs.
- [ ] Untrack `dist/index.html` / `dist/manifest.webmanifest` so deploys stop committing build artifacts.
- [ ] Hoist `tableIsFilteredAtom(table)` to a module-level map (atom factory called during render).
- [ ] Fix `isNodeOpen`'s per-row linear `isEqual` scan (use a `Set` of joined-url keys); drop redundant `openNodes.length` dep in `Tree/index.tsx:233`.
- [ ] Collapse 13 value-identical `initial`/`empty` exports in `src/store/Filter/`; merge 16 near-identical `<entity>IdInUrl.ts` helpers.
- [ ] `scripts/deployBackend.mjs` — one-command backend deploy (scp changed files to `root@139.162.172.14:/root/vermehrung`, remote `docker compose build auth && up -d`) so the copied server folder can't drift from the repo again (it had lagged: Hasura-era `server.js`, missing `../src/sql` mounts).
- [ ] Fix the flaky `e2e/breadcrumbs.spec.ts` pixel assertion (`<= 12`px layout measurement flakes under load, fails intermittently on HEAD).
- [ ] Replace the `fdw_user`/'secret' literal password in `backend/db/init/01_db_users_roles.sql`; remove stale Hasura vars from `backend/.env` + dead `03.sql` jwt_secret line.
- [ ] Set a removal date for `migrateLokiToSqlite.ts` once the user base has crossed the migration.

## Scratch

get Sammel-Lieferung/lieferschein to work again?

---

do we need a 'how to build/update production' documentation to prevent agents from having to find out themselves?

---

do we need a 'how to deploy' documentation to prevent agents from having to find out themselves?

---

Tree keyboard navigation as in ae3

---

---
