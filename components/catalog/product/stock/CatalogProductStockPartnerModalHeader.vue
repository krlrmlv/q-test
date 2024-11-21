<template>
  <b-row tag="header" class="px-16 px-sm-0 mb-lg-32 mb-8">
    <b-col cols="12" md="7" class="mb-20 mb-lg-0">
      <h4 class="title">
        {{ $t('catalog.partnerStocks.modalTitle') }}
      </h4>
      <div class="vendor-code">
        {{ $t('global.vendorCode') }}: {{ vendorCode }}
      </div>
    </b-col>
    <b-col class="text-sm-right" cols="12" md="5">
      <LocationPartnerStock />
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    vendorCode: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('geo', ['selectedLocation']),
  },
}
</script>
