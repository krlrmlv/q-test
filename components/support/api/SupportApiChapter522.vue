<template>
  <article>
    <h4 class="mb-24">{{ index }}. Остатки (stocks)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерам
          об&nbsp;остатках товаров торговой марки EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> stocks.</li>
          <li>
            <strong>Запрос:</strong> <span class="badge badge-post">GET</span>
          </li>
          <li><strong>Версия:</strong> 1.</li>
          <li><strong>Формат выдачи ответа API:</strong> JSON.</li>
        </ul>

        <h6>Формат ответа</h6>

        <SupportApiAttributesTable :items="tableResponse" class="mb-32" />

        <h6>Атрибуты</h6>

        <p>Все атрибуты в&nbsp;массиве data:</p>

        <SupportApiAttributesTable :items="tableAttributes" class="mb-32" />

        <h6>Параметры</h6>

        <SupportApiAttributesTable :items="tableParameters" class="mb-32" />

        <h6>Пример запроса/ответа</h6>

        <p class="mb-8">URL:</p>
        <p class="code">
          https://ekfgroup.com/api/v1/ekf/stocks?<span class="text-parameter"
            >vendor_code=rcbo6-1pn-1D-30-ac-av</span
          >
        </p>

        <p class="mb-8">Data:</p>
        <div class="code fs-2">
          <pre class="mb-0">
{
    "total": 2,
    "data": [
        {
            "id": "0001cc0d-efa2-11e6-bd2e-000c29c6d5f2",
            "vendor_code": "rcbo6-1pn-1D-30-ac-av",
            "short_name": "DVA-6 1P+N  1А (D) 30мА (AC) 6кА EKF AVERES",
            "name": "Дифференциальный автомат DVA-6 1P+N  1А (D) 30мА (AC) 6кА EKF AVERES",
            "quantity": "0.000",
            "warehouse": {
                "id": "0a83c726-6cc4-11dc-9807-0080484601b3",
                "name": "Cклад EKF, Новосибирск г",
                "short_name": "Cклад в Новосибирске",
                "location": "321232, Новосибирск г, Бирюлева ул, дом № 12"
            }
        },
        {
            "id": "0001cc0d-efa2-11e6-bd2e-000c29c6d5f2",
            "vendor_code": "rcbo6-1pn-1D-30-ac-av",
            "short_name": "DVA-6 1P+N  1А (D) 30мА (AC) 6кА EKF AVERES",
            "name": "Дифференциальный автомат DVA-6 1P+N  1А (D) 30мА (AC) 6кА EKF AVERES",
            "quantity": "0.000",
            "warehouse": {
                "id": "40cabad3-f511-11e7-80d8-0cc47a0cbffe",
                "name": "Cклад EKF, Московская обл, Ногинск",
                "short_name": "Ногинск склад",
                "location": "142412, Россия, Московская обл, Ногинский р-н, Ногинск г, Ленина ул, дом № 1, Помещение 1"
            }
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
      tableResponse: [
        {
          attr: 'total',
          type: 'Целое число',
          description:
            'Общее количество элементов в массиве data с учетом указанных параметров фильтрации',
          example: '19998',
        },
        {
          attr: 'data',
          type: 'Массив объектов',
          description:
            'Массив объектов с информацией о товаре, его аналогах и доп.товарах',
          example: 'Пример ниже',
        },
      ],
      tableAttributes: [
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '0624426b-3c5d-11e6-87e5-000c29c6d5f2',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mcb4763-1-01C-pro',
        },
        {
          attr: 'short_name',
          type: 'Строка',
          description: 'Краткое наименование номенклатуры',
          example: 'Авт. выкл. 1P 1А (C) 4,5kA ВА 47-63 EKF',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Полное наименование номенклатуры',
          example:
            'Автоматический выключатель 1P 1А (C) 4,5kA ВА 47-63 EKF PROxima',
        },
        {
          attr: 'quantity',
          type: 'Целое число',
          description: 'Количество остатка товара на складе',
          example: '1000',
        },
        {
          description: 'Объект warehouse (склад)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description: 'Уникальный идентификационный номер свойства',
          example: '0001cc0d-efa2-11e6-bd2e-000c29c6d5f2',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование склада',
          example: 'Региональный склад EKF, Новосибирск г',
        },
        {
          attr: 'short_name',
          type: 'Строка',
          description: 'Краткое наименование склада',
          example: 'Новосибирск',
        },
        {
          attr: 'location',
          type: 'Строка',
          description: 'Расположение склада',
          example: '321232, Новосибирск г, Бирюлева ул, дом № 12',
        },
      ],
      tableParameters: [
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '0001cc0d-efa2-11e6-bd2e-000c29c6d5f2',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mcb4763-1-01C-pro',
        },
        {
          attr: 'short_name',
          type: 'Строка',
          description: 'Краткое наименование номенклатуры',
          example: 'Авт. выкл. 1P 1А (C) 4,5kA ВА 47-63 EKF',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Полное наименование номенклатуры',
          example:
            'Автоматический выключатель 1P 1А (C) 4,5kA ВА 47-63 EKF PROxima',
        },
        {
          description: 'Объект warehouse (склад)',
          header: true,
        },
        {
          attr: 'warehouse_id',
          type: 'Строка',
          description: 'Уникальный идентификационный номер склада',
          example: '0a83c726-6cc4-11dc-9807-0080484601b3',
        },
        {
          attr: 'warehouse_short_name',
          type: 'Строка',
          description: 'Краткое наименование склада',
          example: 'Новосибирск',
        },
        {
          attr: 'updated_from',
          type: 'Дата в&nbsp;формате ГГГГ-ММ-ДД',
          description: 'Дата обновления (от)',
          example: '2022-10-12',
        },
        {
          description: 'Параметры пагинации',
          header: true,
        },
        {
          attr: 'limit',
          type: 'Целое число',
          description: 'Параметр пагинации - кол-во элементов на странице',
          example: '100',
        },
        {
          attr: 'page',
          type: 'Целое число',
          description: 'Параметр пагинации - текущая страница',
          example: '1',
        },
      ],
      /* eslint-disable */
      examples: [
        {
          key: 'php',
          title: 'PHP',
          text: `$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/stocks?vendor_code=rcbo6-1pn-1D-30-ac-av",
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

url = "https://ekfgroup.com/api/v1/ekf/stocks"

payload = {'vendor_code': 'rcbo6-1pn-1D-30-ac-av'}

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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/stocks?vendor_code=rcbo6-1pn-1D-30-ac-av");
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
.url("https://ekfgroup.com/api/v1/ekf/stocks?vendor_code=rcbo6-1pn-1D-30-ac-av")
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
"url": "https://ekfgroup.com/api/v1/ekf/stocks?vendor_code=rcbo6-1pn-1D-30-ac-av",
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
