/* eslint-disable new-cap */

import { getStaticImage } from '@/utils/static-url'
import { isExternal } from '@/utils/link'

export async function mdLight() {
  const markdownIt = await import('markdown-it' /* webpackChunkName: 'md-it' */)
  const mdInstance = new markdownIt.default({ breaks: true, html: true })
  return mdInstance
}

export async function mdFull(config = {}) {
  /* Lazy import everything */
  const [
    markdownIt,
    abbr,
    attr,
    anchor,
    container,
    iframe,
    sup,
    toc,
    { slugify },
  ] = await Promise.all([
    import('markdown-it' /* webpackChunkName: 'md-it' */),
    import('markdown-it-abbr' /* webpackChunkName: 'md-abbr' */),
    import('@sup39/markdown-it-attr' /* webpackChunkName: 'md-attr' */),
    import('markdown-it-anchor' /* webpackChunkName: 'md-anchor' */),
    import('markdown-it-container' /* webpackChunkName: 'md-container' */),
    import('markdown-it-iframe' /* webpackChunkName: 'md-iframe' */),
    import('markdown-it-sup' /* webpackChunkName: 'md-sup' */),
    import('markdown-it-toc-done-right' /* webpackChunkName: 'md-toc' */),
    import('transliteration' /* webpackChunkName: 'translit-slugify' */),
  ])

  const mdInstance = new markdownIt.default({ breaks: true, html: true })

  /* Enable plugins */
  mdInstance
    .use(abbr.default)
    .use(attr.default)
    .use(anchor.default, { slugify })
    .use(container.default, 'md-aspect', { render: renderAspect })
    .use(container.default, 'md-gallery')
    .use(container.default, 'md-note')
    .use(container.default, 'md-quote')
    .use(container.default, 'md-quote-author', { marker: ';' })
    .use(container.default, 'md-columns', { render: renderColumns })
    .use(iframe.default, { allowfullscreen: false, width: '100%' })
    .use(sup.default)
    .use(toc.default, {
      containerClass: 'md-toc',
      level: 1,
      listType: 'ul',
      slugify,
    })

  return mdInstance
}

export function renderImages(tokens, idx, options, env, slf, config) {
  const token = tokens[idx]
  const url = token.attrGet('src')

  // add static url prefix to root-based urls
  token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(
    token.children,
    options,
    env
  )
  token.attrSet('src', getStaticImage({ url, config }))
  return slf.renderToken(tokens, idx, options)
}

export function renderLinks(tokens, idx, options, env, slf, config) {
  const token = tokens[idx]
  const url = token.attrGet('href')
  const classList = token.attrGet('class')

  /* replace external link with data-href spans
    to further replace them with SeoLink component
    in MarkdownContent */
  if (isExternal(url)) {
    let closeToken = {}
    for (let i = idx + 1; i < tokens.length; i++) {
      if (tokens[i]?.type === 'link_close') {
        closeToken = tokens[i]
        break
      }
    }
    token.attrSet('data-href', url)
    token.attrSet('href', '')
    token.attrSet('class', [classList, 'mdseolink'].join(' '))
    token.tag = 'span'
    closeToken.tag = 'span'
  }

  /* customize .modal-toggle link rendering to add url prefix */
  if (classList && classList.length) {
    const classArray = classList.split(' ')
    if (classArray.includes('modal-toggle')) {
      token.attrSet('href', getStaticImage({ url, config }))
    }
  }
  return slf.renderToken(tokens, idx, options)
}

function renderAspect(tokens, idx) {
  if (tokens[idx].nesting === 1) {
    const aspectMatch = tokens[idx].info.trim().match(/^md-aspect\s+(.*)$/)
    const aspect = aspectMatch && aspectMatch.length ? aspectMatch[1] : 1.77778 // default aspect ratio is 16:9
    return `<div class="md-aspect" style="--md-aspect: ${aspect}">`
  } else {
    return '</div>'
  }
}

function renderColumns(tokens, idx) {
  if (tokens[idx].nesting === 1) {
    const columnsMatch = tokens[idx].info.trim().match(/^md-columns\s+(.*)$/)
    const columns = columnsMatch && columnsMatch.length ? columnsMatch[1] : 3 // default column count is 3
    return `<div class="md-columns row row-cols-1 row-cols-lg-${columns}">`
  } else {
    return '</div>'
  }
}
