<template>
  <component
    :is="isLink ? 'BLink' : 'div'"
    :to="item.to"
    class="card card-software"
  >
    <div class="card-header">
      <img
        v-if="item.image"
        :alt="item.alt"
        :src="item.image"
        height="44"
        class="mr-16"
      />

      <h4 v-if="item.title" class="mb-0">
        {{ item.title }}
      </h4>
    </div>

    <p class="card-body" v-html="item.description" />

    <div v-if="isLink" class="card-footer">
      {{ $t('global.more') }}
      <span class="ml-8" aria-hidden="true">
        <svg-icon name="arrow-right-24" width="24" height="24" />
      </span>
    </div>

    <div v-else-if="hasAppLinks" class="card-footer">
      <SupportSoftwareAppLinks
        :link-apple="item.appLinks.apple"
        :link-google="item.appLinks.google"
        :link-huawei="item.appLinks.huawei"
      />
    </div>

    <div v-else-if="hasDropdown" class="card-footer">
      <DropdownFullscreen text="Скачать архив" variant="gray-200">
        <li
          v-for="file in item.dropdownFileLinks"
          :key="file.text"
          role="presentation"
        >
          <SeoLink
            :href="file.url"
            target="_blank"
            class="dropdown-item dropdown-item-icon"
          >
            <svg-icon :name="`file/zip-24`" width="24" height="24" />
            <span>
              {{ file.text }}
              <span class="text-muted"> {{ file.formatAndSize }} </span>
            </span>
          </SeoLink>
        </li>
      </DropdownFullscreen>
    </div>

    <div v-else-if="hasFileLinks" class="card-footer">
      <b-link
        v-for="(link, index) in item.fileLinks"
        :key="`link-${index}`"
        :href="link.url"
        :class="[link.class, { 'mt-8': index > 0 }]"
        target="_blank"
        class="d-block"
      >
        {{ link.text }}
      </b-link>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    hasAppLinks() {
      return Boolean(this.item?.appLinks)
    },

    hasDropdown() {
      return Boolean(this.item?.dropdownFileLinks?.length)
    },

    hasFileLinks() {
      return Boolean(this.item?.fileLinks?.length)
    },

    isLink() {
      return Boolean(this.item?.to)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-software {
  height: 100%;
  font-size: $font-size-2;
  text-decoration: none;
  color: inherit;
  transition: $transition-base;
  transition-property: box-shadow;

  &:hover {
    text-decoration: none;
    box-shadow: $box-shadow;
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 2.5rem 2.5rem 0;
  background-color: transparent;
}

.card-body {
  margin: 0;
  padding: 1rem 2.5rem 1.5rem;
}

.card-footer {
  padding: 0 2.5rem 2.5rem;
  font-size: $font-size-3;
  font-weight: $font-weight-medium;
  color: $primary;
  background-color: transparent;
}

@include media-breakpoint-down(md) {
  .card-software {
    box-shadow: $box-shadow-sm;
  }
}
</style>
