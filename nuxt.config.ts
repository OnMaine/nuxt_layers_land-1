// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    ['github:OnMaine/shared', { auth: process.env.GITHUB_TOKEN }]
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
