// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      devMode: process.env.NODE_ENV !== 'production',
      authExpiration: 3600 * 24 * 30,
      authRefreshBeforeExpiration: 3000,
      authTokenName: 'auth_token',
      authPages:['user-cabinet','post-create','post-edit']
    }
  },
  devServer: {
    port: 9000,
    host:'abrikosio.local',
  },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
  ],
  quasar: {
    sassVariables: '~~/public/quazar.variables.sass',
    plugins:['Notify'],
    components: {
      defaults: {
        QCard:{
          flat: true,
          bordered: true
        },
        QBtn: {
          dense: true,
          noCaps: true
        },
        QSelect: {
          outlined: true,
          dense: true
        },
      }
    },
    iconSet: 'mdi-v7',
    lang: 'ru'

  },

})
