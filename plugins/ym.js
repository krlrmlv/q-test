/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
export default ({ app: { router } }, inject) => {
  // Only run on client-side and only in production mode
  if (process.env.NODE_ENV === 'production') {
    const basePath = (router.options.base || '/').replace(/\/$/, '')
    const id = process.env.YANDEX_METRIKA_ID
    const metrikaUrl = 'https://mc.yandex.ru/metrika/tag.js'
    const metrikaOptions = {
      accurateTrackBounce: true,
      clickmap: true,
      defer: true,
      trackLinks: true,
      webvisor: true,
    }

    let ready = false

    router.onReady(() => {
      // Mark when the router has completed the initial navigation
      ready = true
    })

    function create() {
      if (!ready) {
        // Don't record a duplicate hit for the initial navigation.
        ;(function (m, e, t, r, i, k, a) {
          m[i] =
            m[i] ||
            function () {
              ;(m[i].a = m[i].a || []).push(arguments)
            }
          m[i].l = 1 * new Date()
          ;(k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.defer = true),
            (k.src = r),
            a.parentNode.insertBefore(k, a)
        })(window, document, 'script', metrikaUrl, 'ym')

        ym(id, 'init', metrikaOptions)
      }
      router.afterEach((to, from) => {
        const referer = from.name ? basePath + from.fullPath : document.referrer
        ym(id, 'hit', basePath + to.fullPath, { referer, defer: true })
      })
    }

    if (window.ym === undefined) {
      create()
    }

    inject('ym', (...args) => {
      ym(id, ...args)
    })
  } else {
    inject('ym', (...args) => {
      // eslint-disable-next-line
      console.log('Skipping yandex metrika call in develop mode:', ...args)
    })
  }
}
