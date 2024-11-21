<template>
  <b-tabs content-class="pt-24" justified small>
    <b-tab title="PHP">
      <div class="code fs-2">
        <slot name="example-php" />
      </div>
    </b-tab>

    <b-tab title="Python">
      <div class="code fs-2">
        <slot name="example-python" />
      </div>
    </b-tab>

    <b-tab title="C#">
      <div class="code fs-2">
        <slot name="example-c" />
      </div>
    </b-tab>

    <b-tab title="Java">
      <div class="code fs-2">
        <slot name="example-java" />
      </div>
    </b-tab>

    <b-tab title="JavaScript">
      <div class="code fs-2">
        <slot name="example-javascript" />
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'

export default {
  components: {
    BTabs,
    BTab,
  },
}
</script>
