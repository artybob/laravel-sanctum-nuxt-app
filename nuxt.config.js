import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - laravel-sanctum-nuxtjs-app',
    title: 'laravel-sanctum-nuxtjs-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  axios: {
    baseUrl: process.env.API_URL,
    credentials: true,
    xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
    withCredentials: true
  },

  echo: {
    broadcaster: 'pusher',
    key: 'fa078a2591e7259497d9',
    cluster: 'ap2',
    encrypted: true,
    authEndpoint: process.env.API_URL + "/broadcasting/auth",
    // csrfToken: ' ',
    disableStats: false,
  },

  auth: {
    redirect: {
      home: '/',
    },
    strategies: {
      laravelPassportPasswordGrant: {
        name: 'laravelPassportPassword',
        provider: 'laravel/passport',
        endpoints: {
          register: {
            url: '/api/register',
            method: 'post'
          },
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: "token"
          },
          logout: {url: '/api/logout', method: 'post'},
          user: {
            url: '/api/user',
            method: 'get',
          },
        },
        grantType: 'password',
        url: process.env.LARAVEL_ENDPOINT,
        clientId: process.env.PASSPORT_CLIENT_ID,
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
      },
      // password_grant_custom: {
      //   name: 'passwordGrantCustom',
      //   scheme: "~/auth/schemes/PassportPasswordScheme.js",
      //   client_id: process.env.PASSPORT_CLIENT_ID,
      //   client_secret: process.env.PASSPORT_CLIENT_SECRET,
      //   endpoints: {
      //     register: {
      //       url: '/api/register',
      //       method: 'post'
      //     },
      //     login: {
      //       url: '/api/login',
      //       method: 'post',
      //       propertyName: "token"
      //     },
      //     logout: false,
      //     user: {
      //       url: "api/user",
      //       method: 'get',
      //     }
      //   }
      // },
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    '@nuxtjs/laravel-echo',
    'cookie-universal-nuxt',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
