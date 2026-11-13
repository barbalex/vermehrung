# Workoff list — optimizations & fixes

Found during the 2026-11-13 codebase survey. Work top to bottom.

## A. Bugs found while surveying (fix before optimizing)

1. [x] **Unauthenticated admin routes on the auth service** — `GET /create-user/{email}` and `GET /delete-user/{uid}` in `backend/auth/server.js` required no auth; `backend/docker-compose.yaml` published Postgres (5432) and auth (7000) on all interfaces. Fixed: routes now require an api JWT with `role=manager` (`Authorization: Bearer`), ports bound to `127.0.0.1`.
2. [ ] **Inverted QK query** — Art's `zaehlungsWithoutDatum` (`src/components/Data/Art/Form/QK/Qk/createMessageFunctions.ts`, `Q.where('datum', Q.notEq(null))`) selects Zählungen _with_ a datum; Kultur's version filters `!z.datum`. Fix the inversion; best done as part of A6.
3. [ ] **Crash window in the sync loop** — `processSubscriptionResult` persists the watermark cursor _before_ the SQLite write commits (write sits in an un-awaited `setTimeout` at `processSubscriptionResult.ts:85`, `setLastUpdated` runs at line 124). Tab death in between loses rows permanently. Fix: advance the cursor only after `db.write` commits.
4. [ ] `Lieferungen/index.tsx:93` calls `observeWithColumns(['gemeinde', 'lokalname', 'nr'])` — herkunft columns on the lieferung table.

## B. The bored list (ranked by payoff)

1. [ ] **Event-driven, batched sync** — LISTEN/NOTIFY → SSE "dirty" signal + existing delta fetch; 30–60s fallback poll; pause on `document.hidden`. Batch queue drains per table (PostgREST array bodies); one `requestSyncSoon()` per drain, not per write. Chunk the cursor-0 initial sync (today: full dump through the same 15s timeout, restarts from 0 on failure). Inline the RLS helper functions (`security definer set search_path` defeats inlining → per-row nested-EXISTS calls for gaertner/artverantwortlich).
2. [ ] **Cache the search corpus** — `Search/buildOptions.ts` re-fetches 9 tables and builds 9 Fuse indexes per debounced keystroke. Key a corpus/Fuse cache on `lastUpdatedAtom` per table.
3. [ ] **Stop rebuilding the whole tree on every click** — `Tree/index.tsx` combines 14 whole-table observables into a full `buildNodes()` rebuild on any write, click, or filter change; each art's label is fetched twice per rebuild. Incremental per-branch rebuild keyed on URL prefixes (or move the builder into the web worker).
4. [ ] **Schema-driven components** — ~11 copy families in `src/components/Data/` (~10k → ~2.5k lines): 12 forms with identical `saveToDb`s, 11 lists ~90–95% identical, 11×2 History, 12 Conflict. One generic component each behind declarative per-entity field lists (generatable via kanel). Preceded by component tests (currently zero). Also: `VermehrungModel` base class for the 25 byte-identical `edit()` writers in `dbModel.ts` (~675 lines).
5. [ ] **Bundle/asset diet on the hot path** — `React.lazy` the uploadcare/image-gallery chunk (425KB, loads with every form) and recharts (389KB, loads with Art/Kultur despite collapsed Collapsible); dynamic-import react-datepicker + date-fns locale (157KB off the boot path); convert docs GIFs (`felderBlenden1.gif` 1.1MB, `teilkultur_new.gif` 332KB) to muted webm.
6. [ ] **Unify the two QK `createMessageFunctions`** into one scope-parameterized library (Art 1,171 lines vs Kultur 889 lines, 14 same-named message fns, already diverged into bug A2).
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
- [ ] Replace the `fdw_user`/'secret' literal password in `backend/db/init/01_db_users_roles.sql`; remove stale Hasura vars from `backend/.env` + dead `03.sql` jwt_secret line.
- [ ] Set a removal date for `migrateLokiToSqlite.ts` once the user base has crossed the migration.

## Scratch

get Sammel-Lieferung/lieferschein to work again?

---

do we need a 'how to build/update production' documentation to prevent agents from having to find out themselves?

---

do we need a 'how to deploy' documentation to prevent agents from having to find out themselves?
