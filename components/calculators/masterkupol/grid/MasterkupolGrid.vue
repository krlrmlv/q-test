<template>
  <div>
    <h2 class="h3">
      {{ $t('calculators.masterKupol.grid.title') }}
    </h2>
    <p class="mb-32" v-html="$t('calculators.masterKupol.grid.description')" />

    <b-row>
      <b-col md="6">
        <b-form-group
          :label="$t('calculators.masterKupol.roofType.title')"
          class="mb-32"
        >
          <b-form-select
            :value="roofType"
            :options="roofTypeOptions"
            @input="setRoofType"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <transition name="fade" mode="out-in">
      <div v-if="roofType">
        <b-row class="mb-32 mb-lg-64">
          <b-col md="6">
            <MasterkupolGridForm @go-to-rod="$emit('go-to-rod')" />
          </b-col>

          <b-col md="6" xl="5" offset-xl="1" class="d-none d-md-block">
            <transition name="fade" mode="out-in">
              <img
                :key="`roof-image-${roofType}`"
                :src="`/images/calculators/masterkupol/roof-${roofType}.jpg`"
                :alt="$t(`calculators.masterKupol.roofType.${roofType}`)"
                class="img-fluid"
              />
            </transition>
          </b-col>
        </b-row>

        <MasterkupolNext @click="$emit('next', 'grounding')" />
      </div>
    </transition>
  </div>
</template>

<script>
import { BFormGroup, BFormSelect } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BFormGroup,
    BFormSelect,
  },

  computed: {
    ...mapGetters('masterkupol', ['roofType']),

    roofTypeOptions() {
      const roofTypes = ['flat', 'pitched']
      const options = [
        {
          text: this.$t('calculators.masterKupol.roofType.placeholder'),
          value: null,
          disabled: true,
        },
      ]
      roofTypes.forEach((value) => {
        options.push({
          text: this.$t(`calculators.masterKupol.roofType.${value}`),
          value,
        })
      })
      return options
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setRoofType']),
  },
}
</script>
