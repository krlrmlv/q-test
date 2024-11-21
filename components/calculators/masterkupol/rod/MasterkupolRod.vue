<template>
  <div>
    <h2 class="h3">
      {{ $t('calculators.masterKupol.rod.title') }}
    </h2>
    <p class="mb-32" v-html="$t('calculators.masterKupol.rod.description')" />

    <b-row>
      <b-col md="6">
        <b-form-group
          :label="$t('calculators.masterKupol.rodType.title')"
          class="mb-32"
        >
          <b-form-select
            :value="rodType"
            :options="rodTypeOptions"
            @input="setRodType"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <transition name="fade" mode="out-in">
      <div v-if="rodType">
        <b-row class="mb-12 mb-lg-40">
          <b-col md="6">
            <MasterkupolRodForm />
          </b-col>

          <b-col md="6" xl="5" offset-xl="1" class="d-none d-md-block">
            <transition name="fade" mode="out-in">
              <img
                :key="`rod-image-${rodType}`"
                :src="`/images/calculators/masterkupol/rod-${rodType}.jpg`"
                :alt="$t(`calculators.masterKupol.rodType.${rodType}`)"
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
    ...mapGetters('masterkupol', ['rodType']),

    rodTypeOptions() {
      const rodTypes = ['freestanding', 'wall', 'ridge']
      const options = [
        {
          text: this.$t('calculators.masterKupol.rodType.placeholder'),
          value: null,
          disabled: true,
        },
      ]
      rodTypes.forEach((value) => {
        options.push({
          text: this.$t(`calculators.masterKupol.rodType.${value}`),
          value,
        })
      })
      return options
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setRodType']),
  },
}
</script>
