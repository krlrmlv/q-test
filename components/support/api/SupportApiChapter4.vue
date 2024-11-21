<template>
  <article>
    <h4>{{ index }}. Версионирование</h4>

    <p>
      Версия отражает изменение на&nbsp;уровне API-метода, например, формат
      выдачи ответа, добавление новых атрибутов. Номер версии
      API-метода&nbsp;&ndash; это целое число ≥ 1.
    </p>

    <p>
      Версия API-метода указывается в&nbsp;его описании,
      а&nbsp;при&nbsp;описании API-метода с&nbsp;версией >1 также отражаются
      изменения по&nbsp;отношению к&nbsp;предыдущей версии.
    </p>

    <p>
      Используемая версия API должна быть указана в&nbsp;URL-адресе запроса
      к&nbsp;API-методу после символа &laquo;v&raquo; (см.&nbsp;&laquo;Общие
      положения&raquo;).
    </p>
  </article>
</template>

<script>
export default {
  props: {
    index: {
      type: [Number, String],
      default: null,
    },
  },
}
</script>
