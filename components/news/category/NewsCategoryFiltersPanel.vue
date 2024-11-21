<template>
  <div class="filters-sidebar-panel">
    <div class="panel-header">
      <b-button
        :title="$t('global.back')"
        variant="link"
        class="btn-icon text-secondary border-0 p-0"
        @click="$emit('back')"
      >
        <svg-icon
          name="chevron-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </b-button>

      <p class="h7 panel-title">
        {{ title }}
      </p>

      <b-button
        :title="$t('global.close')"
        variant="link"
        class="btn-icon text-secondary border-0 p-0"
        @click="$emit('close')"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </div>

    <div class="panel-body">
      <hr class="border-gray-200 my-0" />

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.filters-sidebar-panel {
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 0.75rem $grid-gutter-width * 0.5;
}

.panel-title {
  flex: 1 1 auto;
  min-width: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.panel-body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 0 $grid-gutter-width * 0.5;
  overflow-y: auto;
}
</style>
