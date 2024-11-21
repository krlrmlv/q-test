/* eslint-disable no-undef */

import Vue from 'vue'
import * as utils from './utils'

export default {
  data() {
    return {
      ymapId: 'map' + Math.round(Math.random() * 100000),
      myMap: {},
      ymapReallyReady: false,
    }
  },
  props: {
    coords: {
      type: Array,
      validator(val) {
        return !val.filter((item) => isNaN(item)).length
      },
      required: true,
    },
    zoom: {
      validator(val) {
        return !isNaN(val)
      },
      default: 18,
    },
    clusterOptions: {
      type: Object,
      default: () => ({}),
    },
    behaviors: {
      type: Array,
      default: () => ['default'],
    },
    controls: {
      type: Array,
      default: () => ['default'],
    },
    scrollZoom: {
      type: Boolean,
    },
    zoomControl: {
      type: Object,
      default: () => ({}),
    },
    zoomControlPosition: {
      type: Object,
      default: () => ({}),
    },
    mapType: {
      type: String,
      default: 'map',
      validator(val) {
        return ['map', 'satellite', 'hybrid'].includes(val)
      },
    },
    placemarks: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    coordinates() {
      return this.coords.map((item) => +item)
    },
  },
  methods: {
    getBalloonContent(placemark) {
      if (placemark?.properties?.balloonContentBody) {
        return placemark.properties.balloonContentBody
      }

      const lines = ['<div class="ymaps-balloon-custom">']
      if (placemark?.title) {
        lines.push(
          '<p class="mb-0 pr-24"><strong>',
          placemark.title,
          '</strong></p>'
        )
      }
      if (placemark?.address) {
        lines.push('<p class="mb-0">', placemark?.address, '</p>')
      }
      if (placemark?.phone) {
        lines.push('<p class="mb-0">', placemark.phone, '</p>')
      }
      lines.push(
        '<button class="btn btn-sm btn-white btn-icon btn-close ymap-balloon-close"><span class="sr-only">',
        this.$t('global.close'),
        '</span></button>',
        '</div>'
      )
      return lines.join('')
    },

    init() {
      this.myMap = new ymaps.Map(this.ymapId, {
        center: this.coordinates,
        zoom: +this.zoom,
        behaviors: this.behaviors,
        controls: this.controls,
        type: `yandex#${this.mapType}`,
      })

      const markers = []
      const myGeoObjects = new ymaps.GeoObjectCollection()

      if (this.zoomControl) {
        this.myMap.controls.remove('zoomControl')
        this.myMap.controls.add(new ymaps.control.ZoomControl(this.zoomControl))
      }
      if (this.scrollZoom === false) {
        this.myMap.behaviors.disable('scrollZoom')
      }

      if (this.placemarks) {
        this.placemarks.forEach((placemark) => {
          const yplacemark = new ymaps.Placemark(
            placemark.coords,
            placemark.properties || {},
            placemark.options || {}
          )

          utils.createCallbacks(placemark, yplacemark)

          if (placemark.clusterName) {
            yplacemark.clusterName = placemark.clusterName
            markers.push(yplacemark)
          }

          myGeoObjects.add(yplacemark)
        })
      }

      this.myMap.geoObjects.add(myGeoObjects)

      if (myGeoObjects.getLength() === 1) {
        /* force open balloon if single mark is selected */
        const mark = this.placemarks[0]
        this.myMap.balloon.open(mark.coords, this.getBalloonContent(mark), {
          closeButton: false,
          maxWidth: 336,
          offset: [6, -30],
        })
      }
      utils.createClusters(markers, this.clusterOptions, this.myMap)
      this.$emit('map-was-initialized', this.myMap)
    },
  },
  watch: {
    coordinates(newVal) {
      this.myMap.setCenter && this.myMap.setCenter(newVal, this.zoom)
    },
    placemarks(newVal, oldVal) {
      if (this.ymapReallyReady) {
        this.myMap.destroy && this.myMap.destroy()
        this.init()
      }
    },
  },
  render(h) {
    return h('section', { class: 'ymap-container' }, [
      h('div', {
        attrs: {
          id: this.ymapId,
          class: 'ymap-body',
        },
      }),
      this.$slots.default,
    ])
  },
  beforeMount() {
    if (!this.$ymapEventBus) {
      this.$ymapEventBus = new Vue({
        data: {
          ymapReady: !!window && !!window.ymaps,
          scriptIsNotAttached: window && !window.ymaps,
        },
      })
    }
    if (this.$ymapEventBus.scriptIsNotAttached) {
      const yandexMapScript = document.createElement('SCRIPT')
      yandexMapScript.setAttribute(
        'src',
        'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
      )
      yandexMapScript.setAttribute('async', '')
      yandexMapScript.setAttribute('defer', '')
      document.body.appendChild(yandexMapScript)
      this.$ymapEventBus.scriptIsNotAttached = false
      yandexMapScript.onload = () => {
        this.$ymapEventBus.ymapReady = true
        this.$ymapEventBus.$emit('scriptIsLoaded')
      }
    }
  },
  mounted() {
    if (this.$ymapEventBus.ymapReady) {
      ymaps.ready(() => {
        this.ymapReallyReady = true
        this.init()
      })
    } else {
      this.$ymapEventBus.$on('scriptIsLoaded', () => {
        this.$ymapEventBus.initMap = () => {
          this.myMap.destroy()
          this.init()
        }
        ymaps.ready(() => {
          this.ymapReallyReady = true
          this.init()
        })
      })
    }
  },
}
