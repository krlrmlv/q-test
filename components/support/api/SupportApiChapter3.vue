<template>
  <article>
    <h4>{{ index }}. Работа с&nbsp;сервером (запросы и&nbsp;ответы)</h4>

    <h6>Запросы к&nbsp;серверу</h6>

    <p class="mb-8">
      Сервер EKF поддерживает 2&nbsp;вида запросов:
      <strong>POST</strong> и&nbsp;<strong>GET</strong>.
    </p>

    <ul>
      <li>
        <p class="mb-8">
          <strong class="text-success">POST</strong>-запрос осуществляет
          <strong>отправку</strong> данных Партнерами на&nbsp;сервер EKF.
        </p>
        <p class="mb-8">
          <em>
            Данные отправляются в&nbsp;теле запроса (не&nbsp;в&nbsp;заголовке).
            <br />
            Для&nbsp;отправки POST-запроса URL должен заканчиваться
            на&nbsp;методе (вводить параметры в&nbsp;URL запроса не&nbsp;нужно).
          </em>
        </p>
        <p class="mb-8">Пример POST-запроса:</p>
        <p class="code">
          https://<span class="text-value">ekfgroup.com</span>/<span
            class="text-value"
            >api</span
          >/<span class="text-value">v1</span>/<span class="text-value"
            >partners</span
          >/<span class="text-value">stocks</span>
        </p>
      </li>

      <li>
        <p class="mb-8">
          <strong class="text-info">GET</strong>-запрос осуществляет
          <strong>принятие</strong> данных Партнерами от&nbsp;сервера EKF.
        </p>
        <p class="mb-8">
          <em>
            Данные отправляются в&nbsp;заголоке запроса (тело запроса остается
            пустым).
            <br />
            Для&nbsp;отправки GET-запроса URL должен включать параметры метода.
          </em>
        </p>
        <p class="mb-8">Пример GET-запроса:</p>
        <p class="code">
          https://<span class="text-value">ekfgroup.com</span>/<span
            class="text-value"
            >api</span
          >/<span class="text-value">v1</span>/<span class="text-value"
            >ekf</span
          >/<span class="text-value">catalog</span>/<span class="text-value"
            >products</span
          >?<span class="text-parameter"
            >id=0001cc0d-efa2-11e6-bd2e-000c29c6d5f2</span
          >
        </p>
      </li>
    </ul>

    <h6>Ответ сервера</h6>

    <p class="mb-8">
      После отправки запроса сервер присылает один из&nbsp;данных вариантов
      ответа:
    </p>

    <ul>
      <li>200&nbsp;&ndash; OK.</li>
      <li>400&nbsp;&ndash; Bad Request.</li>
      <li>401&nbsp;&ndash; You must be authorized to view this page.</li>
      <li>403&nbsp;&ndash; Forbidden.</li>
      <li>404&nbsp;&ndash; The requested URL was not found.</li>
      <li>
        500&nbsp;&ndash; The server encountered an error processing your
        request.
      </li>
      <li>501&nbsp;&ndash; The requested method is not implemented.</li>
      <li>505&nbsp;&ndash; HTTP Version Not Supported.</li>
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
