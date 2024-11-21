/* eslint-disable no-undef */

import { mindboxUserVisit } from '~/utils/mindbox'

export default function ({ $cookies }) {
  if (process.env.NODE_ENV === 'production' && process.client) {
    const script = document.createElement('script')
    script.onload = () => {
      mindbox.queue = mindbox.queue || []
      mindbox('create', {
        endpointId: 'ekfgroup.com',
      })
      window.mindbox = mindbox
      mindboxUserVisit($cookies)
    }
    script.src = 'https://api.mindbox.ru/scripts/v1/tracker.js'
    document.head.appendChild(script)
  }
}
