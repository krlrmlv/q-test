<template>
  <article>
    <h4>{{ index }}. Авторизация</h4>

    <p>
      Авторизация выполняется по&nbsp;ключу доступа (API-KEY), который выдается
      отдельно каждому пользователю (только юридическому лицу) по&nbsp;запросу.
      Запрос должен быть отправлен на&nbsp;e-mail: info@ekf.su.
    </p>

    <p class="mb-8">В&nbsp;запросе должна быть следующая информация:</p>

    <ul>
      <li>
        <strong>Ф.И.О.*</strong>&nbsp;– ваши фамилия, имя и&nbsp;отчество.
      </li>
      <li>
        <strong>ИНН*</strong>&nbsp;– идентификационный налоговый номер
        юридического лица.
      </li>
      <li>
        <strong>e-mail*</strong>&nbsp;– ваш адрес электронной почты,
        на&nbsp;который будет отправлен API-KEY.
      </li>
      <li><strong>Телефон</strong>&nbsp;– ваш номер телефона.</li>
      <li>
        Поля, обозначенные &laquo;*&raquo; являются обязательными
        для&nbsp;заполнения.
      </li>
      <li>
        API-KEY должен быть указан в&nbsp;HEADER каждого запроса в&nbsp;атрибуте
        Authorization. Запись вида: Bearer "ваш API-KEY".
      </li>
    </ul>
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
