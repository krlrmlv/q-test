<template>
  <div>
    <ul class="list-unstyled font-weight-medium text-secondary mb-0">
      <li
        v-for="(file, index) in visibleFiles"
        :key="`visible-file-${index}`"
        :class="{ 'pt-8': index > 0 }"
      >
        <b-button
          :href="getFileUrl(file)"
          target="_blank"
          variant="link"
          class="btn-file"
          @click="mindboxDocumentDownload('Документация')"
        >
          <svg-icon
            :name="`file/${getExtension(file)}-24`"
            :aria-label="getExtension(file)"
            width="24"
            height="24"
            class="mr-8"
          />
          {{ getCaption(file) }}
        </b-button>
      </li>
    </ul>

    <b-collapse v-if="collapseVisible" v-model="collapseOpen">
      <ul class="list-unstyled font-weight-medium text-secondary mb-0">
        <li
          v-for="(file, index) in hiddenFiles"
          :key="`hidden-file-${index}`"
          class="pt-8"
        >
          <b-button
            :href="getFileUrl(file)"
            target="_blank"
            variant="link"
            class="btn-file"
            @click="mindboxDocumentDownload('Документация')"
          >
            <svg-icon
              :name="`file/${getExtension(file)}-24`"
              :aria-label="getExtension(file)"
              width="24"
              height="24"
              class="mr-8"
            />
            {{ getCaption(file) }}
          </b-button>
        </li>
      </ul>
    </b-collapse>

    <b-button
      v-if="collapseVisible"
      :class="collapseOpen ? 'not-collapsed' : 'collapsed'"
      size="sm"
      variant="link"
      class="collapse-toggle"
      @click="collapseOpen = !collapseOpen"
    >
      <span v-text="$t(`catalog.${collapseOpen ? 'collapse' : 'showAll'}`)" />
      <svg-icon
        name="caret"
        width="8"
        height="4"
        class="icon-caret ml-8"
        aria-hidden="true"
      />
    </b-button>
  </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'
import { mindboxDocumentDownload } from '@/utils/mindbox'

export default {
  components: { BCollapse },

  props: {
    files: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    collapseVisible() {
      return Boolean(this.hiddenFiles?.length)
    },

    hiddenFiles() {
      return this.files?.slice(this.limit) || []
    },

    visibleFiles() {
      return this.files?.slice(0, this.limit) || []
    },
  },

  methods: {
    getCaption(file) {
      return file?.description?.trim() || file?.name?.trim()
    },

    getExtension(file) {
      const filename = file?.file ?? ''
      const arr = filename.split('.')
      return arr[arr.length - 1].toString().toLowerCase()
    },

    getFileUrl(file) {
      return this.$getStaticFile(`/uploads/products/${file?.file}`, null, false)
    },
    mindboxDocumentDownload,
  },
}
</script>

<style lang="scss" scoped>
.btn-file {
  padding: 0;
  text-align: left;
  border: none;
  color: $secondary;
}

.collapse-toggle {
  margin-top: 0.25rem;
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}
</style>
