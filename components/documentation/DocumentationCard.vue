<template>
  <div class="card card-documentation">
    <div class="card-header d-none d-md-block">
      <b-link :to="itemLink" class="h7 text-reset mb-0">
        {{ item.name }}
      </b-link>
    </div>

    <div class="card-body">
      <b-row class="mx-n8">
        <b-col md="auto" class="mb-8 mb-md-0 px-8">
          <b-row class="mx-n8">
            <b-col cols="auto" class="px-8">
              <div class="card-img embed-responsive embed-responsive-1by1">
                <img
                  :src="itemImage"
                  width="120"
                  class="embed-responsive-item object-fit-contain"
                />
              </div>
            </b-col>

            <b-col class="d-md-none px-8">
              <b-link :to="itemLink" class="text-reset">
                {{ item.name }}
              </b-link>
            </b-col>
          </b-row>
        </b-col>

        <b-col class="px-8">
          <DocumentationFiles :files="item.files" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },

    isProduct: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    itemLink() {
      return this.isProduct
        ? this.localePath(`/catalog/products/${this.item.slug}`)
        : this.localePath(`/catalog/${this.item.slug}`)
    },
    itemImage() {
      return this.isProduct
        ? this.$getCdnImage(`/products/${this.item.image}`, { width: 120 })
        : this.$getStaticImage(this.item.image, 120)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-documentation {
  line-height: 1.4;
  border: $border-width solid $border-color;
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  background-color: transparent;
}

.card-body {
  padding: 0.5rem 1.5rem 1.5rem;
}

.card-img {
  width: 120px;
}

@include media-breakpoint-down(sm) {
  .card-body {
    padding: 1.5rem;
  }

  .card-img {
    width: 70px;
  }
}
</style>
