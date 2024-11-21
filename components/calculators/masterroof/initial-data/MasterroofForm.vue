<template>
  <b-col md="5" xl="6">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col
            v-for="([field, subfield, validValue], index) in numberFields"
            :key="index"
            xl="6"
            class="form-number-col"
          >
            <ValidationProvider
              v-slot="{ valid, validated }"
              :name="field.subfield"
              :rules="`min_value:${validValue}`"
              slim
            >
              <b-form-group
                :label="$t(`${i18n}.${field}.${subfield}`)"
                :state="valid || !validated ? null : false"
                class="mb-20 mb-lg-24"
              >
                <b-form-input
                  :value="value(field, subfield)"
                  :state="valid || !validated ? null : false"
                  placeholder="1"
                  min="0"
                  type="number"
                  @focus="setActiveField(field)"
                  @blur="setActiveField('')"
                  @input="setData([Number($event), field, subfield])"
                />
              </b-form-group>
            </ValidationProvider>
          </b-col>

          <b-col xl="8">
            <ValidationProvider
              v-for="([field, subfield], index) in radioFields"
              :key="index"
              v-slot="{ valid, validated }"
              :name="field.subfield"
              rules="required"
              slim
            >
              <b-form-group
                :label="$t(`${i18n}.${field}.${subfield}`)"
                :state="valid || !validated ? null : false"
                :invalid-feedback="$t('form.fieldRequiredFeedback')"
                class="mb-20 mb-lg-24 is-invalid"
              >
                <b-form-radio-group
                  :options="radioOptions"
                  :checked="value(field, subfield)"
                  :value="value(field, subfield)"
                  :state="valid || !validated ? null : false"
                  @input="setData([$event, field, subfield])"
                >
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row align-v="center" class="mb-32 mt-32 mb-lg-64">
          <b-col cols="12" sm="auto">
            <b-button
              :disabled="loading"
              variant="primary"
              block
              type="submit"
              class="px-lg-40"
            >
              {{ $t(`${i18n}.calculate`) }}
              <b-spinner v-if="loading" class="ml-4" small />
            </b-button>
          </b-col>
          <b-col cols="12" sm="auto" class="mt-16 mt-sm-0">
            <b-button
              id="masterroof-form-controls-reset"
              variant="link"
              class="btn-reset"
              block
              @click="reset"
            >
              <svg-icon
                name="refresh-24"
                width="15"
                height="16"
                class="mr-8"
                aria-hidden="true"
              />
              {{ $t('global.reset') }}
            </b-button>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </b-col>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BSpinner,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import { mindboxCalculateCalculator } from '@/utils/mindbox'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BSpinner,
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapGetters('masterroof', ['cart', 'value', 'i18n']),
    numberFields() {
      const options = [
        ['drainpipes', 'length', 1],
        ['drainpipes', 'quantity', 1],
        ['gutter', 'length', 0],
        ['valley', 'length', 0],
      ]
      return options
    },
    radioFields() {
      const options = [
        ['drainpipes', 'diameter'],
        ['drainpipes', 'height'],
      ]
      return options
    },
    radioOptions() {
      const options = [
        { text: this.$t('global.yes'), value: 1 },
        { text: this.$t('global.no'), value: 0 },
      ]
      return options
    },
  },

  methods: {
    ...mapActions('masterroof', [
      'setActiveField',
      'reset',
      'setData',
      'changeAddedToCart',
    ]),
    scroll() {
      const target = document.getElementById('masterroof-form-controls-reset')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
    async calculate() {
      mindboxCalculateCalculator('MasterRoof')
      this.changeAddedToCart(false)
      await this.$store.dispatch('masterroof/fetchCart')
    },
    async onSubmit() {
      if (this.loading) return
      this.loading = true
      await this.calculate()
      this.loading = false
      this.scroll()
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-reset {
  padding: 0;
  display: flex;
  align-items: center;
  border: none;
  color: $secondary;

  &:focus,
  &:hover {
    text-decoration: none;
  }
}
@include media-breakpoint-up(xl) {
  .form-number-col {
    display: flex;
    align-items: flex-end;
  }
}
</style>
