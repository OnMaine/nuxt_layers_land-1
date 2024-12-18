// https://nuxt.com/docs/api/configuration/nuxt-config
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineNuxtConfig({
  extends: [
    ['github:OnMaine/shared', { auth: process.env.GITHUB_TOKEN }]
  ],

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  i18n: {
    lazy: true,
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
      },
      {
        code: 'es',
        iso: 'es',
        name: 'Spanish',
      },
      {
        code: 'pt',
        iso: 'pt',
        name: 'Portuguese',
      },
      {
        code: 'de',
        iso: 'de',
        name: 'Deutsch',
      },
      {
        code: 'fr',
        iso: 'fr',
        name: 'French',
      },
      {
        code: 'pl',
        iso: 'pl',
        name: 'Polish',
      },
      {
        code: 'tr',
        iso: 'tr',
        name: 'Turkish',
      },
      {
        code: 'sv',
        iso: 'sv',
        name: 'Swedish',
      },
    ],
    vueI18n: './i18n.config.ts',
    compilation: {
      strictMessage: false,
    },
  },

  sourcemap: true,

  vite: {
    plugins: [
      sentryVitePlugin({
        org: "test-r2k",
        project: "javascript-vue",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          filesToDeleteAfterUpload: [
            '.nuxt/**/*.js.map',
            '.output/**/*.js.map',
          ],
        },
      }),
    ],
  },

  modules: ['@nuxt/image', '@nuxtjs/i18n'],
  //@ts-ignore
  image: {
    format: ['webp'],
    screens: {
      'xs': 360,
      'sm': 550,
      'md': 880,
      'lg': 1050,
      'xl': 1182,
      'xxl': 1600,
      '2xl': 1920,
      '3xl': 2560,
    },
  },
})