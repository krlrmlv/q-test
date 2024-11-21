<template>
  <b-link
    :href="itemFile"
    target="_blank"
    class="media document-link"
    @click="mindboxDocumentDownload('Страница товара')"
  >
    <div class="media-aside" aria-hidden="true">
      <svg-icon
        :name="`file/${fileExtension}-24`"
        width="24"
        height="24"
        class="d-md-none"
      />
      <svg-icon
        :name="`file/${fileExtension}-40`"
        width="40"
        height="40"
        class="d-none d-md-block"
      />
    </div>

    <div class="media-body">
      <p class="mb-0">
        {{ item.name }}
        <span v-if="fileInfo.length" class="document-file-info">
          ({{ fileInfo }})
        </span>
      </p>
    </div>
  </b-link>
</template>

<script>
import { mindboxDocumentDownload } from '@/utils/mindbox'

const BOOKLET_FILE_TYPE_ID = 'aaa3753c-688f-11e8-a1fa-00155d00711b'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    fileExtension() {
      const arr = this.item?.file?.split('.') || ['']
      return arr[arr.length - 1].toString().toLowerCase()
    },

    fileInfo() {
      const info = []
      if (this.fileExtension?.length) {
        info.push(this.fileExtension.toUpperCase())
      }
      if (this.fileSize) {
        info.push(this.fileSize)
      }
      return info.join(', ')
    },

    fileSize() {
      return this.item?.fileSize
        ? this.$humanFileSize(this.item.fileSize)
        : null
    },

    itemFile() {
      const isBooklet = this.item.file_type_id === BOOKLET_FILE_TYPE_ID
      return isBooklet
        ? this.$getCdnImage(`/products/${this.getFileName(this.item.file)}`)
        : this.item?.file
    },
  },
  methods: {
    mindboxDocumentDownload,

    getFileName(url) {
      const match = url.match(/\/([^/]+)$/)
      return match ? match[1] : null
    },
  },
}
</script>

<style lang="scss" scoped>
.document-link {
  align-items: center;
  text-decoration: none;
  color: $body-color;
  transition: $transition-base;
  transition-property: color;

  &:hover {
    color: $primary;
  }
}

.media-aside {
  align-self: flex-start;
  margin-right: 0.5rem;
  color: $primary;
}

.document-file-info {
  white-space: nowrap;
  color: $gray-500;
}

@include media-breakpoint-up(lg) {
  .document-link {
    padding: 0.75rem 0;
    font-size: $font-size-2;
  }

  .document-file-info {
    display: block;
  }
}
</style>
