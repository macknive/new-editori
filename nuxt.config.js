// import colors from 'vuetify/es5/util/colors'

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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//cdn.jsdelivr.net/npm/medium-editor@5.22.1/dist/css/medium-editor.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '//cdn.jsdelivr.net/npm/medium-editor@5.22.1/dist/css/themes/beagle.min.css' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Merriweather&display=block' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Open+Sans&display=fallback' },
    ]
  },
  /**
   * Environment variables
   */
  env: {
    strapiBaseUri: process.env.API_URL || 'http://localhost:1337'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
    '~/plugins/vue2-medium-editor.client.js',
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
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL || 'http://localhost:1337/graphql'
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:1337',
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
    extend (config, ctx) {
    }
  }
}
