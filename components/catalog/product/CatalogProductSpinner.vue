<template>
  <div class="catalog-product-spinner" @mousedown="dragStart">
    <img
      :src="activeImage"
      :alt="title"
      class="spinner-img"
      ondragstart="return false;"
    />
    <transition name="fade">
      <b-progress
        v-if="!isReady"
        :value="loaded"
        :max="count - 1"
        variant="primary"
      ></b-progress>
    </transition>
  </div>
</template>

<script>
import { BProgress } from 'bootstrap-vue'

export default {
  components: {
    BProgress,
  },
  props: {
    count: {
      type: Number,
      default: 40,
    },
    folder: {
      type: String,
      default: null,
    },
    inverse: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      activeIndex: 0,
      images: [],
      loaded: null,
      startX: 0,
    }
  },
  computed: {
    isReady() {
      return this.loaded >= this.count
    },
    activeImage() {
      if (this.images && this.images.length)
        return this.images[this.activeIndex].src
      else return `${this.folder}001.jpg`
    },
  },
  created() {
    this.onDrag = this.throttle(this.onDrag, 10)
  },
  mounted() {
    this.images = []
    this.loaded = 0

    for (let i = 0; i < this.count; i++) {
      const imageFileName = (i + 1).toString().padStart(3, '0')
      const img = new Image()
      img.onload = () => {
        this.loaded++
      }

      img.src = this.$getStaticImage(
        `/uploads/360new/${this.folder}/${imageFileName}.jpg`,
        null,
        false
      )

      this.images.push(img)
    }
  },
  methods: {
    dragStart(event) {
      this.startX = event.clientX
      document.body.style.cursor = 'grab'
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', () => {
        document.body.style.cursor = null
        document.removeEventListener('mousemove', this.onDrag)
      })
    },
    onDrag(event) {
      const dragSens = 20
      const offset = event.clientX - this.startX
      const skip = 1 + Math.round(Math.abs(offset) / dragSens)
      // flip rotation if inverse === true
      const multi = this.inverse ? -1 : 1
      if (offset * multi < 0) this.onDragLeft(skip)
      else if (offset * multi > 0) this.onDragRight(skip)
      this.startX = event.clientX
    },
    onDragLeft(skip) {
      if (this.activeIndex - skip >= 0)
        this.activeIndex = this.activeIndex - skip
      else this.activeIndex = this.count - 1
    },
    onDragRight(skip) {
      if (this.activeIndex + skip <= this.count - 1)
        this.activeIndex = this.activeIndex + skip
      else this.activeIndex = 0
    },
    throttle(func, limit) {
      let lastFunc
      let lastRan
      return function () {
        const context = this
        const args = arguments
        if (!lastRan) {
          func.apply(context, args)
          lastRan = Date.now()
        } else {
          clearTimeout(lastFunc)
          lastFunc = setTimeout(function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args)
              lastRan = Date.now()
            }
          }, limit - (Date.now() - lastRan))
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-product-spinner {
  .progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.25rem;
    border-radius: $rounded-pill;
  }

  .spinner-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -moz-user-select: none;
  }
}
</style>
