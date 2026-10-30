import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgrPlugin from 'vite-plugin-svgr'

const rootDir = dirname(fileURLToPath(import.meta.url))

const sqliteWorkerRuntimeFile = `${rootDir}/node_modules/nitromelondb/adapters/sqlite/sqlite-wasm/workerRuntime.js`

// the sqlite adapter's makeDispatcher entry unconditionally requires the
// Node dispatcher (better-sqlite3); the web variant is only selected via
// metro's platform resolution (.web.js), which Vite does not do. Redirect
// to it - must run in the optimizer (where the adapter is prebundled) and
// in the build.
const sqliteWebDispatcher = (): Plugin => ({
  name: 'sqlite-web-dispatcher',
  enforce: 'pre',
  resolveId(source, importer) {
    if (
      importer?.endsWith('nitromelondb/adapters/sqlite/index.js') &&
      source === './makeDispatcher'
    ) {
      return `${rootDir}/node_modules/nitromelondb/adapters/sqlite/makeDispatcher/index.web.js`
    }
    return null
  },
})

// the web dispatcher requires the wasm module at load time purely to derive
// its default URL; under Vite that require becomes a ?import request the
// dev server cannot serve. initiateDb always passes web.wasmUrl explicitly,
// so resolve the wasm module to an empty stub instead.
const sqliteWasmStub = (): Plugin => ({
  name: 'sqlite-wasm-stub',
  enforce: 'pre',
  resolveId(source) {
    if (source.endsWith('sqlite-wasm/wa-sqlite-async.wasm')) {
      return '\0sqlite-wasm-stub'
    }
    return null
  },
  load(id) {
    if (id === '\0sqlite-wasm-stub') return 'export default ""'
    return null
  },
})

// in dev, the sqlite worker entry's relative import of workerRuntime.js
// would be served as raw CommonJS (only bare imports are rewritten to
// optimized deps). Resolve it to the optimizer's prebundled file instead.
// Return a filesystem id (not a /node_modules URL) so Vite 8 can load it
// reliably in the pre-transform pipeline.
const sqliteWorkerDepUrl = (): Plugin => ({
  name: 'sqlite-worker-dep-url',
  enforce: 'pre',
  apply: 'serve',
  resolveId(source) {
    if (
      !source.endsWith(
        'nitromelondb/adapters/sqlite/sqlite-wasm/workerRuntime.js',
      )
    ) {
      return null
    }
    try {
      const metadata = JSON.parse(
        readFileSync(`${rootDir}/node_modules/.vite/deps/_metadata.json`, 'utf8'),
      )
      const info = metadata.optimized[sqliteWorkerRuntimeFile]
      if (info?.file) {
        const optimizedFile = `${rootDir}/node_modules/.vite/deps/${info.file}`
        if (existsSync(optimizedFile)) {
          return optimizedFile
        }
      }
    } catch {
      // metadata not written yet (first optimization still running)
    }
    return null
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 5175 },
  // the sqlite adapter's CJS worker graph must run through the dep
  // optimizer in dev; it cannot be named by its bare id (the package
  // exports map hides it), so include its file path
  optimizeDeps: {
    include: [sqliteWorkerRuntimeFile],
    rolldownOptions: {
      plugins: [sqliteWebDispatcher(), sqliteWasmStub()],
    },
  },
  // e2e/ contains Playwright tests, api-tests/ needs the local backend
  // (npm run test:api) - neither runs in the default vitest run
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**', 'api-tests/**'],
  },
  plugins: [
    sqliteWebDispatcher(),
    sqliteWasmStub(),
    sqliteWorkerDepUrl(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    VitePWA({
      workbox: {
        sourcemap: true,
        globPatterns: [
          '**/*.{js,jsx,ts,tsx,css,html,ico,png,svg,webp,json,woff2,woff,wasm}',
        ],
        maximumFileSizeToCacheInBytes: 1000000000,
      },
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg?react',
        'favicon.ico',
        'robots.txt',
        'favicon_192.png',
        'favicon_512.webp',
        'favicon_512.png',
      ],
      // https://developer.mozilla.org/en-US/docs/Web/Manifest
      manifest: {
        name: 'vermehrung.ch',
        short_name: 'vermehrung',
        description: 'Bedrohte Pflanzenarten vermehren',
        background_color: '#2e0c58',
        theme_color: '#2e0c58',
        display: 'minimal-ui',
        icons: [
          {
            src: '/favicon.svg?react',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable any',
          },
          {
            src: '/favicon_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon_512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
          {
            src: '/favicon_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        categories: ['business', 'productivity'],
        screenshots: [],
        orientation: 'portrait',
      },
      devOptions: {
        //enabled: true,
      },
    }),
    react({
      jsxImportSource: '@emotion/react',
    }),
    babel({
      presets: [reactCompilerPreset()],
      plugins: [
        ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    }),
  ],
  css: {
    modules: {
      // enable using named exports for css classes
      // https://vite.dev/guide/features.html#css-modules
      localsConvention: 'camelCaseOnly',
    },
  },
  legacy: {
    // Vite 8 changed CJS interop: with "type":"module" in package.json,
    // default imports from CJS modules now return module.exports directly,
    // ignoring __esModule:true. Restore the old behavior until dependencies
    // (e.g. nitromelondb/adapters/lokijs) are updated.
    //
    // output from claude:
    //     The module exports { __esModule: true, default: [Function] }. With Vite 8's new Rolldown CJS interop, because the project has "type": "module" in package.json, the default import now returns the whole module.exports object instead of module.exports.default — so LokiJSAdapter is the object, not the class.

    // The quickest fix is adding legacy.inconsistentCjsInterop: true to the vite config to restore the previous behavior (Vite 8 provides this escape hatch exactly for this). Other CJS packages in your large dependency tree may have the same issue.

    // Edited
    // vite.config.ts+7-0
    // This is a deprecated option that will be removed in a future Vite version. The proper long-term fix would be to either:

    // Wait for nitromelondb to publish proper ESM exports
    // Or change the import to import _mod from '...'; const LokiJSAdapter = _mod.default ?? _mod
    // But inconsistentCjsInterop: true covers any other CJS packages in your dependencies that may have the same issue
    inconsistentCjsInterop: true,
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) return 'vendor-firebase'
          if (
            id.includes('node_modules/@mui') ||
            id.includes('node_modules/@emotion')
          )
            return 'vendor-mui'
          if (
            id.includes('node_modules/mobx') ||
            id.includes('node_modules/mst-persist')
          )
            return 'vendor-mobx'
          // keep the wa-sqlite worker's module graph inside the emitted
          // worker chunk - a manual chunk would hollow out the worker entry
          // into an empty facade (and worker-only code would land in a
          // main chunk)
          if (id.includes('nitromelondb/adapters/sqlite/sqlite-wasm'))
            return undefined
          if (id.includes('node_modules/nitromelondb'))
            return 'vendor-watermelondb'
          if (
            id.includes('node_modules/urql') ||
            id.includes('node_modules/@urql') ||
            id.includes('node_modules/graphql')
          )
            return 'vendor-graphql'
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/scheduler/')
          )
            return 'vendor-react'
        },
      },
    },
  },
})
