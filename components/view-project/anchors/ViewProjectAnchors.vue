<template>
  <section class="pt-96 pb-72">
    <b-container>
      <nav class="row">
        <b-col
          v-for="anchor in anchors"
          :key="anchor.key"
          md="6"
          lg="3"
          class="mb-24"
        >
          <ViewProjectAnchorsCard
            :anchor="anchor"
            @anchor-click="$emit('anchor-click', anchor.key)"
          />
        </b-col>
      </nav>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    anchors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
