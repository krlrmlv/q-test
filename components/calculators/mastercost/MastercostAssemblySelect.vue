<template>
  <b-dropdown
    variant="link"
    toggle-class="text-reset"
    class="mastercost-assembly-dropdown"
  >
    <template #button-content>
      <span ref="tooltipTarget"> Составной </span>
    </template>

    <template #default="{ hide }">
      <b-dropdown-text
        v-for="(assembly, ai) in options"
        :key="`assembly-option-${assembly.id}`"
        tag="div"
      >
        <b-row
          v-if="!assembly.id && !assembly.products"
          :class="{
            selected: localValue === null,
            'options-item flex-nowrap mx-n6': true,
          }"
          @click.prevent="
            localValue = assembly.id
            hide()
          "
        >
          <b-col cols="9" class="text-name font-weight-medium px-8">
            {{ assembly.name }}
          </b-col>
          <b-col cols="3" class="text-price text-nowrap px-8">
            <p v-if="assembly.price" class="mb-0">
              {{ formatSum(assembly.price, $i18n.locale) }}&nbsp;₽
            </p>
          </b-col>
        </b-row>
        <div
          v-else
          :class="{
            selected: localValue === assembly.id,
            'assembly-item flex-nowrap mx-n6': true,
          }"
          @click.prevent="
            localValue = assembly.id
            hide()
          "
        >
          <div class="options-item">
            <p class="assembly-title">{{ $t('assembly') }}&nbsp;{{ ai }}</p>
            <b-row
              v-for="assemblyProduct in assembly.products"
              :key="`assembly-option-product-${assembly.id}-${assemblyProduct.id}`"
              class="assembly-item-product"
            >
              <b-col cols="9" class="assembly-item-product-label pl-0 pr-8">
                <span class="pr-8">•</span>
                <span class="assembly-item-product-name">{{
                  assemblyProduct.name
                }}</span>
                <span class="assembly-item-product-qty"
                  >&#xD7;&nbsp;{{ assemblyProduct.assemblyQty || 1 }}</span
                >
              </b-col>
              <b-col cols="3" class="text-price text-nowrap pl-8 pr-0">
                <p v-if="assemblyProduct.price" class="mb-0">
                  {{ formatSum(assemblyProduct.price, $i18n.locale) }}&nbsp;₽
                </p>
              </b-col>
            </b-row>
            <b-row class="assembly-item-total">
              <b-col cols="9" class="assembly-item-total-label pl-0 pr-8">
                {{ $t('assemblyCost') }}
              </b-col>
              <b-col cols="3" class="text-price text-nowrap pl-8 pr-0">
                {{
                  formatSum(
                    assembly.products.reduce(
                      (acc, p) => acc + p.price * p.assemblyQty,
                      0
                    ),
                    $i18n.locale
                  )
                }}&nbsp;₽
              </b-col>
            </b-row>
          </div>
        </div>
      </b-dropdown-text>
    </template>
  </b-dropdown>
</template>

<script>
import { BDropdown, BDropdownText } from 'bootstrap-vue'
import formatSum from '@/utils/formatSum'

export default {
  components: {
    BDropdown,
    BDropdownText,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },

    options() {
      return [
        { id: null, name: this.item.name, price: this.item.price },
        ...Object.values(this.item.assemblies),
      ]
    },
  },

  methods: { formatSum },
}
</script>

<style lang="scss">
.mastercost-assembly-dropdown {
  max-width: 100%;

  .dropdown-toggle {
    display: inline-block;
    position: relative;
    padding: 0 1rem 0 1rem;
    font-size: 0.875rem;
    font-weight: $font-weight-medium;
    line-height: inherit;
    text-align: left;
    text-decoration-color: $dark;
    text-overflow: ellipsis;
    border: none;
    overflow: hidden;

    &::after {
      position: absolute;
      right: 0;
      top: 0.6em;
    }

    &:hover {
      text-decoration-style: solid;
      text-decoration-color: currentColor;
      color: $primary;
    }
  }

  .dropdown-menu {
    width: 38rem;
    max-width: calc(100vw - #{$grid-gutter-width});
    padding: 16px 24px 16px 24px;
    line-height: 1.2;
    white-space: normal;

    li:not(:last-child) {
      margin-bottom: 16px;
    }
    .b-dropdown-text {
      padding: 0;
    }
  }

  .assembly-item {
    border-top: 1px solid $gray-200;
    padding-top: 1rem;
    &.selected {
      .options-item {
        background-color: $gray-100;
        &:hover {
          cursor: pointer;
          background-color: $gray-200;
        }
      }
    }
    .assembly-title {
      font-size: 1rem;
      line-height: 1.125rem;
      font-weight: $font-weight-medium;
      margin-bottom: 0.75rem;
    }
    .assembly-item-product {
      margin-left: 0;
      margin-right: 0;
      margin-top: 1rem;
      &:nth-of-type(1) {
        margin-top: 0.75rem;
      }
      .assembly-item-product-label {
        font-weight: $font-weight-normal;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .assembly-item-product-name {
          flex: 1;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        .assembly-item-product-qty {
          margin-left: 0.5rem;
          align-self: center;
          font-weight: $font-weight-medium;
        }
      }
    }
    .assembly-item-total {
      margin-left: 0;
      margin-right: 0;
      margin-top: 1.5rem;
      .assembly-item-total-label {
        font-weight: $font-weight-bold;
      }
    }
  }
  .options-item {
    padding: 0.5rem;
    transition: $transition-base;
    transition-property: 'background-color';
    &:hover {
      cursor: pointer;
      background-color: $gray-200;
    }
    &.selected {
      background-color: $gray-100;
      &:hover {
        cursor: pointer;
        background-color: $gray-200;
      }
    }
    .text-name {
      font-size: 1rem;
      line-height: 1.125rem;
    }
    .text-price {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      font-size: 1rem;
      line-height: 1.125rem;
      font-weight: 500;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "assembly": "Assembly",
    "assemblyCost": "Assembly cost"
  },
  "ru": {
    "assembly": "Сборка",
    "assemblyCost": "Стоимость сборки"
  }
}
</i18n>
