<template>
  <article>
    <h4>{{ index }}. Общие положения</h4>

    <p class="mb-8">Взаимодействие происходит по&nbsp;протоколу HTTPS.</p>

    <ul>
      <li>Сервер для подключения: ekfgroup.com.</li>
      <li>Имя приложения: api.</li>
    </ul>

    <p>Формирование URL запроса к API:</p>

    <p class="code mb-8">
      <span class="text-success">POST</span>
      https://<span class="text-value">ИмяСервера</span>/<span
        class="text-value"
        >ИмяПриложения</span
      >/<span class="text-value">Версия</span>/<span class="text-value"
        >Группа</span
      >/<span class="text-value">ИмяМетода</span>
    </p>

    <p class="code">
      <span class="text-info">GET</span>
      https://<span class="text-value">ИмяСервера</span>/<span
        class="text-value"
        >ИмяПриложения</span
      >/<span class="text-value">Версия</span>/<span class="text-value"
        >Группа</span
      >/<span class="text-value">ИмяМетода</span>?<span class="text-parameter"
        >Параметр1&amp;Параметр2</span
      >
    </p>

    <p class="mb-8">Где:</p>

    <ul>
      <li>
        <strong>ИмяСервера</strong>&nbsp;— смотри &laquo;Сервер
        для&nbsp;подключения&raquo;.
      </li>
      <li>
        <strong>ИмяПриложения</strong>&nbsp;— смотри &laquo;Имя
        приложения&raquo;.
      </li>
      <li>
        <strong>Версия</strong>&nbsp;— версия API-метода. Номер версии
        указывается после символа &laquo;v&raquo;. Версия API-метода указывается
        в&nbsp;его описании (см.&nbsp;раздел &laquo;Версионирование&raquo;).
      </li>
      <li>
        <strong>Группа</strong>&nbsp;— наименование группы методов
        (см.&nbsp;структуру раздела &laquo;API-методы&raquo;). Имеются следующие
        группы методов:
        <ul>
          <li>Partners&nbsp;— данные, получаемые от&nbsp;партнеров.</li>
          <li>EKF&nbsp;— данные, получаемые от&nbsp;EKF.</li>
        </ul>
        Если группа методов имеет подгруппу, то&nbsp;все входящие подгруппы
        последовательно указывается после группы через &laquo;/&raquo;.
      </li>
      <li>
        <strong>ИмяМетода</strong>&nbsp;— имя API-метода. Смотри раздел
        &laquo;API-методы&raquo;, имя метода.
      </li>
      <li>
        <strong>Параметр1&amp;Параметр2</strong>&nbsp;— параметры, применимые
        к&nbsp;соответствующему API-методу. Смотри раздел
        &laquo;API-методы&raquo;.
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
