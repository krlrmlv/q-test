export default ({ app: { router } }, inject) => {
  // Only run on client-side and only in production mode
  if (process.env.NODE_ENV === 'production' && process.client) {
    const tmrId = process.env.TMR_ID
    const tmrUrl = 'https://top-fwz1.mail.ru/js/code.js'

    function create(document, window, elId) {
      if (document.getElementById(elId)) return

      const ts = document.createElement('script')
      ts.type = 'text/javascript'
      ts.defer = true
      ts.id = elId
      ts.src = tmrUrl

      const f = function () {
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(ts, s)
      }

      if (window.opera === '[object Opera]') {
        document.addEventListener('DOMContentLoaded', f, false)
      } else {
        f()
      }

      router.afterEach(() => {
        const start = new Date().getTime()
        const type = 'pageView'
        tmrCall({ type, start })
      })
    }

    function tmrCall(...args) {
      if (!process.client) return

      const _tmr = window._tmr || (window._tmr = [])
      _tmr.push({ id: tmrId, ...args })
    }

    create(document, window, 'tmr-code')

    inject('tmr', (...args) => {
      tmrCall(...args)
    })
  } else if (process.client) {
    inject('tmr', (...args) => {
      // eslint-disable-next-line
      console.log('Skipping Top.Mail.ru call in develop mode:', ...args)
    })
  }
}
