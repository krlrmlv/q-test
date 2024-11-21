<template>
  <article>
    <h4 class="mb-24">
      {{ index }}. Характеристики (свойства) товаров (properties)
    </h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерам
          о&nbsp;характеристиках (свойствах) товаров торговой марки EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> properties.</li>
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
          https://ekfgroup.com/api/v1/ekf/catalog/properties?<span
            class="text-parameter"
            >vendor_code=rcbo6-1pn-1D-30-ac-av</span
          >
        </p>

        <p class="mb-8">Data:</p>

        <div class="code fs-2">
          <pre class="mb-0">
{
    "data": [
        {
            "id": "0001cc0d-efa2-11e6-bd2e-000c29c6d5f2",
            "vendorCode": "rcbo6-1pn-1D-30-ac-av",
            "shortName": "DVA-6 1P+N  1А (D) 30мА (AC) 6кА EKF AVERES",
            "name": "Дифференциальный автомат DVA-6 1P+N  1А (D) 30мА (AC) 6кА EKF AVERES",
            "etimClass": "EC000905",
            "properties": [
                {
                    "id": "024544bd-181b-11e6-9296-000c29c6d5f2",
                    "name": "Способ монтажа",
                    "etimFeature": "EF000003",
                    "value": "DIN-рейка",
                    "unit": "",
                    "etimUnit": ""
                },
                {
                    "id": "02454565-181b-11e6-9296-000c29c6d5f2",
                    "name": "Глубина установочная (встраив.)",
                    "etimFeature": "EF000218",
                    "value": "50",
                    "unit": "мм",
                    "etimUnit": "EU570448"
                },
                {
                    "id": "0245456c-181b-11e6-9296-000c29c6d5f2",
                    "name": "Номин. ток",
                    "etimFeature": "EF000227",
                    "value": "1",
                    "unit": "А",
                    "etimUnit": "EU570459"
                }
            ]
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
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '001db2c3-61e4-11dd-a91f-0080484601b3',
        },
        {
          attr: 'vendorCode',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mcb4763-1-01C-pro',
        },
        {
          attr: 'shortName',
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
          attr: 'etimClass',
          type: 'Строка',
          description: 'etimClass',
          example: 'EC000905',
        },
        {
          description: 'Объект properties (свойства номенклатуры)',
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
          description: 'Наименование свойства',
          example: 'Номинальный ток',
        },
        {
          attr: 'etimFeature',
          type: 'Строка',
          description: 'ETIM Feature',
          example: 'EF000001',
        },
        {
          attr: 'value',
          type: 'Строка',
          description: 'Значение свойства',
          example: '0,25',
        },
        {
          attr: 'unit',
          type: 'Строка',
          description: 'Единица измерения значения свойства',
          example: 'А',
        },
        {
          attr: 'etimUnit',
          type: 'Строка',
          description: 'Код ETIM Unit',
          example: 'EU570459',
        },
      ],
      tableParameters: [
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '001db2c3-61e4-11dd-a91f-0080484601b3',
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
          attr: 'etim_class',
          type: 'Строка',
          description: 'etim_class',
          example: 'EC000905',
        },
        {
          attr: 'updated_from',
          type: 'Дата в&nbsp;формате ГГГГ-ММ-ДД',
          description: 'Дата обновления (от)',
          example: '2022-10-12',
        },
        {
          attr: 'lang',
          type: 'Строка',
          description: 'Язык характеристик (ru, en)',
          example: 'ru',
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
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/catalog/properties?vendor_code=rcbo6-1pn-1D-30-ac-av",
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

url = "https://ekfgroup.com/api/v1/ekf/catalog/properties"

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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/catalog/properties?vendor_code=rcbo6-1pn-1D-30-ac-av");
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
.url("https://ekfgroup.com/api/v1/ekf/catalog/properties?vendor_code=rcbo6-1pn-1D-30-ac-av")
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
"url": "https://ekfgroup.com/api/v1/ekf/catalog/properties?vendor_code=rcbo6-1pn-1D-30-ac-av",
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
