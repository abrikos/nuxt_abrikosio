// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-N6HSRSC9'
      }
    }
  },
  app:{
    head: {
      meta:[
        { name: 'description', content: 'Описание вашего сайта в Nuxt 3' },
        { name: 'og:site_name', content: 'Abrikosio' },
        { name: 'og:description', content: 'Og description' },
        { name: 'og:url', content: 'https://abrikosio.ru/post/1' },
        { name: 'og:image', content: 'https://www.gravatar.com/avatar/79099480674f7b3aa4880d0a52513c82?s=64&d=identicon&r=PG' },
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
  modules: ['nuxt-quasar-ui', '@pinia/nuxt', '@nuxt/scripts'],
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