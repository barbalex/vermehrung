import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgrPlugin from 'vite-plugin-svgr'

const rootDir = dirname(fileURLToPath(import.meta.url))

const lokiWorkerFile = `${rootDir}/node_modules/nitromelondb/adapters/lokijs/worker/loki.worker.js`

// nitromelondb's LokiJS web-worker mode expects webpack's worker-loader
// (`new (require('./worker/loki.worker'))()`), which no bundler provides.
// Swap the dispatcher for an ESM version that creates a real worker
// (src/utils/lokiDispatcher.ts).
const lokiDispatcherRedirect = (): Plugin => ({
  name: 'loki-dispatcher-redirect',
  enforce: 'pre',
  resolveId(source, importer) {
    if (
      importer?.endsWith('nitromelondb/adapters/lokijs/index.js') &&
      source === './dispatcher'
    ) {
      return `${rootDir}/src/utils/lokiDispatcher.ts`
    }
    return null
  },
})

// in dev, the worker entry's relative import of loki.worker.js would be
// served as raw CommonJS (only bare imports are rewritten to optimized
// deps). Resolve it to the optimizer's prebundled file instead. The dep is
// registered under its file path via optimizeDeps.include below.
const lokiWorkerDepUrl = (): Plugin => ({
  name: 'loki-worker-dep-url',
  enforce: 'pre',
  apply: 'serve',
  resolveId(source) {
    if (!source.endsWith('node_modules/nitromelondb/adapters/lokijs/worker/loki.worker.js')) {
      return null
    }
    try {
      const metadata = JSON.parse(
        readFileSync(`${rootDir}/node_modules/.vite/deps/_metadata.json`, 'utf8'),
      )
      const info = metadata.optimized[lokiWorkerFile]
      if (info?.file) {
        return `/node_modules/.vite/deps/${info.file}?v=${metadata.browserHash}`
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
  // the adapter's CJS graph must run through the dep optimizer in dev. The
  // worker module itself cannot be named by its bare id (the package
  // exports map hides it), so include its file path.
  optimizeDeps: {
    include: [lokiWorkerFile],
    rolldownOptions: {
      plugins: [lokiDispatcherRedirect()],
    },
  },
  // e2e/ contains Playwright tests, api-tests/ needs the local backend
  // (npm run test:api) - neither runs in the default vitest run
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**', 'api-tests/**'],
  },
  plugins: [
    lokiDispatcherRedirect(),
    lokiWorkerDepUrl(),
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
          '**/*.{js,jsx,ts,tsx,css,html,ico,png,svg,webp,json,woff2,woff}',
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
          // keep the loki worker's module graph inside the emitted worker
          // chunk - a manual chunk would hollow out the worker entry into an
          // empty facade (and worker-only code would land in a main chunk)
          if (
            id.includes('nitromelondb/adapters/lokijs/worker') ||
            id.includes('node_modules/lokijs')
          )
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
