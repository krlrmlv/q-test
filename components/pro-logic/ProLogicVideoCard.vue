<template>
  <b-link class="card card-video">
    <div class="card-img embed-responsive embed-responsive-16by9">
      <img
        :alt="video.title"
        :src="`https://img.youtube.com/vi/${video.id}/0.jpg`"
        class="embed-responsive-item"
      />
    </div>

    <div class="card-body" v-html="video.title" />
  </b-link>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.card-video {
  height: 100%;
  border: none;
  color: inherit;
  transition: $transition-base;
  transition-property: color, box-shadow;

  &:hover {
    text-decoration: none;
    color: inherit;
    box-shadow: $box-shadow;
  }
}

.card-img {
  border: $border-width solid $border-color;
}

.card-body {
  margin: 0;
  padding: 1rem 1.5rem 1.5rem;
  font-size: $font-size-5;
  font-weight: $font-weight-bold;
  flex-grow: 1;
}
</style>
