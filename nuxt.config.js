// import colors from 'vuetify/es5/util/colors'
require('dotenv').config();

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          '//fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=block'
      },
      {
        rel: 'stylesheet',
        href:
          '//fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=fallback'
      }
    ]
  },
  /**
   * Environment variables
   */
  env: {
    clientBaseUrl: process.env.CLIENT_BASE_URL,
    strapiBaseUri: process.env.API_URL
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-fontawesome.js',
    '~/plugins/vuelidate.js',
    '~/plugins/highcharts-vue.js',
    '~plugins/vuesax.js', 
    '~plugins/vueflicking.js', 
    { src: '~/plugins/v-calendar.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    'portal-vue/nuxt'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL
      }
    },
    errorHandler: '~/plugins/errorhandler.apollo.js'
  },
  axios: {
    baseURL: process.env.API_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'users/me',
            method: 'get',
            propertyName: false
          }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/',
      home: false
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       }
  //     }
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
