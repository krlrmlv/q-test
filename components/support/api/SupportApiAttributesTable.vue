<template>
  <b-table-simple responsive="lg" class="fs-2" bordered striped>
    <b-thead class="bg-light">
      <b-tr>
        <b-th v-for="field in fields" :key="`head-${field.key}`">
          {{ field.label }}
        </b-th>
      </b-tr>
    </b-thead>

    <b-tbody>
      <b-tr v-for="(row, index) in items" :key="`row-${index}`">
        <b-td
          v-if="items[index].header"
          :colspan="fields.length"
          class="font-weight-medium"
        >
          <div v-html="items[index]['description']" />
        </b-td>

        <template v-else>
          <b-td v-for="field in fields" :key="`cell-${index}-${field.key}`">
            <div v-html="items[index][field.key]" />
          </b-td>
        </template>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { BTableSimple, BThead, BTbody, BTr, BTh, BTd } from 'bootstrap-vue'

export default {
  components: {
    BTableSimple,
    BThead,
    BTbody,
    BTr,
    BTh,
    BTd,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        { key: 'attr', label: 'Атрибут' },
        { key: 'type', label: 'Тип значения' },
        { key: 'description', label: 'Описание данных' },
        { key: 'example', label: 'Пример' },
      ],
    }
  },
}
</script>
