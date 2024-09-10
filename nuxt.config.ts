// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    ['github:OnMaine/shared', { auth: process.env.GITHUB_TOKEN }]
  ],

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: ['@nuxt/image'],
  //@ts-ignore
  image: {
    format: ['webp'],
    dir: 'assets/images',
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