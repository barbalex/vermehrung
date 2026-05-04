import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 5175 },
  plugins: [
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
        ['@babel/plugin-proposal-decorators', { legacy: true }],
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
    // (e.g. @nozbe/watermelondb/adapters/lokijs) are updated.
    //
    // output from claude:
    //     The module exports { __esModule: true, default: [Function] }. With Vite 8's new Rolldown CJS interop, because the project has "type": "module" in package.json, the default import now returns the whole module.exports object instead of module.exports.default — so LokiJSAdapter is the object, not the class.

    // The quickest fix is adding legacy.inconsistentCjsInterop: true to the vite config to restore the previous behavior (Vite 8 provides this escape hatch exactly for this). Other CJS packages in your large dependency tree may have the same issue.

    // Edited
    // vite.config.ts+7-0
    // This is a deprecated option that will be removed in a future Vite version. The proper long-term fix would be to either:

    // Wait for @nozbe/watermelondb to publish proper ESM exports
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
          if (id.includes('node_modules/@nozbe/watermelondb'))
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
