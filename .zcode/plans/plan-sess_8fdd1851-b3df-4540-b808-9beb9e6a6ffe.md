# TypeScript Migration Plan for vermehrung

**Decisions (confirmed):** Full type coverage (0 tsc errors, no `any`, measured with `type-coverage` → 100%) + opportunistic test growth (no hard test-coverage gate). Mass rename first, then bottom-up error burn-down. Quality gates enforced in `npm run deploy` once clean. Kanel set up like the ps project.

## End-state gates
- `tsc --noEmit`: 0 errors (baseline today: 6,746)
- `eslint . --max-warnings 0`: 0 problems (baseline today: 68)
- `type-coverage`: 100% (no implicit/explicit `any` in `src/`)
- `vitest run`, `test:api` (against running dev stack), `test:e2e`, `vite build`: all green
- `deploy` runs the gates before version bump/build/firebase

## Phase A — Foundation (configs + lint zero)
1. **tsconfig.json**: add `experimentalDecorators: true` (aligns with the babel legacy-decorator pass that already compiles `src/dbModel.ts`; eliminates ~660 decorator errors), `jsxImportSource: '@emotion/react'` (matches vite config, types the `css` prop), `allowImportingTsExtensions: true` (needed for the explicit `.ts` import convention post-rename; `noEmit` already true). Keep `useDefineForClassFields: true` initially; revisit only if WDB decorator fields misbehave. `noUnusedLocals`/`noUnusedParameters` deliberately deferred to Phase E.
2. **ESLint**: add `src/models/**` to ignores (kanel output, like ps). Update `import/extensions` map to `'always'` for js/jsx/ts/tsx so explicit extensions stay required after rename. Diagnose & properly fix the 25 `no-undef "store"` errors (store *is* exported and imported — likely a real stale-reference or scope-analysis quirk; fix the code, don't suppress). Add a `backend/**/*.js` + `api-tests/**` config block with `globals.node`; fix the 12 `no-constant-binary-expression` and 6 `no-require-imports` code issues in api-tests. Target: eslint clean before proceeding.
3. **New npm scripts**: `lint` (`eslint . --max-warnings 0`), `typecheck` (`tsc --noEmit`), `type-coverage` (`type-coverage --strict --detail`; add pinned devDep). Record baseline numbers in `tasks.md`.

## Phase B — Kanel DB types (mirror ps exactly)
1. Add pinned devDeps: `kanel 4.0.4` (same version as ps), `type-coverage`, later `@vitest/coverage-v8`.
2. `kanel.config.mjs` modeled on ps: connection string parsed from `backend-dev/.env` (`DATABASE_URL`/`PGRST_DB_URI`, strip `\r` — precedent in `api-tests/helpers.ts`), `outputPath: './src/models'`, `preDeleteOutputFolder: true`, ESM module format. Filter: exclude foreign tables (`ae_art_live`) and PostGIS system relations (`spatial_ref_sys`, `geography_columns`, `geometry_columns`); scope to the `public` schema so `app`-schema helpers don't generate noise.
3. `scripts/kanel-generate.mjs`: copy of ps wrapper (runs `processDatabase`, rewrites `.js`→`.ts` in generated relative imports).
4. `npm run models:generate`; run against the currently-running `v_db`. **Commit `src/models/`** (ps convention), eslint-ignored, marked "generated — do not edit" in CLAUDE.md.
5. If sync-boundary friction appears (kanel types timestamps as `Date`, but WatermelonDB rows are raw JSON with ISO strings), add kanel type-mapping overrides for timestamp columns → `string`; decide when wiring the types in.
6. Cross-check moment: compare generated table/column types against `src/dbSchema/*`, `src/dbModel.ts`, `src/modules/revTableFields.js`, and the `tables` list in `src/store/index.js` — this validates both directions and surfaces schema drift (e.g. post-uuidv7-migration state).

## Phase C — Mass rename (one mechanical commit)
1. Codemod: `git mv` all `src/**/*.js` → `.ts`, `src/**/*.jsx` → `.tsx` (322 + 322 files); verify no JSX hides in `.js` files first.
2. Rewrite every import specifier repo-wide that targets a renamed file (static *and* dynamic — `Router.tsx` is full of `import('./...jsx')` loaders): `.js`→`.ts`, `.jsx`→`.tsx`. JSON/`?react`/`.module.css` imports untouched. Update `index.html`'s `/src/main.jsx` entry. Align `import/extensions` rule per Phase A.
3. Verify: `vite build` green, `vitest run` green, playwright boot smoke green, `tsc --noEmit` count ≈ baseline (expected slightly lower thanks to Phase A decorator fix). Commit as pure-rename commit.

## Phase D — Error burn-down (bottom-up, across sessions)
Order (each session = one or more groups; error count must never increase):
1. `src/utils/` (116 files; highest fan-in — typing these cascades everywhere). Wire kanel types into the API seam here: `apiClient.ts`, `processSubscriptionResult.ts`, `executeQueuedQuery.ts`, `insertRev.ts`, `syncPoller.ts`; replace or test-gate `revTableFields.ts` against generated types.
2. `src/dbSchema/` (30) + residual `dbModel.ts` typing (typed WDB models).
3. `src/store/` (20) + `src/modules/` (7) — typed jotai atoms (`userAtom` etc. currently `atom({})`).
4. `src/components/shared/`, `Header/`, `Documentation/` (~158).
5. `src/components/Data/` (322) — sub-split per entity (Art, Kultur, Zaehlung, …); components consume kanel row types via props.
6. `src/components/Tree/` (133, incl. the 2,733-line `nodes/index.ts`), then `routes/`, `Router.tsx`, `App.tsx`, `main.tsx`.
Along the way: opportunistic vitest tests for typed utils (label formatters, sort helpers, URL id extractors); add `@vitest/coverage-v8` + `test:coverage` script for visibility. No hard gate.

## Phase E — Hardening, deploy gate, docs
1. Enable `noUnusedLocals` + `noUnusedParameters`; remove `allowJs`/`checkJs` (no JS left in `src/`).
2. Verify all gates (tsc 0, eslint 0, type-coverage 100%, tests/api/e2e/build green).
3. Wire `verify` (lint + typecheck + test) into `npm run deploy` **only now** — gating earlier would block deploys for the whole migration period.
4. Update `CLAUDE.md`: TS architecture, `models:generate` schema-change workflow, remove stale claims (~6.5k errors, removed CI); update `tasks.md`.

## Known risks / mitigations
- **WDB decorators**: babel (legacy) and tsc (`experimentalDecorators`) must agree; vitest api-config already mirrors the babel pass — keep in sync.
- **660-error file**: `dbModel.ts` fixes ride on Phase A config, not code churn.
- **Kanel `Date` vs WDB string rows**: map at the sync boundary if friction appears.
- **`type: module` + rolldown + `legacy.inconsistentCjsInterop`**: untouched by rename; watch the watermelondb/lokijs chunk in build smoke.
- **Stay on TS 6.0.3** per `dev-comments` until typescript-eslint supports the TS 7 API.

## Scope of this first implementation session
Phases A + B + C completely (clean eslint, kanel generated & committed, all 676 files renamed, build/tests/e2e smoke verified, baseline numbers recorded), plus starting Phase D on `src/utils/` if the session allows. Subsequent sessions execute Phase D groups and Phase E.