import { getCdnImage, getStaticFile, getStaticImage } from '@/utils/static-url'

export default function ({ $config }, inject) {
  inject('getCdnImage', (path, options) =>
    getCdnImage(path, options, $config.cdnUrl)
  )

  inject('getStaticFile', (url, prefix, apiLink) =>
    getStaticFile({ url, prefix, apiLink, config: $config })
  )

  inject('getStaticImage', (url, size, apiLink) =>
    getStaticImage({ url, size, apiLink, config: $config })
  )
}
