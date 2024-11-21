<template>
  <div class="footer-app-links">
    <AppLink
      :title="$t('apps.appStore.title')"
      href="https://apps.apple.com/us/app/ekf/id1482637366"
      icon="social/app-apple"
      class="mr-16"
    />

    <AppLink
      :title="$t('apps.googlePlay.title')"
      href="https://play.google.com/store/apps/details?id=com.ekfgroup.ekfapp"
      icon="social/app-google"
    />
  </div>
</template>

<style lang="scss" scoped>
.footer-app-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @include media-breakpoint-up(md) {
    justify-content: flex-end;
  }
}
</style>
