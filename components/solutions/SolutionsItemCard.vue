<template>
  <div class="card card-solutions-item">
    <div class="card-img embed-responsive embed-responsive-1by1">
      <template v-if="item.images && item.images.length">
        <picture>
          <source
            v-for="size in imageSizes"
            :key="`source-${size.breakpoint}`"
            :srcset="$getStaticImage(item.images[0].file, size.size)"
            :media="
              size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null
            "
          />
          <img
            :src="$getStaticImage(item.images[0].file, 219)"
            :alt="item.name"
            class="embed-responsive-item"
          />
        </picture>
      </template>
    </div>

    <div class="card-body">
      <p class="h7 mb-0">
        <b-link
          :to="localePath(`/solutions/solution/${item.slug}`)"
          class="text-reset"
        >
          {{ item.name }}
        </b-link>
      </p>

      <p class="fs-1 text-muted mb-0">
        {{ item.vendor_code }}
      </p>
    </div>

    <div class="card-footer">
      <b-button
        :to="localePath(`/solutions/solution/${item.slug}`)"
        size="sm"
        variant="outline-primary"
        block
      >
        {{ $t('global.more') }}
      </b-button>

      <DropdownFullscreen
        v-if="filesToDownload.length"
        :text="$t('solutions.downloadLibraries')"
        size="sm"
        variant="primary"
        block
      >
        <li
          v-for="(file, index) in filesToDownload"
          :key="`file-${index}`"
          role="presentation"
        >
          <SolutionsFile
            :file="file"
            :vendor-code="item.vendor_code"
            icon-variant="secondary"
            link-class="dropdown-item dropdown-item-icon"
            hide-file-info
          />
        </li>
      </DropdownFullscreen>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    longForm: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 336 },
        { breakpoint: 575, size: 551 },
        { breakpoint: 767, size: 246 },
        { breakpoint: 991, size: 348 },
        { breakpoint: 1239, size: 168 },
        { breakpoint: 1359, size: 225 },
        { breakpoint: 1479, size: 258 },
        { breakpoint: null, size: 284 },
      ],
    }
  },

  computed: {
    filesToDownload() {
      return (
        this.item?.schemes?.filter(
          ({ file, name }) => Boolean(file) && Boolean(name)
        ) ?? []
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.card-solutions-item {
  height: 100%;

  .card-body {
    padding: 1rem 0 0;
  }

  .card-footer {
    display: block;
    padding: 1rem 0 0;
    background-color: transparent;

    & > * + * {
      margin-top: 0.5rem;
    }
  }
}

::v-deep {
  .solutions-file {
    .icon-wrapper {
      color: $secondary;
    }

    .icon-small {
      display: block !important;
    }

    .icon-large {
      display: none !important;
    }
  }
}

@include media-breakpoint-up(lg) {
  .card-solutions-item {
    padding: 1.5rem;
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }
}
</style>
