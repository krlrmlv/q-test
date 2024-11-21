<template>
  <b-row class="px-8">
    <b-col
      v-for="{ name, description, image, colsMd } in industries"
      :key="`col-${image}`"
      cols="12"
      :md="colsMd"
      class="p-4"
    >
      <div class="solutions-banner" @click="$emit('click')">
        <picture>
          <source
            :src="`/images/view/industry/scopes/${image}-sm.jpg`"
            media="(max-width: 575px)"
            type="image/jpg"
          />
          <source
            :src="`/images/view/industry/scopes/${image}-md.jpg`"
            media="(max-width: 991px)"
            type="image/jpg"
          />
          <img
            :src="`/images/view/industry/scopes/${image}.jpg`"
            alt=""
            loading="lazy"
            width="695"
            height="237"
            class="solutions-banner-bg"
          />
        </picture>

        <div class="solutions-banner-content card-info">
          <h5 class="card-title mb-8">{{ name }}</h5>

          <p class="card-description">{{ description }}</p>

          <LinkMore class="card-btn">
            {{ $t('global.more') }}
          </LinkMore>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    industries: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-banner {
  cursor: pointer;

  &::before {
    transition: $transition-base;
    transition-property: background-color;
    background-color: transparent;
  }

  .card-info {
    height: 237px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    padding: 2.5rem;
    background: transparent;

    .card-title {
      transition: all 0.3s ease-out;
      transition-property: transform;
      margin-bottom: 0.5rem;
      transform: translateY(120px);
    }

    .card-description {
      font-size: $font-size-2;
      margin-bottom: 1rem;
      flex-grow: 1;
      opacity: 0;
      transition: $transition-base;
      transition-property: opacity;
    }

    .card-btn {
      transition: $transition-base;
      transition-property: opacity;
      opacity: 0;
      color: $white;
    }
  }

  @media (hover: hover) {
    &:hover {
      &::before {
        background-color: rgba($black, 0.4);
      }

      .card-info {
        .card-title {
          transform: translateY(0);
        }

        .card-description,
        .card-btn {
          opacity: 1;
          transition-delay: 0.2s;
        }
      }
    }

    &:not(:hover) {
      .card-info {
        .card-title {
          transition-delay: 0.15s;
        }

        .card-description,
        .card-btn {
          transition-delay: 0;
        }
      }
    }
  }

  @media (hover: none) {
    .card-info {
      .card-title {
        transform: translateY(0);
      }

      .card-description,
      .card-btn {
        opacity: 1;
      }
    }

    &:active {
      &::before {
        background-color: rgba($black, 0.4);
      }
    }
  }

  @include media-breakpoint-down(md) {
    .card-info {
      justify-content: flex-end;
      padding: 1.5rem;
      transform: none;

      .card-title {
        margin-bottom: 1rem;
        font-size: $font-size-4;
      }

      .card-description {
        display: none;
      }
      .card-btn {
        opacity: 1;
      }
    }
  }

  @include media-breakpoint-down(xs) {
    .card-info {
      height: 10rem;

      .card-title {
        font-size: $font-size-5;
        margin-bottom: 0;
      }
    }
  }
}
</style>
