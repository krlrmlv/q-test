<template>
  <div class="lh-140 pb-md-48">
    <h4>{{ $t('catalog.tabs.service.title') }}</h4>

    <b-row class="mb-32 mb-md-40">
      <b-col sm="10" md="auto" lg="8">
        <p class="mb-0" v-html="$t('catalog.tabs.service.text')"></p>
      </b-col>
    </b-row>

    <p v-if="$fetchState.pending">Загрузка сервисов...</p>

    <p v-else-if="$fetchState.error || !services.length">
      Нет доступных сервисов
    </p>

    <div v-else>
      <CatalogServiceItemCard
        v-for="service in services"
        :key="service.title"
        :service="service"
        class="mb-32 mb-md-40"
      />
    </div>
  </div>
</template>

<script>
import CATALOG_SERVICES from '@/graphql/catalog/CatalogServices'

export default {
  name: 'CatalogTabService',
  data() {
    return {
      services: [],
    }
  },
  async fetch() {
    const { services } = await this.$graphql.default.request(CATALOG_SERVICES)

    this.services = services
  },
}
</script>
