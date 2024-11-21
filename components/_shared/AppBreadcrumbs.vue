<template>
  <b-breadcrumb itemscope itemtype="https://schema.org/BreadcrumbList">
    <b-breadcrumb-item
      v-if="!hideHome"
      :to="localePath({ name: 'index' })"
      itemscope
      itemtype="https://schema.org/ListItem"
      itemprop="itemListElement"
    >
      <span :class="color" itemprop="name">{{ $t('global.home') }}</span>
      <meta itemprop="position" content="1" />
    </b-breadcrumb-item>

    <b-breadcrumb-item
      v-for="(item, index) in items"
      :key="`breadcrumb-${index}`"
      :active="item.active"
      :to="localePath(item.to)"
      :class="color"
      itemscope
      itemtype="https://schema.org/ListItem"
      itemprop="itemListElement"
    >
      <span :class="color" itemprop="name">{{
        $te(item.text) ? $t(item.text) : item.text
      }}</span>
      <meta itemprop="position" :content="index + (hideHome ? 1 : 2)" />
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue'

export default {
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
  },
  props: {
    hideHome: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb-item + .text-gray-100.breadcrumb-item::before {
  color: #f8f9fa;
}
</style>
