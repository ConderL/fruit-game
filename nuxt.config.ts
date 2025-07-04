// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    // 使用 @unocss/nuxt 插件
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
  },
})
