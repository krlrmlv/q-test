<template>
  <b-modal
    v-model="localVisible"
    :size="size"
    modal-class="modal-media"
    centered
    hide-footer
    hide-header
    @hidden="$emit('hidden')"
  >
    <template #default="{ close }">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe
          :src="`https://www.youtube.com/embed/${video.id}`"
          :title="video.title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameborder="0"
          class="embed-responsive-item"
          allowfullscreen
        />
      </div>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        size="sm"
        variant="white"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="close"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { BModal },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    size: {
      type: String,
      default: 'xl',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    video: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },
}
</script>
