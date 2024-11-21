import routes from './config/routes.js'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ekfgroup-new',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'yandex-verification', content: process.env.YANDEX_VERIFICATION },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'preload', as: 'image', href: '/images/logo-ekf.svg' },
    ],
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`,
        defer: true,
      },
    ],
  },

  env: {
    EMBED_URL: process.env.EMBED_URL,
    GTM_ID: process.env.GTM_ID,
    MARKET_SITE_URL: process.env.MARKET_SITE_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    REST_API_URL: process.env.REST_API_URL,
    SITE_URL: process.env.SITE_URL,
    SENTRY_DNS: process.env.SENTRY_DNS,
    TMR_ID: process.env.TMR_ID,
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    GA4_ID: process.env.GA4_ID,
    API_V2_SWAGGER_URL: process.env.API_V2_SWAGGER_URL,
    API_V2_XML_YML_DOCUMENTS_LAMBDA_URL:
      process.env.API_V2_XML_YML_DOCUMENTS_LAMBDA_URL,
    API_V2_KEYCLOAK_REALM_URL: process.env.API_V2_KEYCLOAK_REALM_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/scss/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/static-url.js',
    '~/plugins/body-fixed.js',
    '~/plugins/human-file-size.js',
    '~/plugins/validate.js',
    { src: '~/plugins/touch-events.js', ssr: false },
    { src: '~/plugins/utm.js', ssr: false, mode: 'client' },
    { src: '~/plugins/mindbox.js', ssr: false, mode: 'client' },
    { src: '~/plugins/tmr.js', ssr: false, mode: 'client' },
    { src: '~/plugins/vuex-persistedstate.js', ssr: false, mode: 'client' },
    { src: '~/plugins/ym.js', ssr: false, mode: 'client' },
    { src: '~/plugins/chat-widget.js', ssr: false, mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/', ignore: ['constants'] },
    { path: '~/components/_shared/', prefix: '' },
    '~/components/calculators/',
    '~/components/form-controls/',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/style-resources',
    'nuxt-graphql-request',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/component-cache',
    '@nuxtjs/gtm',
    // '@nuxtjs/yandex-metrika',
    '@nuxtjs/svg-sprite',
    'bootstrap-vue/nuxt',
    'cookie-universal-nuxt',
    'nuxt-speedkit',
    '@nuxtjs/i18n',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    'nuxt-ssr-cache',
  ],

  googleFonts: {
    display: 'swap',
    families: {
      'Golos Text': [400, 500],
    },
    download: true,
    base64: true,
  },

  /*
   ** Sitemap configuration
   */
  sitemap: {
    path: '/sitemap.xml',
    i18n: true,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    sitemaps: [
      {
        path: '/sitemap-static.xml',
        defaults: {
          changefreq: 'daily',
          lastmod: new Date(),
          priority: 0.8,
        },
        filter({ routes }) {
          return routes.map((route) => {
            if (route.url === '/') route.priority = 1
            return route
          })
        },
      },
      {
        path: '/sitemap-gen.xml',
        routes,
        defaults: {
          changefreq: 'daily',
          lastmod: new Date(),
          priority: 0.8,
        },
      },
    ],
  },

  /*
   ** Graphql configuration
   */
  graphql: {
    clients: {
      default: {
        endpoint: process.env.API_LOCATION,
        options: {
          credentials: 'include',
          mode: 'cors',
        },
      },
    },
  },

  /*
   ** GTM module configuration
   */
  gtm: {
    debug: false,
    id: process.env.GTM_ID,
    pageTracking: true,
    scriptDefer: true,
  },

  /*
   ** i18n module configuration
   */
  i18n: {
    locales: [
      { code: 'ru', iso: 'ru' },
      // { code: 'en', iso: 'en' },
    ],
    strategy: 'prefix',
    defaultLocale: 'ru',
    detectBrowserLanguage: false,
    lazy: false,
    seo: true,
    vueI18n: '~/config/i18n.js',
    vueI18nLoader: true,
  },

  /*
   ** Axios configuration
   */
  axios: {
    baseURL: process.env.SITE_URL,
    headers: {
      Accept: 'application/json',
    },
  },

  /*
   ** Bootstrap-vue configuration
   */
  bootstrapVue: {
    bootstrapVueCSS: false,
    bootstrapCSS: false,
    components: ['BContainer', 'BRow', 'BCol', 'BButton', 'BLink'],
    componentPlugins: ['BVToastPlugin'],
  },

  render: {
    resourceHints: false,
  },

  styleResources: {
    scss: [
      // first file here should have all sass @use declarations
      '~/assets/scss/_variables.scss',
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_mixins.scss',
      'bootstrap/scss/_variables.scss',
    ],
  },

  /*
   ** Sentry module configuration
   */
  sentry: {
    dsn: process.env.SENTRY_DNS, // Enter your project's DSN here
    config: {}, // Additional config
  },

  svgSprite: {
    input: '~/assets/images/icons',
    iconsPath: false,
    publicPath: '/_nuxt/',
  },

  publicRuntimeConfig: {
    cdnUrl: process.env.CDN_URL || '',
    gtm: { id: process.env.GTM_ID },
    tmrId: process.env.TMR_ID || '',
    siteUrl: process.env.SITE_URL,
    staticUrl: process.env.REST_API_URL,
  },

  telemetry: false,

  router: {
    middleware: ['analyticReferer'],
    prefetchLinks: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: process.env.PUBLIC_PATH || '/_nuxt/',
    extractCSS: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    filenames: {
      app: ({ isDev, isModern }) =>
        isDev
          ? `[name]${isModern ? '.modern' : ''}.js`
          : `[name].[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) =>
        isDev
          ? `[name]${isModern ? '.modern' : ''}.js`
          : `[name].[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[name].[contenthash:7].css'),
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]',
    },
    loaders: {
      scss: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
    transpile: ['vee-validate/dist/rules'],
    babel: { compact: true },
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
    },
  },

  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      /^\/ru$/,
    ],

    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return
      // falsy value to bypass the cache
      if (route === '/ru') {
        return 'page:home:string'
      }
      return false
    },

    store: {
      type: 'memory',

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 600,
    },
  },

  serverMiddleware: [
    {
      path: '/healthz',
      handler: (_req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ ok: true }))
        res.end();
      }
    },
  ],
}
