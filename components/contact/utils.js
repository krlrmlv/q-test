/* eslint-disable no-undef */

export function createCallbacks(marker, placemark) {
  if (marker.callbacks && typeof marker.callbacks === 'object') {
    for (const key in marker.callbacks) {
      placemark.events.add(key, marker.callbacks[key])
    }
  }
}

export function createClusters(markers, options, map) {
  const clusters = {}
  for (const marker of markers) {
    if (!marker.clusterName) continue
    clusters[marker.clusterName] = clusters[marker.clusterName]
      ? [...clusters[marker.clusterName], marker]
      : [marker]
  }
  for (const clusterName in clusters) {
    // const clusterOptions = options[clusterName] || {}
    const clusterer = new ymaps.Clusterer({
      preset: 'islands#redClusterIcons',
      openBalloonOnClick: false,
      groupByCoordinates: false,
    })
    clusterer.add(clusters[clusterName])
    map.geoObjects.add(clusterer)
  }
  try {
    map
      .setBounds(map.geoObjects.getBounds(), { checkZoomRange: true })
      .then(() => {
        const zoom = map.getZoom()
        if (zoom > 16) {
          map.setZoom(16)
        }
      })
  } catch (e) {}
}

export function getIconPreset(marker) {
  const firstPart = marker.icon.color || 'blue'

  let secondPart
  if (marker.icon.glyph) {
    secondPart = setFirstLetterToUppercase(marker.icon.glyph)
  } else if (marker.icon.content) {
    secondPart = 'Stretchy'
  } else {
    secondPart = ''
  }
  return firstPart + secondPart
}

export function setFirstLetterToUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function setCoordsToNumeric(arr) {
  return arr.map((item) =>
    Array.isArray(item) ? setCoordsToNumeric(item) : +item
  )
}

export function objectComparison(first, second) {
  const cache = [] // кеш обьектов, для избежания рекурсии

  function inCache(first, second) {
    let i = cache.length
    while (i--) {
      if (
        (cache[i][0] === first || cache[i][0] === second) &&
        (cache[i][1] === second || cache[i][1] === first)
      )
        return true
    }
    return false
  }

  return (function eq(f, s) {
    if (f === s) return true // сравниваем обычным образом
    if (f instanceof Date && s instanceof Date) return +f === +s // время
    if (typeof f !== 'object' || typeof s !== 'object') return false // если хотябы один из аргументов не объект (положительный случай для необъектов рассмотрен выше)
    if (inCache(f, s)) return true // есть в кеше
    cache.push([f, s]) // кешируем

    const keys = Object.keys(f)

    let i = keys.length // получаем ключи
    if (Object.keys(s).length !== i) return false // если количество ключей не совпадает
    while (i--) if (!eq(f[keys[i]], s[keys[i]])) return false // рекурсивный вызов

    return true
  })(first, second)
}

export function compareValues(newVal, oldVal, bus) {
  if (objectComparison(newVal, oldVal)) {
    return
  }
  if (bus.rerender) {
    clearTimeout(bus.rerender)
  }
  bus.rerender = setTimeout(() => bus.initMap && bus.initMap(), 10)
}

export default {}
