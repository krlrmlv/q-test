<template>
  <div>
    <b-button size="sm" variant="link" class="modal-toggle" @click="showModal">
      {{ $t('calculators.masterKupol.climateZones.determineZone') }}
    </b-button>

    <b-modal
      v-model="modalVisible"
      modal-class="modal-masterkupol-zones"
      size="lg"
      hide-header
      hide-footer
    >
      <template #default="{ ok, cancel }">
        <h2 class="h3 mb-32">
          {{ $t('calculators.masterKupol.climateZones.determineZone') }}
        </h2>

        <MasterkupolZoneSearch
          :value="filter"
          class="mb-32"
          @input="handleSearch"
        />

        <MasterkupolZoneList
          :filter="filter"
          @select="handleZoneSelect($event, ok)"
        />

        <b-button
          variant="white"
          size="sm"
          class="btn-icon modal-close text-secondary rounded-pill"
          @click="cancel"
        >
          <span class="sr-only">{{ $t('global.close') }}</span>
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { BModal },

  data() {
    return {
      filter: null,
      modalVisible: false,
    }
  },

  methods: {
    handleSearch(event) {
      this.filter = event
    },

    handleZoneSelect(event, callback) {
      this.$emit('input', event)
      if (typeof callback === 'function') {
        callback()
      }
    },

    showModal() {
      this.handleSearch(null)
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-toggle {
  padding: 0;
  border: none;
  line-height: $line-height-base;
  color: $secondary;

  &:hover,
  &:focus {
    text-decoration: none;
  }
}

@include media-breakpoint-up(xl) {
  ::v-deep {
    .modal-masterkupol-zones {
      .modal-dialog {
        max-width: 946px;
      }
    }
  }
}
</style>
