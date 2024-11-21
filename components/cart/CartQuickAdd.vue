<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(submitForm)">
      <p class="mb-8">
        {{ $t('cart.quickAdd.caption') }}
      </p>

      <b-row class="mx-n4">
        <b-col cols="8" md="6" lg="8" class="px-4 input-сol">
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="name"
            rules="required"
            mode="passive"
            slim
          >
            <b-form-group :state="valid || !validated ? null : false">
              <b-form-input
                v-model="vendorCode"
                :placeholder="$t('cart.quickAdd.placeholder')"
                :state="valid || !validated ? null : false"
                @input="validate"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>

        <b-col cols="4" md="auto" class="px-4">
          <b-button
            type="submit"
            variant="outline-primary"
            class="fs-2 btn-quick-add"
            block
          >
            {{ $t('cart.quickAdd.buttonText') }}
          </b-button>
        </b-col>
      </b-row>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex'
import { BFormGroup, BFormInput } from 'bootstrap-vue'
import PRODUCT_BY_VENDOR_CODE from '@/graphql/catalog/CatalogProductByVendorCode'

export default {
  components: {
    BFormGroup,
    BFormInput,
  },

  data() {
    return {
      vendorCode: null,
    }
  },

  computed: {
    ...mapGetters('cart', ['isInCart']),
  },

  methods: {
    async submitForm() {
      if (!this.vendorCode) return

      const variables = {
        locale: this.$i18n.locale,
        vendor_code: this.vendorCode,
      }

      try {
        const { products } = await this.$graphql.default.request(
          PRODUCT_BY_VENDOR_CODE,
          variables
        )

        const product = products?.[0] || {}

        if (!product.id) {
          /* Product not found */
          this.$bvToast.toast(this.$t('cart.quickAdd.errorMessage'), {
            title: this.$t('cart.quickAdd.errorTitle'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger',
            autoHideDelay: 5000,
          })
        } else if (this.isInCart(product.id)) {
          /* Already in cart */
          this.$bvToast.toast(this.$t('cart.quickAdd.warningMessage'), {
            title: this.$t('cart.quickAdd.warningTitle'),
            toaster: 'b-toaster-bottom-right',
            variant: 'warning',
            autoHideDelay: 3000,
          })
        } else {
          const source = 'Каталог'
          await this.$store.dispatch('cart/cartUpsert', {
            product,
            quantity: parseInt(product.coefficient),
            source,
          })

          this.$gtm.push({ event: 'btnAdd', product: this.vendorCode })
          this.vendorCode = null
          this.$refs.observer?.reset()
        }
      } catch (error) {
        const message =
          error?.response?.errors?.[0]?.message || this.$t('global.error')
        this.$bvToast.toast(message, {
          title: this.$t('cart.quickAdd.errorTitle'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          autoHideDelay: 5000,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-quick-add {
  min-height: 3rem;
}

@include media-breakpoint-up(xl) {
  .input-сol {
    max-width: 372px;
  }

  .btn-quick-add {
    min-width: 154px;
  }
}
</style>
