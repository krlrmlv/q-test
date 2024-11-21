<template>
  <main class="page-landing page-landing-jxb pb-5">
    <section class="section section-intro">
      <b-container class="d-flex flex-column flex-fill">
        <b-row align-v="center" class="flex-fill">
          <b-col lg="5">
            <h1 class="mb-24 mb-lg-32 pr-xl-32">{{ $t('title') }}</h1>
            <div class="d-none d-lg-block">
              <b-button :to="localePath(catalogLink)" variant="outline-white">
                {{ $t('catalog.goToCatalog') }}
              </b-button>

              <p class="h3 mt-32 mt-xl-56 mb-24">{{ $t('usage.title') }}</p>
              <ul class="list-usage">
                <li>{{ $t('usage.1') }}</li>
                <li>{{ $t('usage.2') }}</li>
                <li>{{ $t('usage.3') }}</li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section
      :class="{ 'product-selected': activeProduct }"
      class="section section-toggles"
    >
      <b-container>
        <b-row class="row-toggles mx-n8 mx-lg-0">
          <b-col
            v-for="{ key } in products"
            :key="`toggle-${key}`"
            cols="12"
            sm="4"
            class="mb-16 mb-lg-0 px-8 px-lg-0"
          >
            <b-link
              :class="`toggle toggle-${key}${
                activeProduct === key ? ' active' : ''
              }`"
              @click="setActiveProduct(key)"
            >
              <div class="toggle-content">
                <p class="toggle-header">{{ $t(`${key}.title`) }}</p>
                <div class="toggle-image">
                  <img
                    :srcset="`/images/jxb/toggle-${key}-sm.jpg 110w,
                      /images/jxb/toggle-${key}.jpg    280w`"
                    :src="`/images/jxb/toggle-${key}.jpg`"
                    :alt="$t(`${key}.title`)"
                    sizes="(max-width: 991px) 110px, 280px"
                    class="img-fluid"
                  />
                </div>
              </div>
              <div class="toggle-arrow">
                <svg-icon
                  name="arrow-right-24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                />
              </div>
            </b-link>
          </b-col>
        </b-row>

        <b-row class="mx-n8 d-lg-none">
          <b-col cols="auto" sm="8" md="4" class="mx-auto mx-sm-0 px-8">
            <b-button
              variant="outline-white"
              block
              @click="sidebarShow = !sidebarShow"
            >
              {{ $t('usage.btnText') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <div v-for="product in products" :key="`product-${product.key}`">
      <transition name="product-change">
        <section
          v-show="activeProduct === product.key"
          :class="`section section-product section-product-${product.key}`"
        >
          <b-container class="container-product">
            <b-row class="justify-content-end mx-n4 mb-12 d-lg-none">
              <b-col
                v-for="pKey in inactiveProductKeys"
                :key="`inactive-product-${pKey}`"
                cols="auto"
                class="px-4"
              >
                <b-button
                  variant="outline-white"
                  block
                  @click="setActiveProduct(pKey)"
                >
                  {{ $t(`${pKey}.title`) }}
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mx-n4 mx-lg-n12 mt-lg-auto">
              <b-col
                cols="7"
                sm="8"
                md="9"
                lg="6"
                class="mb-16 mb-lg-24 px-4 px-lg-12 transition transition-left"
              >
                <div class="product-image-aspect">
                  <div class="product-image">
                    <transition name="fade" mode="out-in">
                      <b-img-lazy
                        :key="tabIndex"
                        :src="`/images/jxb/${product.key}-${tabIndex}.jpg`"
                        :alt="$t(`${product.key}.title`)"
                      />
                    </transition>
                  </div>
                </div>
              </b-col>
              <b-col cols="5" sm="4" md="3" class="mb-16 px-4 d-lg-none">
                <b-button-group class="product-tabs">
                  <b-button
                    v-for="(tab, tIndex) in product.tabs"
                    :key="`tab-${product.key}-${tab.key}`"
                    :variant="tIndex ? `accent-${tIndex}` : 'accent'"
                    :class="{ active: tabIndex === tIndex }"
                    @click="setActiveTab(tIndex)"
                  >
                    {{ $t(`${product.key}.tabs.${tab.key}.title`) }}
                  </b-button>
                </b-button-group>
              </b-col>
              <b-col
                cols="12"
                lg="6"
                class="tab-content mb-16 mb-lg-24 px-4 px-lg-12 transition transition-right"
              >
                <h2 class="product-title text-accent">
                  {{ $t(`${product.key}.title`) }}
                </h2>
                <transition name="fade" mode="out-in">
                  <div v-if="product.tabs[tabIndex]" :key="tabIndex">
                    <p class="h3 text-muted">
                      {{
                        $t(
                          `${product.key}.tabs.${product.tabs[tabIndex].key}.subtitle`
                        )
                      }}
                    </p>
                    <p
                      v-if="product.tabs[tabIndex].header"
                      class="h5 text-accent"
                    >
                      {{
                        $t(
                          `${product.key}.tabs.${product.tabs[tabIndex].key}.header`
                        )
                      }}
                    </p>
                    <div
                      class="mb-32"
                      v-html="
                        $t(
                          `${product.key}.tabs.${product.tabs[tabIndex].key}.content`
                        )
                      "
                    ></div>
                  </div>
                </transition>
                <b-button
                  :to="localePath(catalogLink)"
                  :variant="`accent-${product.tabs.length - 1}`"
                >
                  {{ $t('catalog.goToCatalog') }}
                </b-button>
              </b-col>
            </b-row>

            <b-row class="d-none d-lg-flex mb-auto transition transition-left">
              <b-col lg="8" xl="9" class="mb-5">
                <b-button-group class="product-tabs">
                  <b-button
                    v-for="(tab, tLgIndex) in product.tabs"
                    :key="`tab-${product.key}-${tab.key}`"
                    :variant="tLgIndex ? `accent-${tLgIndex}` : 'accent'"
                    :class="{ active: tabIndex === tLgIndex }"
                    @click="setActiveTab(tLgIndex)"
                  >
                    {{ $t(`${product.key}.tabs.${tab.key}.title`) }}
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>
          <ul class="list-unstyled list-tab-index">
            <li v-for="i in 5" :key="i" :class="{ active: i === tabIndex + 1 }">
              {{ i.toString().padStart(2, '0') }}
            </li>
          </ul>
        </section>
      </transition>
    </div>

    <transition name="btn-return">
      <div v-if="activeProduct" class="btn-return-wrapper">
        <b-container>
          <b-button
            variant="outline-white"
            class="btn-return btn-icon"
            @click="activeProduct = null"
          >
            <svg-icon
              name="arrow-left-24"
              width="24"
              height="24"
              aria-hidden="true"
            />
            <span class="ml-12 d-none d-lg-block">{{ $t('back') }}</span>
          </b-button>
        </b-container>
      </div>
    </transition>
    <b-sidebar
      v-model="sidebarShow"
      bg-variant="white"
      width="100%"
      right
      no-header
    >
      <template #default="{ hide }">
        <b-container>
          <p class="h2 mb-24">{{ $t('usage.title') }}</p>
          <ul class="list-usage mb-5">
            <li>{{ $t('usage.1') }}</li>
            <li>{{ $t('usage.2') }}</li>
            <li>{{ $t('usage.3') }}</li>
          </ul>
          <b-row>
            <b-col cols="12" sm="auto">
              <b-button variant="outline-dark" block @click="hide">{{
                $t('global.close')
              }}</b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-sidebar>
  </main>
</template>

<script>
import { BImgLazy, BButtonGroup, BSidebar } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BImgLazy,
    BButtonGroup,
    BSidebar,
  },
  layout: 'fullpage',
  data() {
    return {
      catalogLink: '/catalog/klemmnye-kolodki',
      activeProduct: null,
      products: [
        {
          key: 'jxb-st',
          tabs: [
            { key: 'description', header: true },
            { key: 'specs-2', header: true },
            { key: 'specs-3', header: true },
            { key: 'specs-4', header: true },
            { key: 'accessories' },
          ],
        },
        {
          key: 'jxb',
          tabs: [
            { key: 'description' },
            { key: 'specs', header: true },
            { key: 'specs-special' },
            { key: 'accessories' },
          ],
        },
        {
          key: 'jxb-s',
          tabs: [
            { key: 'description' },
            { key: 'specs', header: true },
            { key: 'accessories' },
          ],
        },
      ],
      sidebarShow: false,
      tabIndex: 0,
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  computed: {
    inactiveProductKeys() {
      return this.activeProduct
        ? this.products
            .map(({ key }) => key)
            .filter((key) => key !== this.activeProduct)
        : []
    },
  },
  mounted() {
    sendToMindbox('EKFGroup.LandingView', {
      customerAction: {
        customFields: {
          LandingName: this.$t('pageTitle'),
        },
      },
    })
  },
  methods: {
    setActiveProduct(product) {
      this.activeProduct = product
      this.setActiveTab(0)
    },
    setActiveTab(index) {
      this.tabIndex = index
    },
  },
}
</script>

<style lang="scss">
$jxb: #ffc961;
$jxb-bg: #ec8e01;
$jxb-accent: #ce7c01;
$jxb-accent-1: #d88304;
$jxb-accent-2: #ea9f10;
$jxb-accent-3: #ffc961;
$jxb-s: #e3ac97;
$jxb-s-bg: #aa6950;
$jxb-s-accent: #652d19;
$jxb-s-accent-1: #804029;
$jxb-s-accent-2: #e3ac97;
$jxb-st: #e9643d;
$jxb-st-bg: #9f2705;
$jxb-st-accent: #852003;
$jxb-st-accent-1: #8b2205;
$jxb-st-accent-2: #b72c03;
$jxb-st-accent-3: #d24117;
$jxb-st-accent-4: #e9643d;

.page-landing-jxb {
  position: relative;
  flex: 1 1 auto;
  line-height: 1.2;
  background-color: #c90808;
  overflow: hidden;

  .btn-return-wrapper {
    position: absolute;
    left: 0;
    top: 1rem;
    width: 100%;
    z-index: $zindex-dropdown - 1;
  }

  .btn-return {
    position: absolute;
  }

  .list-usage {
    list-style: none;
    padding: 0;
    font-size: 1.125rem;

    & > li {
      position: relative;
      margin-bottom: 1rem;
      padding-left: 1.25em;

      &::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 0.35em;
        width: 0.5em;
        height: 0.5em;
        background-color: currentColor;
      }
    }
  }

  .section {
    &.section-intro {
      padding-top: 2rem;
      color: $white;
    }

    &.section-toggles {
      .toggle {
        display: block;
        position: relative;
        height: 100%;
        color: $white;
        transition: $transition-base;

        .toggle-content {
          display: flex;
          flex-direction: row-reverse;
          flex-wrap: wrap;
          height: 100%;
          min-height: 140px;
          box-shadow: $box-shadow-sm;
        }

        .toggle-image {
          align-self: flex-end;
          margin-right: auto;
        }

        .toggle-header {
          flex: 1 1 auto;
          margin-bottom: 0;
          padding: 0.75rem 1rem;
          text-align: center;
          font-size: 2.25rem;
          font-weight: $font-weight-bold;
          line-height: 1;
        }

        .toggle-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 0;
          bottom: 0;
          width: 2.25rem;
          height: 2.25rem;
          background-color: $white;

          .icon {
            fill: $body-color;
            transition: $transition-base;
          }
        }

        &.toggle-jxb {
          .toggle-content {
            background-color: $jxb;
          }
        }

        &.toggle-jxb-s {
          .toggle-content {
            background-color: $jxb-s;
          }
        }

        &.toggle-jxb-st {
          .toggle-content {
            background-color: $jxb-st;
          }
        }

        &:hover {
          text-decoration: none;

          .toggle-content {
            box-shadow: $box-shadow;
          }

          .toggle-arrow {
            .icon {
              fill: $primary;
            }
          }
        }

        &:focus {
          outline: none;
        }
      }
    }

    &.section-product {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: $white;
      overflow-y: auto;

      .btn {
        &[class*='btn-accent'] {
          color: $white;
          background-color: $dark;
        }
      }

      h3,
      .h3 {
        font-size: 1.125rem;
      }

      .text-accent {
        font-weight: $font-weight-bold;
      }

      .container-product {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      .list-product {
        list-style: none;
        margin-bottom: 2rem;
        padding-left: 0;
        text-transform: none;

        & > li {
          margin-bottom: 0.25rem;
          padding-left: 1em;

          &::before {
            display: block;
            content: '– ';
            position: absolute;
            margin-left: -1em;
          }
        }
      }

      .list-accessories {
        list-style: none;
        padding-left: 0;
        margin-bottom: 2rem;

        & > li {
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
      }

      .list-tab-index {
        display: none;
      }

      .product-image-aspect {
        position: relative;
        width: 100%;
        height: 250px;
      }

      .product-image {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 1rem;
        box-shadow: $box-shadow-sm;

        & > img {
          width: 100%;
          height: 100%;
          object-fit: scale-down;
        }
      }

      .product-tabs {
        flex-direction: column;
        width: 100%;

        & > .btn {
          position: relative;
          margin: 0;
          padding: 0.75rem 0.5rem;
          text-transform: none;
          letter-spacing: 0;
          color: rgba($white, 0.75);
          box-shadow: none;
          transform: scale(1);

          &:not(:disabled):not(.disabled) {
            &:hover,
            &.active {
              color: $white;
              box-shadow: $box-shadow-sm;
              transform: scale(1.05);
              z-index: 2;
            }
          }
        }
      }

      .product-title {
        margin-bottom: 0.25rem;
        font-size: 1.875rem;
      }

      &.section-product-jxb {
        .container-product {
          background-image: linear-gradient(
            to bottom,
            $jxb-bg 200px,
            $white 200px
          );
        }

        .product-image {
          background-color: $jxb-accent-3;
        }

        .text-accent {
          color: $jxb-accent;
        }

        .btn {
          &.btn-accent {
            border-color: $jxb-accent;
            background-color: $jxb-accent;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-accent, 7%);
                background-color: darken($jxb-accent, 7%);
              }
            }
          }

          &.btn-accent-1 {
            border-color: $jxb-accent-1;
            background-color: $jxb-accent-1;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-accent-1, 7%);
                background-color: darken($jxb-accent-1, 7%);
              }
            }
          }

          &.btn-accent-2 {
            border-color: $jxb-accent-2;
            background-color: $jxb-accent-2;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-accent-2, 7%);
                background-color: darken($jxb-accent-2, 7%);
              }
            }
          }

          &.btn-accent-3 {
            border-color: $jxb-accent-3;
            background-color: $jxb-accent-3;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-accent-3, 7%);
                background-color: darken($jxb-accent-3, 7%);
              }
            }
          }
        }
      }

      &.section-product-jxb-s {
        .container-product {
          background-image: linear-gradient(
            to bottom,
            $jxb-s-bg 200px,
            $white 200px
          );
        }

        .product-image {
          background-color: $jxb-s-accent-2;
        }

        .text-accent {
          color: $jxb-s-accent;
        }

        .btn {
          &.btn-accent {
            border-color: $jxb-s-accent;
            background-color: $jxb-s-accent;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-s-accent, 7%);
                background-color: darken($jxb-s-accent, 7%);
              }
            }
          }

          &.btn-accent-1 {
            border-color: $jxb-s-accent-1;
            background-color: $jxb-s-accent-1;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-s-accent-1, 7%);
                background-color: darken($jxb-s-accent-1, 7%);
              }
            }
          }

          &.btn-accent-2 {
            border-color: $jxb-s-accent-2;
            background-color: $jxb-s-accent-2;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-s-accent-2, 7%);
                background-color: darken($jxb-s-accent-2, 7%);
              }
            }
          }
        }
      }

      &.section-product-jxb-st {
        .container-product {
          background-image: linear-gradient(
            to bottom,
            $jxb-st-bg 200px,
            $white 200px
          );
        }

        .product-image {
          background-color: $jxb-st-accent-4;
        }

        .text-accent {
          color: $jxb-st-accent;
        }

        .btn {
          &.btn-accent {
            border-color: $jxb-st-accent;
            background-color: $jxb-st-accent;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-st-accent, 7%);
                background-color: darken($jxb-st-accent, 7%);
              }
            }
          }

          &.btn-accent-1 {
            border-color: $jxb-st-accent-1;
            background-color: $jxb-st-accent-1;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-st-accent-1, 7%);
                background-color: darken($jxb-st-accent-1, 7%);
              }
            }
          }

          &.btn-accent-2 {
            border-color: $jxb-st-accent-2;
            background-color: $jxb-st-accent-2;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-st-accent-2, 7%);
                background-color: darken($jxb-st-accent-2, 7%);
              }
            }
          }

          &.btn-accent-3 {
            border-color: $jxb-st-accent-3;
            background-color: $jxb-st-accent-3;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-st-accent-3, 7%);
                background-color: darken($jxb-st-accent-3, 7%);
              }
            }
          }

          &.btn-accent-4 {
            border-color: $jxb-st-accent-4;
            background-color: $jxb-st-accent-4;

            &:not(:disabled):not(.disabled) {
              &:hover {
                border-color: darken($jxb-st-accent-4, 7%);
                background-color: darken($jxb-st-accent-4, 7%);
              }
            }
          }
        }
      }
    }
  }

  .b-sidebar-body {
    padding: 1rem 0;
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-toggles {
        .toggle {
          .toggle-header {
            flex: 0 0 100%;
          }
        }
      }

      &.section-product {
        .product-image-aspect {
          height: 400px;
        }

        .product-tabs {
          height: 100%;

          & > .btn {
            flex: 0 0 20%;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    h1,
    .h1 {
      font-size: 3.75rem;
    }

    .btn-return-wrapper {
      top: -1px;
    }

    .btn-return {
      height: calc(2.75rem + 1px);
      padding: $input-btn-padding-y 1rem;
    }

    .section {
      &.section-intro {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding-bottom: 2rem;
        color: $white;
        overflow: hidden;

        & > .container {
          min-height: 0;
          max-height: 100%;
          overflow: hidden;
        }
      }

      &.section-toggles {
        position: absolute;
        left: calc(50vw - #{map-get($container-max-widths, 'lg') * 0.08333});
        right: 0;
        top: 0;
        height: 100%;
        overflow: hidden;
        z-index: $zindex-dropdown - 2;

        & > .container {
          max-width: none;
          max-height: 100%;
        }

        .toggle {
          display: block;
          position: relative;
          max-height: 100%;
          margin-left: -1rem;
          margin-right: -1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-bottom: 2.75rem;
          overflow: hidden;
          transition-property: height, transform, filter;

          .toggle-content {
            display: flex;
            flex-direction: row-reverse;
            flex-wrap: wrap;
            overflow: hidden;
          }

          .toggle-header {
            padding: 3.75rem 0.75rem 2rem;
            font-size: 2.5rem;
            transition: $transition-base;
            transition-property: font-size, padding, transform;
          }

          .toggle-image {
            opacity: 1;
            transition: $transition-base;
            transition-property: opacity;
          }

          .toggle-arrow {
            right: 1.5rem;
            bottom: 0;
            width: 2.75rem;
            height: 2.75rem;
          }

          &.toggle-jxb {
            height: 600px;
          }

          &.toggle-jxb-s {
            height: 540px;
          }

          &.toggle-jxb-st {
            height: 480px;
          }

          &:hover {
            transform: translateY(-1.5rem);
            z-index: 1;
          }
        }

        &.product-selected {
          height: auto;
          padding-bottom: 0.5rem;

          .row-toggles {
            box-shadow: $box-shadow-sm;
          }

          .toggle {
            height: 2.75rem;
            box-shadow: none;

            .toggle-header {
              padding: 0.625rem 3.5rem 0.625rem 0.75rem;
              font-size: 1.5rem;
              transform-origin: right center;
            }

            .toggle-image {
              opacity: 0;
            }

            &:hover,
            &.active {
              transform: none;
              filter: saturate(125%);

              .toggle-header {
                transform: scale(1.1);
              }
            }

            &:focus {
              outline: none;
            }
          }
        }
      }

      &.section-product {
        padding-top: 3.75rem;
        background-color: transparent;
        overflow: hidden;
        z-index: 0;

        h3,
        .h3 {
          font-size: 1.25rem;
        }

        .container-product {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-top: 0;
          padding-bottom: 0;
          background-image: none;
          overflow-y: auto;
        }

        .product-image-aspect {
          height: auto;

          &::before {
            display: block;
            content: '';
            padding-bottom: 100%;
          }
        }

        .product-tabs {
          flex-direction: row;

          & > .btn {
            flex: 0 0 20%;
            height: 120px;

            & + .btn {
              margin-left: -1px;
            }
          }
        }

        .product-title {
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-size: 2.375rem;
        }

        &::before,
        &::after {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: -1;
        }

        &::before {
          left: 0;
          width: 35%;
        }

        &::after {
          right: 0;
          width: 65%;
          background-color: $white;
        }

        &.section-product-jxb {
          .container-product {
            background-image: none;
          }

          &::before {
            background-color: $jxb-bg;
          }
        }

        &.section-product-jxb-s {
          .container-product {
            background-image: none;
          }

          &::before {
            background-color: $jxb-s-bg;
          }
        }

        &.section-product-jxb-st {
          .container-product {
            background-image: none;
          }

          &::before {
            background-color: $jxb-st-bg;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .btn-return {
      height: calc(3.5rem + 1px);
    }

    .list-usage {
      font-size: 1.25rem;
    }

    .section {
      &.section-toggles {
        left: calc(50vw - #{map-get($container-max-widths, 'xl') * 0.08333});

        & > .container {
          max-width: 840px;
          margin-left: 0;
        }

        .toggle {
          padding-bottom: 3.5rem;

          .toggle-header {
            padding: 7rem 0.25rem 3.75rem;
            font-size: 3.75rem;
          }

          .toggle-arrow {
            width: 3.5rem;
            height: 3.5rem;
          }

          &.toggle-jxb {
            height: 840px;
          }

          &.toggle-jxb-s {
            height: 780px;
          }

          &.toggle-jxb-st {
            height: 720px;
          }
        }

        &.product-selected {
          .toggle {
            height: 3.5rem;

            .toggle-header {
              padding: 0.625rem 4.25rem 0.625rem 0.75rem;
              font-size: 2.25rem;
            }
          }
        }
      }

      &.section-product {
        padding-top: 4.5rem;
        font-size: $font-size-4;

        h3,
        .h3 {
          font-size: 2rem;
        }

        .list-tab-index {
          display: block;
          position: absolute;
          left: calc(
            50vw - #{map-get($container-max-widths, 'xl') * 0.5} - 5rem
          );
          top: 27rem;
          transform: translateY(-50%);

          & > li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
            font-weight: $font-weight-medium;
            text-align: center;
            color: rgba($white, 0.5);
            transition: $transition-base;
            transition-property: color, font-size;

            &.active {
              font-size: 2.25rem;
              color: $white;
            }
          }
        }

        .product-title {
          font-size: 4rem;
        }

        .tab-content {
          position: relative;

          &::after {
            display: block;
            content: '';
            position: absolute;
            right: 0;
            top: calc(50% - 80px);
            width: 5px;
            height: 160px;
          }
        }

        &::before,
        &::after {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: -1;
        }

        &::before {
          left: 0;
          width: 35%;
        }

        &::after {
          right: 0;
          width: 65%;
          background-color: $white;
        }

        &.section-product-jxb {
          .container-product {
            background-image: none;
          }

          .tab-content {
            &::after {
              background-color: $jxb-accent;
            }
          }

          &::before {
            background-color: $jxb-bg;
          }
        }

        &.section-product-jxb-s {
          .container-product {
            background-image: none;
          }

          .tab-content {
            &::after {
              background-color: $jxb-s-accent;
            }
          }

          &::before {
            background-color: $jxb-s-bg;
          }
        }

        &.section-product-jxb-st {
          .container-product {
            background-image: none;
          }

          .tab-content {
            &::after {
              background-color: $jxb-st-accent;
            }
          }

          &::before {
            background-color: $jxb-st-bg;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.product-change-enter-active,
.product-change-leave-active {
  transition: transform 0.3s ease-in-out;
}
.product-change-enter,
.product-change-leave-to {
  transform: translateX(100%);
}

.btn-return-enter-active,
.btn-return-leave-active {
  transition: transform 0.3s ease-in-out;
}
.btn-return-enter,
.btn-return-leave-to {
  transform: translateY(-3rem);
}

@include media-breakpoint-up(lg) {
  .product-change-enter-active,
  .product-change-leave-active {
    .container-product {
      overflow: hidden;
    }

    .list-tab-index {
      transition: opacity 0.3s ease-in-out;
    }

    .transition {
      transition: transform 0.3s ease-in-out, opacity 0.15s ease-in-out;
    }

    &::before,
    &::after {
      transition: transform 0.3s ease-in-out;
    }
  }
  .product-change-enter,
  .product-change-leave-to {
    transform: none;

    .list-tab-index,
    .transition {
      opacity: 0;
    }

    &::before,
    .transition-left {
      transform: translateX(-100%);
    }

    &::after,
    .transition-right {
      transform: translateX(100%);
    }
  }
}
</style>

<i18n>
{
  "en": {
    "back": "Go back",
    "jxb": {
      "tabs": {
        "description": {
          "content": "<ul><li>Secure fixation on DIN rail</li><li>Anodized steel contact plate</li><li>Screw conductors clamping</li><li>High quality polyamide housing</li></ul>",
          "subtitle": "Screw terminal blocks",
          "title": "Description"
        },
        "specs": {
          "content": "<ul><li>Rated AC Voltage: 800V</li><li>Cross section: 2.5 to 95 mm<sup>2*</sup></li><li>Rated current: 25 to 330A<sup>*</sup></li><li>Color: 6 body colors<sup>*</sup></li><li>Number of levels: 1/2<sup>*</sup></li><li>PE connection: yes/no<sup>*</sup></li><li class='small'><sup>*</sup>Depending on the model</li></ul>",
          "header": "Specifications",
          "subtitle": "Screw terminal blocks",
          "title": "JXB"
        },
        "specs-special": {
          "content": "<ul><li>Double</li><li>For fuse-links</li><li>Measuring</li><li>Measuring, double</li></ul>",
          "subtitle": "Screw terminal blocks, special models",
          "title": "Special models"
        },
        "accessories": {
          "content": "<ul><li>Side caps</li><li>Markers<ul><li>with / without numbering</li><li>with symbols</li></ul></li><li>Jumpers</li><li>Holder for marking</li><li>DIN rail clips<ul><li>1 / 2 screws</li><li>metal / plastic</li></ul></li></ul>",
          "subtitle": "Accessories",
          "title": "Accessories"
        }
      },
      "title": "JXB"
    },
    "jxb-s": {
      "tabs": {
        "description": {
          "content": "<ul><li>Fast mounting on a DIN rail</li><li>Tinned stainless steel conductive plate</li><li>Vertical-side connection of conductors</li><li>Self-clamping contact</li><li>Durable plastic polyamide housing</li></ul>",
          "subtitle": "Self-clamping terminal blocks",
          "title": "Description"
        },
        "specs": {
          "content": "<ul><li>Rated AC Voltage: 800V</li><li>Cross section: 2.5 to 10 mm<sup>2*</sup></li><li>Rated current: 24 to 57A<sup>*</sup></li><li>Color: 3 body colors<sup>*</sup></li><li>PE connection: yes/no<sup>*</sup></li><li class='small'><sup>*</sup>Depending on the model</li></ul>",
          "header": "Specifications",
          "subtitle": "Self-clamping terminal blocks",
          "title": "JXB-S"
        },
        "accessories": {
          "content": "<ul><li>Caps</li><li>Jumpers</li><li>Jumpers through one</li><li>Holders for marking</li><li>DIN rail clips</li></ul>",
          "subtitle": "Accessories",
          "title": "Accessories"
        }
      },
      "title": "JXB-S"
    },
    "jxb-st": {
      "tabs": {
        "description": {
          "content": "<ul><li class='accent'>Screwless conductor connection: spring-loaded self-clamping contacts are used</li><li class='accent'>Frontal connection of conductors in the horizontal plane</li><li>Polyamide plastic</li><li>Fast mounting on a DIN rail</li><li>All information on the body of the device</li><li>Self-clamping contact</li><li>Copper contact part</li><li>Easy to install jumper</li></ul>",
          "header": "Why JXB-ST?",
          "subtitle": "Self-clamping terminal blocks",
          "title": "Description"
        },
        "specs-2": {
          "content": "<ul><li>Cross section: 1.5, 2.5, 4.0, 6.0 mm<sup>2</sup></li><li>Rated current: 17.5, 31, 41, 57А</li><li>Color: gray and yellow-green</li></ul>",
          "header": "Specifications",
          "subtitle": "Self-clamping terminal blocks, 2 outputs",
          "title": "2 outputs"
        },
        "specs-3": {
          "content": "<ul><li>Cross section: 1.5, 2.5 mm<sup>2</sup></li><li>Rated current: 17.5, 31А</li><li>Color: gray and yellow-green</li></ul>",
          "header": "Specifications",
          "subtitle": "Self-clamping terminal blocks, 3 outputs",
          "title": "3 outputs"
        },
        "specs-4": {
          "content": "<ul><li>Cross section: 1.5, 2.5, 4.0 mm<sup>2</sup></li><li>Rated current: 17.5, 31, 41А</li><li>Color: gray</li></ul>",
          "header": "Specifications",
          "subtitle": "Self-clamping terminal blocks, 4 outputs",
          "title": "4 outputs"
        },
        "accessories": {
          "content": "<ul><li>Side caps</li><li>Jumpers 2PIN; 3PIN for 1.5, 2.5, 4.0 mm<sup>2</sup></li><li>Markers: without numbering, 1-50, 50-100, 100-150, 150-200, «L1, L2, L3, N, PE», «A, B, C, N, PE»</li><li>Holders for marking</li><li>DIN rail clips</li></ul>",
          "subtitle": "Accessories",
          "title": "Accessories"
        }
      },
      "title": "JXB-ST"
    },
    "pageTitle": "JXB terminal blocks for DIN rail — EKF",
    "title": "Terminal blocks",
    "usage": {
      "1": "For connecting and branching phase, neutral and grounding conductors of various cross-sections",
      "2": "Designed for use in switchboards",
      "3": "Mount on 35 mm DIN rail",
      "btnText": "Application areas",
      "title": "Application"
    }
  },
  "ru": {
    "back": "Вернуться назад",
    "jxb": {
      "tabs": {
        "description": {
          "content": "<ul><li>Надежная фиксация на DIN-рейку</li><li>Контактная пластина из анодированной стали</li><li>Зажим проводников винтом</li><li>Корпус из качественного полиамида</li></ul>",
          "subtitle": "Винтовые клеммные колодки",
          "title": "Описание"
        },
        "specs": {
          "content": "<ul><li>Номинальное напряжение переменного тока: 800В</li><li>Сечение: от 2,5 до 95 мм<sup>2*</sup></li><li>Номинальный ток: от 25 до 330А<sup>*</sup></li><li>Цвет: 6 цветовых решений корпуса<sup>*</sup></li><li>Количество уровней: 1/2<sup>*</sup></li><li>Соединение PE: да/нет<sup>*</sup></li><li class='small'><sup>*</sup>В зависимости от модели</li></ul>",
          "header": "Характеристики",
          "subtitle": "Винтовые клеммные колодки",
          "title": "JXB"
        },
        "specs-special": {
          "content": "<ul><li>Двойные</li><li>Для плавких вставок</li><li>Измерительные</li><li>Измерительные, двойные</li></ul>",
          "subtitle": "Винтовые клеммные колодки, специальные модели",
          "title": "Специальная модель"
        },
        "accessories": {
          "content": "<ul><li>Боковые заглушки</li><li>Маркеры<ul><li>без нумерации / с нумерацией</li><li>с символами</li></ul></li><li>Перемычки</li><li>Держатель для маркировки</li><li>Зажимы на DIN-рейку<ul><li>один винт / два винта</li><li>металические / пластиковые</li></ul></li></ul>",
          "subtitle": "Аксессуары",
          "title": "Аксессуары"
        }
      },
      "title": "JXB"
    },
    "jxb-s": {
      "tabs": {
        "description": {
          "content": "<ul><li>Быстрый монтаж на DIN-рейку</li><li>Токоведущая пластина из нержавеющей стали лужёная</li><li>Вертикально-боковое подключение проводников</li><li>Самозажимной контакт</li><li>Надежный корпус из пластичного полиамида</li></ul>",
          "subtitle": "Самозажимные клеммные колодки",
          "title": "Описание"
        },
        "specs": {
          "content": "<ul><li>Номинальное напряжение переменного тока: 800В</li><li>Сечение: от 2,5 до 10 мм<sup>2*</sup></li><li>Номинальный ток: от 24 до 57А<sup>*</sup></li><li>Цвет: 3 цветовых решения корпуса<sup>*</sup></li><li>Соединение PE: да/нет<sup>*</sup></li><li class='small'><sup>*</sup>В зависимости от модели</li></ul>",
          "header": "Характеристики",
          "subtitle": "Самозажимные клеммные колодки",
          "title": "JXB-S"
        },
        "accessories": {
          "content": "<ul><li>Заглушки</li><li>Перемычки</li><li>Перемычки через один</li><li>Держатели для маркировки</li><li>Зажимы на DIN-рейку</li></ul>",
          "subtitle": "Аксессуары",
          "title": "Аксессуары"
        }
      },
      "title": "JXB-S"
    },
    "jxb-st": {
      "tabs": {
        "description": {
          "content": "<ul><li class='accent'>Безвинтовое подключение проводников: используются подпружиненные самозажимные контакты</li><li class='accent'>Фронтальное подключение проводников в горизонтальной плоскости</li><li>Пластичный полиамид</li><li>Быстрый монтаж на DIN-рейку</li><li>Вся информация на корпусе устройства</li><li>Самозажимной контакт</li><li>Медная контактная часть</li><li>Простота установки перемычки</li></ul>",
          "header": "Почему JXB-ST?",
          "subtitle": "Самозажимные клеммные колодки",
          "title": "Описание"
        },
        "specs-2": {
          "content": "<ul><li>Сечение: 1,5, 2,5, 4,0, 6,0 мм<sup>2</sup></li><li>Номинальный ток: 17,5, 31, 41, 57А</li><li>Цвет: серый и жёлто-зелёный</li></ul>",
          "header": "Характеристики",
          "subtitle": "Самозажимные клеммные колодки, 2 вывода",
          "title": "2 вывода"
        },
        "specs-3": {
          "content": "<ul><li>Сечение: 1,5, 2,5 мм<sup>2</sup></li><li>Номинальный ток: 17,5, 31А</li><li>Цвет: серый и жёлто-зелёный</li></ul>",
          "header": "Характеристики",
          "subtitle": "Самозажимные клеммные колодки, 3 вывода",
          "title": "3 вывода"
        },
        "specs-4": {
          "content": "<ul><li>Сечение: 1,5, 2,5, 4,0 мм<sup>2</sup></li><li>Номинальный ток: 17,5, 31, 41А</li><li>Цвет: серый</li></ul>",
          "header": "Характеристики",
          "subtitle": "Самозажимные клеммные колодки, 4 вывода",
          "title": "4 вывода"
        },
        "accessories": {
          "content": "<ul><li>Боковые заглушки</li><li>Перемычки 2PIN, 3PIN для 1,5, 2,5, 4,0 мм<sup>2</sup></li><li>Маркеры: без нумерации, 1-50, 50-100, 100-150, 150-200, «L1, L2, L3, N, PE», «A, B, C, N, PE»</li><li>Держатели для маркировки</li><li>Зажимы на DIN-рейку</li></ul>",
          "subtitle": "Аксессуары",
          "title": "Аксессуары"
        }
      },
      "title": "JXB-ST"
    },
    "pageTitle": "Клеммные колодки JXB на дин-рейку — EKF",
    "title": "Клеммные колодки",
    "usage": {
      "1": "Для подключения и разветвления фазных, нулевых и проводников заземления различных сечений",
      "2": "Предназначены для использования в распределительных щитах",
      "3": "Устанавливаются на DIN-рейку 35 мм",
      "btnText": "Области применения",
      "title": "Применение"
    }
  }
}
</i18n>
