<template>
  <div>
    <h5 class="h6">{{ service.title }}</h5>

    <b-row>
      <b-col cols="12" md="8" class="fs-2 fs-xl-3">
        <div v-if="service?.address" class="d-flex align-items-center mb-16">
          <div class="text-primary mr-16">
            <svg-icon
              name="map-pin-24"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </div>

          <p class="mb-0">{{ service.address }}</p>
        </div>
        <div class="d-flex align-items-center mb-16">
          <div class="text-primary mr-16">
            <svg-icon
              name="phone-24"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </div>

          <p class="mb-0">
            <b-link
              v-for="(phone, index) in service.phones"
              :key="`${service.title}-${phone}`"
              :href="`tel:${trimPhone(phone)}`"
              class="text-reset text-hover-primary"
            >
              {{ phone }} {{ index + 1 < service?.phones?.length ? ',' : '' }}
            </b-link>
          </p>
        </div>

        <div v-if="service.link" class="d-flex align-items-center">
          <div class="text-primary mr-16">
            <svg-icon
              name="language-24"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </div>

          <p class="mb-0">
            <SeoLink
              :href="service.link"
              target="_blank"
              class="text-reset text-hover-primary"
            >
              {{ trimUrl(service.link) }}
              <svg-icon
                class="ml-4 mb-4"
                name="external-link-16"
                width="16"
                height="16"
                aria-hidden="true"
              />
            </SeoLink>
          </p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'CatalogServiceItemCard',

  props: {
    service: {
      type: Object,
      required: true,
    },
  },

  methods: {
    trimPhone(phone) {
      const regex = /\*|%|#|&|\)|\(|-|\+\$/g

      return phone.trim().replace(regex, '').replaceAll(' ', '')
    },

    trimUrl(url) {
      let trimmedUrl = url.replace(/(^\w+:|^)\/\//, '')
      trimmedUrl = trimmedUrl.replace(/\/+$/, '')

      return trimmedUrl
    },
  },
}
</script>
