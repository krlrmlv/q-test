/* Toggle fixed document body styles to prevent double scrollbars when opening
 * modals, sidebars, etc. */

import { getOffsetTop, getScrollbarWidth } from '@/utils/window'

export default function ({ store }) {
  store.subscribe(({ type, payload }) => {
    if (type === 'SET_BODY_FIXED') {
      const fixedHeader = document.querySelector('.header-fixed .app-header')

      if (payload) {
        const paddingRight = `${getScrollbarWidth()}px`

        document.body.style.setProperty('padding-right', paddingRight)
        if (fixedHeader) {
          fixedHeader.style.setProperty('padding-right', paddingRight)
        }
        /* Save current scroll position to store */
        const offset = getOffsetTop()
        store.dispatch('setBodyFixedOffset', offset)

        document.documentElement.classList.add('body-fixed')
      } else {
        document.documentElement.classList.remove('body-fixed')
        document.body.style.removeProperty('padding-right')
        if (fixedHeader) {
          fixedHeader.style.removeProperty('padding-right')
        }

        /* Scroll to position saved previously, then reset stored
         * scroll position */
        const top = store.state.bodyFixedOffset
        if (process.client && top) {
          window.scrollTo({ top })
        }
        store.dispatch('setBodyFixedOffset', 0)
      }
    }
  })
}
