<template>
  <b-link
    :href="fileLink"
    target="_blank"
    class="card card-pos"
    @click="$emit('click')"
  >
    <div
      :class="`embed-responsive-${imageAspect}`"
      class="card-img embed-responsive"
    >
      <img
        :alt="item.title"
        :src="$getStaticImage(item.preview_image, 268)"
        class="embed-responsive-item"
      />

      <div class="card-img-overlay">
        <span class="mr-8" aria-hidden="true">
          <svg-icon :name="`file/${fileExtension}-24`" width="24" height="24" />
        </span>

        <span>
          {{ $t('support.posMaterials.downloadFile') }}<br />
          <span v-html="fileInfoHtml" />
        </span>
      </div>
    </div>

    <p class="h6 card-body" v-html="item.title" />
  </b-link>
</template>

<script>
export default {
  props: {
    imageAspect: {
      type: String,
      default: '1by1',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    fileInfoHtml() {
      const lines = []

      if (this.fileExtension) {
        lines.push(`<span class="text-uppercase">${this.fileExtension}<span>`)
      }
      if (this.fileSize) {
        lines.push(this.fileSize)
      }

      return lines.length ? `(${lines.join(', ')})` : ''
    },

    fileExtension() {
      if (!this.item?.file) return
      return this.item.file.split('.').pop()
    },

    fileLink() {
      if (!this.item?.file) return
      return this.$getStaticFile(this.item.file)
    },

    fileSize() {
      if (!this.item?.file_size) return ''
      return this.$humanFileSize(this.item.file_size)
    },
  },

  methods: {
    getFileExtension(url) {
      if (!url) return ''
      return url.split('.').pop()
    },
  },
}
</script>

<style lang="scss" scoped>
.card-pos {
  height: 100%;
  padding: 1.25rem 1rem;
  text-decoration: none;
  color: inherit;
  transition: $transition-base;
  transition-property: box-shadow;

  .card-img {
    max-width: 268px;
    margin: 0 auto;
  }

  .card-img-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: $font-weight-medium;
    line-height: 1.2;
    color: $secondary;
    background-color: $gray-100;
    opacity: 0;
    z-index: -1;
    transition: $transition-base;
    transition-property: opacity;
  }

  .card-body {
    margin: 0;
    padding: 1rem 0 0;
    text-align: center;
  }

  &:hover {
    box-shadow: $box-shadow;

    .card-img-overlay {
      opacity: 1;
      z-index: 1;
    }
  }
}
</style>
