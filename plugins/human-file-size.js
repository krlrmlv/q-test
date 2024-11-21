export default function ({ i18n }, inject) {
  inject('humanFileSize', (bytes, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
      return `${bytes} ${i18n.t('units.B')}`
    }

    // const units = si
    //   ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    //   : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    let u = -1
    const r = 10 ** dp

    do {
      bytes /= thresh
      ++u
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    )

    return `${bytes.toFixed(dp)} ${i18n.t(`units.${units[u]}`)}`
  })
}
