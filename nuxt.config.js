require('dotenv').config()
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
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

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
    baseUrl: 'https://heroku-books-vue.herokuapp.com',
  },
  /*
   ** Render configuration
   ** Used to set headers for access to static files, mainly
   **     used for allowing iframe to access documents in temp
   ** See https://nuxtjs.org/api/configuration-render#static
   */
  render: {
    static: {
      setHeaders(res) {
        res.setHeader(
          'X-Frame-Options',
          'ALLOW-FROM https://docs.google.com/gview'
        )
      },
    },
  },
  /*
   ** Auth configuration
   ** See https://auth.nuxtjs.org/api/options/
   */

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.BASE_URL}/auth/login`,
            method: 'post',
            // propertyName: 'token',
          },
          logout: { url: `${process.env.BASE_URL}/logout`, method: 'get' },
          user: { url: `${process.env.BASE_URL}/auth/user`, method: 'get' },
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
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
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
