<template>
  <div class="mb-32 mb-md-48">
    <h4 class="mb-md-24">
      {{ $t('catalog.tabs.description.title') }}
    </h4>

    <p class="mb-24">
      <slot></slot>
    </p>

    <CatalogDescriptionLink
      v-if="link"
      :icon-size="24"
      :link="link"
      :link-classes="'p-0 btn-link justify-content-start'"
    />
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: '',
    },
  },
}
</script>
