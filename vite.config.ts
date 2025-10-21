import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgrPlugin from 'vite-plugin-svgr'
// import babel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5175,
  },
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
      babel: {
        plugins: [
          'babel-plugin-react-compiler',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
      },
    }),
  ],
})
