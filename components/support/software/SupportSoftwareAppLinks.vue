<template>
  <div class="app-links">
    <AppLink
      :title="$t('apps.appStore.title')"
      :href="linkApple"
      icon="social/app-apple"
      icon-width="83"
      icon-height="20"
    />
    <AppLink
      :title="$t('apps.googlePlay.title')"
      :href="linkGoogle"
      icon="social/app-google"
      icon-width="83"
      icon-height="20"
    />
    <AppLink
      v-if="linkHuawei"
      :title="$t('apps.huaweiAppGallery.title')"
      :href="linkHuawei"
      icon="social/app-huawei"
      icon-width="83"
      icon-height="20"
    />
  </div>
</template>

<script>
export default {
  props: {
    linkApple: {
      type: String,
      default: null,
    },
    linkGoogle: {
      type: String,
      default: null,
    },
    linkHuawei: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.app-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

::v-deep {
  .btn-app {
    padding: 0.4375rem;
    border-width: 0;
  }
}
</style>
