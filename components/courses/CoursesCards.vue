<template>
  <b-row>
    <b-col v-for="(course, index) in courses" :key="index" md="4">
      <div class="card card-course">
        <div class="card-body">
          <div class="card-img embed-responsive embed-responsive-4by3">
            <picture>
              <source
                v-for="size in imageSizes"
                :key="`source-${size.breakpoint}`"
                :srcset="$getStaticImage(course.image, size.size)"
                :media="
                  size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null
                "
              />
              <img
                :src="$getStaticImage(course.image, 451)"
                :alt="course.name"
                loading="lazy"
                class="embed-responsive-item"
              />
            </picture>
          </div>

          <h6 class="course-title">
            {{ course.title }}
          </h6>

          <div>
            <LinkMore
              :href="course.link"
              target="_blank"
              class="d-none d-md-block text-left"
            >
              {{ $t('global.signUp') }}
            </LinkMore>

            <LinkMore
              :href="course.link"
              target="_blank"
              class="d-block d-md-none card-btn-sm btn-primary"
            >
              {{ $t('global.signUp') }}
            </LinkMore>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 420, size: 398 },
        { breakpoint: 575, size: 539 },
        { breakpoint: 767, size: 516 },
        { breakpoint: 991, size: 228 },
        { breakpoint: 1239, size: 296 },
        { breakpoint: 1359, size: 372 },
        { breakpoint: 1479, size: 416 },
        { breakpoint: null, size: 451 },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.card-course {
  height: 100%;

  &,
  .card-body {
    background-color: transparent;
  }

  .card-body {
    padding: 1rem 0;
  }

  .course-title {
    margin: 1rem 0;
  }

  .card-btn-sm {
    color: $white;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
  }
}
</style>
