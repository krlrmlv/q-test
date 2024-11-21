<template>
  <div class="markdown-content-wrapper">
    <div
      v-if="ready"
      ref="root"
      class="markdown-content"
      v-html="htmlContent"
    />

    <MediaModal v-model="modalShow" :items="modalItems" :start="modalStart" />
  </div>
</template>

<script>
import Swiper from 'swiper'
import Vue from 'vue'
import SeoLink from '~/components/_shared/SeoLink'
import { isExternal } from '@/utils/link'
import { mdFull, renderImages, renderLinks } from '@/utils/markdown'

import 'swiper/css/swiper.min.css'

export default {
  // eslint-disable-next-line
  components: { SeoLink },

  props: {
    content: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      htmlContent: null,
      modalItems: [],
      modalShow: false,
      modalStart: 0,
      mounted: false,
      ready: false,
      swiperOptions: {
        autoplay: false,
        grabCursor: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: false,
        },
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
  },

  async fetch() {
    const [md, sanitizeHtml] = await Promise.all([
      mdFull(this.$config),
      import('sanitize-html'),
    ])

    const options = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        a: ['class', 'href', 'style', 'rel'],
        div: ['class'],
        img: ['class', 'src', 'style'],
        span: ['class', 'data-href'],
      },
      disallowedTagsMode: 'recursiveEscape',
      transformTags: {
        a: (tagName, attribs) => {
          if (isExternal(attribs.href)) {
            return {
              tagName: 'span',
              attribs: {
                class: [attribs.class, 'mdseolink'].join(' '),
                'data-href': attribs.href,
              },
            }
          } else return { tagName, attribs }
        },
      },
    }

    const content = sanitizeHtml.default(
      this.content.replace(/\n /gm, ''),
      options
    )

    md.renderer.rules.image = (tokens, idx, options, env, slf) =>
      renderImages(tokens, idx, options, env, slf, this.$config)

    md.renderer.rules.link_open = (tokens, idx, options, env, slf) =>
      renderLinks(tokens, idx, options, env, slf, this.$config)

    this.htmlContent = md.render(content)
    this.ready = true
  },

  computed: {
    mdReadyToProcess() {
      return !this.$fetchState?.pending && this.ready && this.mounted
    },
  },

  watch: {
    mdReadyToProcess: {
      /* Add rich content to markdown when markdown-it loaded &
       * page fully mounted */
      handler(event) {
        if (event) this.processContent()
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.mounted = true
    })
  },

  methods: {
    initGallery(el) {
      if (!el) return

      const links = el.querySelectorAll('.modal-toggle')
      const images = []
      const filteredLinks = []
      links.forEach((link) => {
        const image = link.querySelector('img')
        if (image) {
          /* Skip .modal-toggle links without images inside
           * to avoid modalStart and link index mismatch */
          images.push({ alt: image.alt, url: link.getAttribute('href') })
          filteredLinks.push(link)
        }
      })
      filteredLinks.forEach((link, index) => {
        link.addEventListener('click', (event) =>
          this.showModal(event, images, index)
        )
      })
    },

    initSlider(el) {
      if (!el) return

      const links = el.querySelectorAll('.md-slide')

      /* Create swiper wrapper and fill it with images */
      const wrapper = document.createElement('div')
      if (links.length > 1) {
        wrapper.classList.add('swiper-wrapper')
        links.forEach((link) => {
          const slide = document.createElement('div')
          slide.classList.add('swiper-slide')
          slide.appendChild(link)
          wrapper.appendChild(slide)
        })

        /* Create swiper pagination and navigation */
        const pagination = document.createElement('div')
        pagination.classList.add('swiper-pagination')
        const navigationPrev = document.createElement('button')
        navigationPrev.classList.add('swiper-button-prev')
        const navigationNext = document.createElement('button')
        navigationNext.classList.add('swiper-button-next')

        /* Replace el content with swiper */
        const swiperEl = document.createElement('div')
        swiperEl.className = 'slider-wrapper slider-md-gallery md-gallery'
        swiperEl.appendChild(wrapper)
        swiperEl.appendChild(pagination)
        swiperEl.appendChild(navigationPrev)
        swiperEl.appendChild(navigationNext)
        el.parentNode.replaceChild(swiperEl, el)

        // eslint-disable-next-line
        const swiper = new Swiper(swiperEl, this.swiperOptions)
        this.initGallery(swiperEl)
      } else if (links.length === 1) {
        const link = links[0]
        wrapper.appendChild(link)
        wrapper.classList.add('md-gallery')
        el.parentNode.replaceChild(wrapper, el)
        this.initGallery(wrapper)
      }
    },

    initToc() {
      /* Add invisible .anchor links to TOC target headers
       * to compensate for fixed header height */
      const root = this.$refs.root || document
      const toc = root.querySelector('.md-toc')
      const links = toc ? toc.querySelectorAll('a[href^="#"]') : []
      links.forEach((link) => {
        const anchorId = link.getAttribute('href').substring(1)
        const anchor = document.getElementById(anchorId)
        if (anchor) {
          const anchorLink = document.createElement('a')
          anchor.setAttribute('id', `h-${anchorId}`)
          anchorLink.setAttribute('id', anchorId)
          anchorLink.classList.add('anchor')
          anchor.appendChild(anchorLink)
          link.addEventListener('click', (event) => {
            if (process.client) {
              event.preventDefault()
              anchorLink.scrollIntoView({ behavior: 'smooth' })
            }
          })
        }
      })
    },

    /* Replace all external links with custom SeoLink component */
    initSeoLinks() {
      const SeoLinkCtor = Vue.extend(SeoLink)
      const parent = this
      const links =
        this.$refs.root?.querySelectorAll('.markdown-content .mdseolink') || []

      links.forEach((link) => {
        const href = link.dataset?.href
        const linkClasses = link.className
        const text = link.innerText
        const seoLink = new SeoLinkCtor({
          propsData: {
            href,
            linkClasses,
            text,
            target: '_blank',
          },
          parent,
        })
        seoLink.$mount(link)
      })
    },

    processContent() {
      this.initToc()
      this.initGallery(this.$refs.root)
      this.initSeoLinks()
      const galleries = document.querySelectorAll('.md-gallery')
      galleries.forEach((gallery) => {
        this.initSlider(gallery)
      })
    },

    showModal(event, items, start = 0) {
      event.preventDefault()
      this.modalItems = items
      this.modalStart = start
      this.modalShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
$readmore-icon: url('data:image/svg+xml,<svg width="16" height="16" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m10 3.5859-1.4141 1.4141 2 2h-8.5859v2h8.5859l-2 2 1.4141 1.4141 3.4141-3.4141v-2z" fill="#{$link-color}"/></svg>');
$readmore-hover-icon: url('data:image/svg+xml,<svg width="16" height="16" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m10 3.5859-1.4141 1.4141 2 2h-8.5859v2h8.5859l-2 2 1.4141 1.4141 3.4141-3.4141v-2z" fill="#{$link-hover-color}"/></svg>');
$arrow-left-icon: url('data:image/svg+xml,<svg width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7 6.5859-4.4141 4.4141v2l4.4141 4.4141 1.4141-1.4141-3-3h16.586v-2h-16.586l3-3z" fill="#{$secondary}"/></svg>');
$arrow-right-icon: url('data:image/svg+xml,<svg width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17 6.5859-1.4141 1.4141 3 3h-16.586v2h16.586l-3 3 1.4141 1.4141 4.4141-4.4141v-2z" fill="#{$secondary}"/></svg>');
$quote-icon: url('data:image/svg+xml,<svg width="16" height="16" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.5234 8.3516v4.8984h-4.5234v-3.8672c0-2.0938 0.25-3.6094 0.75-4.5469 0.65625-1.25 1.6953-2.1953 3.1172-2.8359l1.0312 1.6406c-0.85938 0.35938-1.4922 0.89844-1.8984 1.6172-0.40625 0.70313-0.63281 1.7344-0.67969 3.0938h2.2031zm7.2657 0v4.8984h-4.5235v-3.8672c0-2.0938 0.25-3.6094 0.74998-4.5469 0.6563-1.25 1.6953-2.1953 3.1172-2.8359l1.0313 1.6406c-0.8594 0.35938-1.4922 0.89844-1.8985 1.6172-0.4062 0.70313-0.6328 1.7344-0.6797 3.0938h2.2032z" fill="#{$gray-500}"/></svg>');

.markdown-content {
  ::v-deep {
    h2,
    h3 {
      margin-top: 3rem;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    p {
      margin-bottom: 1rem;
    }

    ul,
    ol {
      margin-bottom: 1rem;

      &::after {
        display: block;
        content: '';
        clear: both;
      }
    }

    table {
      width: 100%;
      margin-bottom: 1rem;

      thead th {
        &:empty {
          display: none;
        }
      }

      tbody tr:nth-of-type(odd) {
        background-color: $table-accent-bg;
      }

      th,
      td {
        padding: 0.5rem 1.5rem;
      }
    }

    .btn {
      & + .btn {
        margin-left: 0.5rem;
      }
    }

    .clearfix {
      &::after {
        display: block;
        content: '';
        clear: both;
      }
    }

    .iframe-container {
      & > iframe {
        height: 100%;
      }
    }

    .link-readmore {
      display: inline-flex;
      align-items: center;
      font-size: $font-size-2;
      font-weight: $font-weight-medium;
      line-height: $input-btn-line-height;
      color: $link-color;

      &::after {
        display: block;
        content: '';
        align-self: flex-start;
        width: 1rem;
        height: $input-btn-line-height * 1em;
        margin-left: 0.25rem;
        background-image: escape-svg($readmore-icon);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      &:hover {
        text-decoration: none;
        color: $link-hover-color;

        &::after {
          background-image: escape-svg($readmore-hover-icon);
        }
      }
    }

    .md-aspect {
      position: relative;
      width: 100%;
      margin-bottom: 1rem;
      overflow: hidden;

      &::before {
        display: block;
        content: '';
        padding-bottom: calc(100% / var(--md-aspect));
      }

      & > * {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .md-columns {
      & > * {
        padding-left: $grid-gutter-width * 0.5;
        padding-right: $grid-gutter-width * 0.5;
      }
    }

    .md-gallery {
      position: relative;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      overflow: hidden;

      & > p {
        display: flex;
        margin-bottom: 2rem;

        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 1rem;
          top: 1rem;
          width: $spinner-width;
          height: $spinner-width;
          border: $spinner-border-width solid $gray-200;
          border-right-color: transparent;
          border-radius: 50%;
          animation: 0.75s linear infinite spinner-border;
          z-index: 1;
        }

        & > * {
          opacity: 0.25;

          &:not(:first-child) {
            display: none;
          }
        }
      }
    }

    .slider-md-gallery {
      .swiper-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        position: static;
        height: 1rem;
        margin-top: 1rem;
      }

      [class*='swiper-button'] {
        top: auto;
        bottom: 1rem;
        width: 1.5rem;
        height: 1.5rem;
        appearance: none;
        border: none;
        background-color: transparent;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        transform: translateY(50%);

        &::after {
          display: none;
        }
      }

      .swiper-button-prev {
        left: 0;
        background-image: escape-svg($arrow-left-icon);
      }

      .swiper-button-next {
        left: 2rem;
        right: auto;
        background-image: escape-svg($arrow-right-icon);
      }
    }

    .md-note {
      margin: 1rem 0;
      padding: 2.5rem;
      font-size: $font-size-4;
      font-weight: $font-weight-medium;
      color: $gray-800;
      background-color: $white;
      box-shadow: $box-shadow-lg;

      & > p {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .md-quote {
      position: relative;
      margin: 1.75rem 0 2.5rem;
      padding: 1.5rem 0;
      font-size: $h4-font-size;
      font-weight: $headings-font-weight;
      line-height: $headings-line-height;
      text-align: center;
      border-bottom: $border-width solid $gray-300;
      color: $primary;

      &::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: $border-width;
        background-image: linear-gradient(
          to right,
          $gray-300 calc(50% - 1rem),
          transparent calc(50% - 1rem),
          transparent calc(50% + 1rem),
          $gray-300 calc(50% + 1rem)
        );
      }

      &::after {
        display: block;
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        width: 1rem;
        height: 1rem;
        background-image: escape-svg($quote-icon);
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        transform: translateX(-50%) translateY(-50%);
      }

      & > p {
        margin-bottom: 0;
      }
    }

    .md-quote-author {
      position: absolute;
      bottom: 0;
      left: 50%;
      padding: 0 0.5rem;
      font-size: $font-size-2;
      font-weight: $font-weight-normal;
      line-height: $line-height-base;
      color: $gray-500;
      background-color: $white;
      transform: translateX(-50%) translateY(50%);

      & > p {
        margin-bottom: 0;
      }
    }

    .md-toc {
      margin: 2rem 0;
      padding: 2.5rem;
      font-size: $font-size-2;
      color: $gray-800;
      background-color: $white;
      box-shadow: $box-shadow-lg;

      &::before {
        display: block;
        content: 'Читайте в статье:';
        margin-bottom: 0.5rem;
        font-size: $font-size-4;
        font-weight: $font-weight-medium;
      }

      ul,
      ol {
        margin-bottom: 0;
        padding-left: 1.25em;

        & > li {
          &:not(:last-child) {
            margin-bottom: 0.25rem;
          }

          & > a {
            color: inherit;
          }
        }
      }
    }
  }

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
}

@include media-breakpoint-down(xs) {
  .markdown-content {
    ::v-deep {
      .btn {
        width: 100%;
        margin-bottom: 0.5rem;

        & + .btn {
          margin-left: 0;
        }
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .markdown-content {
    ::v-deep {
      .slider-md-gallery {
        margin-bottom: 0.5rem;

        [class*='swiper-button'] {
          display: none;
        }
      }

      .md-quote {
        font-size: $h5-font-size;
      }

      .md-quote-author {
        width: max-content;
      }

      .md-toc {
        margin: 1rem 0;
      }
    }
  }
}
</style>
