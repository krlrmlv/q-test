<template>
  <ErrorReportModal v-model="modalVisible" :selection="selection" />
</template>

<script>
import { getViewportWidth } from '@/utils/window'

export default {
  data() {
    return {
      breakpoint: 992,
      modalVisible: false,
      selection: null,
    }
  },

  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize, { passive: true })
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleKeydown(event) {
      if (event?.key === 'Enter' && event?.ctrlKey) {
        this.showModal()
      }
    },

    handleResize() {
      const vw = getViewportWidth()
      if (vw >= this.breakpoint) {
        document.addEventListener('keydown', this.handleKeydown)
      } else {
        document.removeEventListener('keydown', this.handleKeydown)
      }
    },

    showModal() {
      this.selection = document.getSelection()
      this.modalVisible = true
    },
  },
}
</script>
