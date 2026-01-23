// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  // scripts: {
  //   registry: {
  //     googleTagManager: {
  //       id: 'GTM-N6HSRSC9'
  //     }
  //   }
  // },
  app:{
    head: {
      meta:[
        { name: 'og:site_name', content: 'Abrikosio' },
        { name: 'og:title', content: 'Blogs' },
        { name: 'og:type', content: 'site' },
        { name: 'og:image', content: 'https://abrikosio.ru/logo.png' },
      ]
    }
  },
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
