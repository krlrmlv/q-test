<template>
  <article class="blog-article">
    <h2>
      {{ article.title }}
    </h2>

    <BlogArticleInfo :article="article" />

    <LazyMarkdownContent :content="article.text" />
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
