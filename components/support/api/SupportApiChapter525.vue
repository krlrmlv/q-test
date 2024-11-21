<template>
  <article>
    <h4 class="mb-24">{{ index }}. Отправленная информация (sent-data)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;получения отправленных данных
          Партнерами EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> sent-data.</li>
          <li>
            <strong>Запрос:</strong> <span class="badge badge-post">GET</span>
          </li>
          <li><strong>Версия:</strong> 1.</li>
          <li><strong>Формат выдачи ответа API:</strong> JSON.</li>
        </ul>

        <h6>Атрибуты</h6>

        <p>Все атрибуты в&nbsp;массиве data:</p>

        <SupportApiAttributesTable :items="tableAttributes" class="mb-32" />

        <h6>Параметры</h6>

        <SupportApiAttributesTable :items="tableParameters" class="mb-32" />

        <h6>Пример запроса/ответа</h6>

        <p class="mb-8">URL:</p>
        <p class="code">
          https://ekfgroup.com/api/v1/ekf/catalog/sent-data?<span
            class="text-parameter"
            >methodName=sales&amp;date=2019-01-01</span
          >
        </p>

        <p class="mb-8">Data:</p>
        <div class="code fs-2">
          <pre class="mb-0">
{
    "data": [
        {
            "id": 144751,
            "date": "2019-01-01",
            "location": "Ногинск",
            "vendor_code": "mcb4763-2-63D-pro",
            "unitInternationalCode": "PCE",
            "quantity": "3.000",
            "createdAt": "2019-01-02 08:00:32"
        }
    ]
}</pre
          >
        </div>
      </template>
    </SupportApiTabs>
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

  data() {
    return {
      tableAttributes: [
        {
          attr: 'id',
          type: 'Строка',
          description: 'Уникальный идентификационный номер записи',
          example: '144751',
        },
        {
          attr: 'date',
          type: 'Дата в&nbsp;формате: ГГГГ-ММ-ДД',
          description: 'Дата, указанная при&nbsp;отправке информации',
          example: '2019-01-01',
        },
        {
          attr: 'location',
          type: 'Строка',
          description: 'Наименование филиала или склада',
          example: 'Ногинск',
        },
        {
          attr: 'vendorСode',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mcb4763-2-63D-pro',
        },
        {
          attr: 'unitInternationalCode',
          type: 'Строка',
          description:
            'Кодовое буквенное обозначение (международное) единицы измерения согласно Общероссийскому классификатору единиц измерения ОК 015-94 ',
          example: 'PCE',
        },
        {
          attr: 'quantity',
          type: 'Число, точность 3.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Количество продаж/остатков товара',
          example: '3.000',
        },
        {
          attr: 'createdAt',
          type: 'Дата в&nbsp;формате: ГГГГ-ММ-ДД ЧЧ:ММ:СС',
          description: 'Дата и&nbsp;время отправки информации',
          example: '2019-01-02 08:00:32',
        },
      ],
      tableParameters: [
        {
          attr: 'methodName',
          type: 'Строка',
          description:
            'Название метода (поддерживаемые названия: sales, stocks, sales-branches)',
          example: 'sales',
        },
        {
          attr: 'date',
          type: 'Дата в&nbsp;формате: ГГГГ-ММ-ДД',
          description: 'Дата, указанная при отправке информации',
          example: '2019-01-01',
        },
      ],
      /* eslint-disable */
      examples: [
        {
          key: 'php',
          title: 'PHP',
          text: `$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/sent-data?methodName=sales",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "GET",
CURLOPT_HTTPHEADER => array(
    "Accept: application/json",
    "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMjY2MzQ5OWQyOTZjZTM1ZjVmNTAwYWU2ZDhjMjEzZjBmYTNiYThkMGJlYTliNzdiYjRkMGY5ZGZlM2U4MzkzN2RkOTNmYTRiMTlmNjEzIn0.eyJhdWQiOiIzIiwianRpIjoiMzMyNjYzNDk5ZDI5NmNlMzVmNWY1MDBhZTZkOGMyMTNmMGZhM2JhOGQwYmVhOWI3N2JiNGQwZjlkZ"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}`,
        },
        {
          key: 'python',
          title: 'Python',
          text: `import requests

url = "https://ekfgroup.com/api/v1/ekf/sent-data"

payload = {'methodName': 'sales'}

headers = {
'Accept': 'application/json',
'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMjY2MzQ5OWQyOTZjZTM1ZjVmNTAwYWU2ZDhjMjEzZjBmYTNiYThkMGJlYTliNzdiYjRkMGY5ZGZlM2U4MzkzN2RkOTNmYTRiMTlmNjEzIn0.eyJhdWQiOiIzIiwianRpIjoiMzMyNjYzNDk5ZDI5NmNlMzVmNWY1MDBhZTZkOGMyMTNmMGZhM2JhOGQwYmVhOWI3N2JiNGQwZjlkZ'
}

response = requests.request("GET", url, headers=headers, params=payload)

print(response.text)`,
        },
        {
          key: 'c',
          title: 'C#',
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/sent-data?methodName=sales");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMjY2MzQ5OWQyOTZjZTM1ZjVmNTAwYWU2ZDhjMjEzZjBmYTNiYThkMGJlYTliNzdiYjRkMGY5ZGZlM2U4MzkzN2RkOTNmYTRiMTlmNjEzIn0");
request.AddHeader("Accept", "application/json");
IRestResponse response = client.Execute(request);`,
        },
        {
          key: 'java',
          title: 'Java',
          text: `OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
.url("https://ekfgroup.com/api/v1/ekf/sent-data?methodName=sales")
.get()
.addHeader("Accept", "application/json")
.addHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMjY2MzQ5OWQyOTZjZTM1ZjVmNTAwYWU2ZDhjMjEzZjBmYTNiYThkMGJlYTliNzdiYjRkMGY5ZGZlM2U4MzkzN2RkOTNmYTRiMTlmNjEzIn0.eyJhdWQiOiIzIiwianRpIjoiMzMyNjYzNDk5ZDI5NmNlMzVmNWY1MDBhZTZkOGMyMTNmMGZhM2JhOGQwYmVhOWI3N2JiNGQwZjlkZ")
.build();

Response response = client.newCall(request).execute();`,
        },
        {
          key: 'javascript',
          title: 'JavaScript',
          text: `var settings = {
"async": true,
"crossDomain": true,
"url": "https://ekfgroup.com/api/v1/ekf/sent-data?methodName=sales",
"method": "GET",
"headers": {
  "Accept": "application/json",
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMjY2MzQ5OWQyOTZjZTM1ZjVmNTAwYWU2ZDhjMjEzZjBmYTNiYThkMGJlYTliNzdiYjRkMGY5ZGZlM2U4MzkzN2RkOTNmYTRiMTlmNjEzIn0.eyJhdWQiOiIzIiwianRpIjoiMzMyNjYzNDk5ZDI5NmNlMzVmNWY1MDBhZTZkOGMyMTNmMGZhM2JhOGQwYmVhOWI3N2JiNGQwZjlkZ"
  }
}

$.ajax(settings).done(function (response) {
console.log(response);
});`,
        },
      ],
      /* eslint-enable */
    }
  },
}
</script>
