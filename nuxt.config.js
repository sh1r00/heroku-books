export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    [
      'nuxt-stripe-module',
      {
        publishableKey: 'pk_test_SkFCsq5uRULpe8Vo9Pa4bvb9',
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: process.env.baseUrl,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            // propertyName: 'token',
          },
          logout: { url: '/logout', method: 'get' },
          user: { url: '/auth/user', method: 'get' },
        },
        tokenRequired: false,
        tokenType: false,
      },
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
      },
    },
    redirect: false,
  },
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}
