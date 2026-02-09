// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/a11y', '@nuxt/image', '@nuxt/ui', '@nuxt/hints', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      }
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    public: {
      phoneNumber: '+79001234567',
      phoneFormatted: '+7 (900) 123-45-67',
      telegramLink: 'https://t.me/travelsite',
      telegramUsername: '@travelsite',
      maxLink: 'https://max.ru/travelsite'
    }
  }
})
