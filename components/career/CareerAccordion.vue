<template>
  <div class="career-accordion">
    <CareerCollapse
      v-for="(category, index) in professionalRoles"
      :key="`professional-role-${index}`"
      :category="category"
      :visible="index === activeIndex"
      class="mb-8"
      @toggle="handleCollapseToggle(index)"
    />
  </div>
</template>

<script>
export default {
  props: {
    professionalRoles: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      activeIndex: -1,
    }
  },

  methods: {
    handleCollapseToggle(index) {
      this.activeIndex !== index
        ? (this.activeIndex = index)
        : (this.activeIndex = -1)
    },
  },
}
</script>
