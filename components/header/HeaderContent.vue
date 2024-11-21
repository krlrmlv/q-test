<template>
  <b-container fluid="lg" class="header-content">
    <div class="header-content-top">
      <HeaderProfessionals />
      <HeaderExternalLinks />
      <!-- <HeaderOldSite /> -->
    </div>

    <div class="header-content-middle">
      <HeaderMenuToggle />
      <HeaderBrand />
      <HeaderCatalogToggle />
      <HeaderSearch />
      <HeaderSearchToggle />
      <HeaderButtons />
    </div>

    <div class="header-content-bottom">
      <HeaderNavigation />
      <HeaderContacts />
      <HeaderCart
        v-if="cartRows"
        :count="cartRows"
        variant="white"
        class="mr-4"
      />
      <HeaderSearchToggle />
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['cartRows']),
  },
}
</script>

<style lang="scss" scoped>
.header-content-top,
.header-content-middle,
.header-content-bottom {
  display: flex;
}

.header-content-bottom {
  .header-cart,
  .header-search-toggle {
    display: none;
  }
}

::v-deep {
  .header-old-site,
  .header-pros {
    flex: 0 0 auto;
  }

  .header-ext-links {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-end;
    padding-left: 2rem;
  }

  .btn-toggle {
    border-radius: $rounded-pill;

    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .header-nav-top {
    flex-wrap: nowrap;
    margin-left: -0.25rem;
    margin-right: -0.25rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: $font-size-1;
    line-height: math.div($font-size-base, $font-size-1) * 1.375;

    .nav-link {
      padding: 0.25rem;
      white-space: nowrap;
      color: inherit;

      &:hover {
        color: $brand-light;
      }

      &:focus-visible {
        color: $brand-light;
        outline: 1px solid $brand-light;
      }

      &:focus,
      &:active {
        color: $brand;
      }
    }
  }
}

@include media-breakpoint-down(md) {
  ::v-deep {
    .header-pros,
    .header-ext-links,
    .header-catalog-toggle,
    .header-buttons {
      display: none;
    }

    .header-content-bottom {
      .header-navigation,
      .header-contacts,
      .header-search-toggle {
        display: none;
      }

      .header-cart {
        display: unset;
        position: absolute;
        right: 2.25rem;
        top: 2rem;
        transform: translateY(-50%);
      }
    }

    .header-content-middle {
      align-items: center;
      flex-wrap: wrap;
    }

    .header-old-site {
      flex: 1 1 auto;
      margin-bottom: -0.625rem;
      padding-top: 0.125rem;

      .header-nav-top,
      .nav-link {
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    .header-search {
      flex: 0 0 calc(100% + #{$grid-gutter-width});
      order: 99;
      margin-left: -0.5 * $grid-gutter-width;
      margin-right: -0.5 * $grid-gutter-width;
    }

    .btn-toggle {
      margin-left: -$input-btn-padding-y-sm;
      margin-right: -$input-btn-padding-y-sm;
      padding: $input-btn-padding-y-sm;
      border: none;

      &.b-skeleton {
        width: 1.875rem;
        height: 1.875rem;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .header-content-middle {
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
  }

  ::v-deep {
    .header-menu-toggle,
    .header-search-toggle {
      display: none;
    }

    .header-brand,
    .header-catalog-toggle,
    .header-buttons {
      flex: 0 0 auto;
    }

    .header-search,
    .header-navigation {
      flex: 1 1 auto;
    }
  }

  body.header-collapsed {
    .header-content-top,
    .header-buttons,
    .header-contacts {
      display: none;
    }

    .header-content,
    .header-content-middle {
      display: flex;
      align-items: center;
    }

    .header-content-middle {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .header-content-bottom {
      flex: 1 1 auto;
      align-items: center;

      .header-cart,
      .header-search-toggle {
        display: unset;
      }
    }

    .header-brand {
      padding-right: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .header-catalog-toggle {
      ::v-deep {
        .btn-catalog {
          padding: 0.25rem 0.375rem;
          border: none;
        }
      }
    }

    .header-search {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      background-image: linear-gradient(
        to top,
        rgba($body-color, 0),
        rgba($body-color, 0.08) 0.75rem,
        $white 0.75rem
      );

      ::v-deep {
        .header-search-container {
          padding-bottom: 1.75rem;
        }

        .header-search-dropdown {
          margin-top: 0.5rem;
        }
      }
    }

    .header-navigation {
      display: flex;
      flex: 1 1 auto;
      align-items: center;

      ::v-deep {
        .header-nav-main {
          margin-left: 0;
          margin-right: 0;
        }

        .nav-link {
          padding: 0.25rem 0.375rem;
        }
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  ::v-deep {
    .header-nav-top {
      margin-left: -0.5rem;
      margin-right: -0.5rem;
      font-size: $font-size-2;
      line-height: math.div($font-size-base, $font-size-2) * 1.375;

      .nav-link {
        padding: 0.25rem 0.5rem;
      }
    }
  }

  body.header-collapsed {
    .header-catalog-toggle {
      ::v-deep {
        .btn-catalog {
          padding: 0.5rem 1rem;
        }
      }
    }

    .header-navigation {
      ::v-deep {
        .nav-link {
          padding: 0.5rem 1rem;
        }
      }
    }
  }
}
</style>
