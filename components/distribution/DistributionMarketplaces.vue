<template>
  <section>
    <h2 class="mb-48 mb-lg-20 h5">{{ $t('global.buyOnMarketplaces') }}</h2>

    <div class="marketplaces-wrapper">
      <SeoLink
        v-for="marketplace in marketplaces"
        :key="marketplace.link"
        :href="marketplace.link"
        tabindex="0"
        target="_blank"
        class="card text-reset"
        @click="$ym('reachGoal', marketplace.ymEvent)"
      >
        <img
          :src="`/images/logo-marketplace/${marketplace.name}.svg`"
          :alt="marketplace.name"
          class="logo-img"
          loading="lazy"
        />

        <svg-icon
          class="chevron-right"
          name="chevron-right-32"
          width="32"
          height="32"
          aria-hidden="true"
        />
      </SeoLink>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      marketplaces: [
        {
          name: 'wildberries',
          link: 'https://www.wildberries.ru/brands/ekf',
          ymEvent: 'MARKETPLACEWILDBERRIES',
        },
        {
          name: 'yandex-market',
          link: 'https://market.yandex.ru/search?vendorId=10713522&suggest_text=EKF&allowCollapsing=1&local-offers-first=0&glfilter=7893318%3A10713522',
          ymEvent: 'MARKETPLACEYANDEXMARKET',
        },
        {
          name: 'ozon',
          link: 'https://www.ozon.ru/seller/ekf-41330/products/?miniapp=seller_4133',
          ymEvent: 'MARKETPLACEOZON',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.marketplaces-wrapper {
  display: flex;
  gap: 1.5rem;
}

.card {
  position: relative;
  height: 104px;
  padding: 1.5rem 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  column-gap: 1.5rem;

  .chevron-right {
    flex-shrink: 0;
    opacity: 0;
    transition: $transition-base;
    transition-property: opacity;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: $box-shadow;

      .chevron-right {
        opacity: 1;
      }
    }
  }

  @include media-breakpoint-down(xl) {
    padding-inline: 1.5rem;
  }
}

@include media-breakpoint-down(md) {
  .marketplaces-wrapper {
    flex-direction: column;
  }

  .card {
    justify-content: space-between;
    box-shadow: $box-shadow;
    height: 128px;
    column-gap: 0;

    .chevron-right {
      opacity: 1;
    }
  }
}

@include media-breakpoint-down(xs) {
  .marketplaces-wrapper {
    row-gap: 0.5rem;
  }

  .card {
    padding-right: 0.5rem;
    padding-left: 1.5rem;
  }
}
</style>
