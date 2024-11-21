<template>
  <article>
    <h4 class="mb-24">{{ index }}. Группы товаров (product-groups)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерам
          о&nbsp;группах товаров торговой марки EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> product-groups.</li>
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
          https://ekfgroup.com/api/v1/ekf/catalog/product-groups?<span
            class="text-parameter"
            >parentId=e9935bb2-c971-11e4-bfc3-005056b80040</span
          >
        </p>

        <p class="mb-8">Data:</p>
        <div class="code fs-2">
          <pre class="mb-0">
{
    "data": [
        {
            "id": "0624426b-3c5d-11e6-87e5-000c29c6d5f2",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.01 Выключатели силовые до 1000А AV Power EKF AVERES",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/30DA434AB1B7EB485AED319214625A95.jpg"
        },
        {
            "id": "33bce512-3e5f-11dc-97f0-0080484601b3",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.05 Выключатели автоматические ВА-99С (Compact NS) до 630А EKF PROxima",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/B44F8A4782FCED9D729F2392CE5B8180.jpg"
        },
        {
            "id": "620656e6-765a-11e6-971e-000c29c6d5f2",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.08 Выключатели автоматические ВА-99МL до 250А 15-20кА EKF Basic",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/93EC10F7BAFB33C82DC646840320E342.jpg"
        },
        {
            "id": "656dc50b-3dee-11d9-afca-505054503030",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.03 Выключатели автоматические ВА-99 до 1600А EKF PROxima",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/43111E19C323A786BDF49D0591BE1FF6.jpg"
        },
        {
            "id": "78243c09-f767-11e6-bd2e-000c29c6d5f2",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.02 Аксессуары для выключателей силовых AV Power EKF AVERES",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/F1A4D9547A4906F051AC77C31B93906D.jpg"
        },
        {
            "id": "83d8957e-41e3-11d9-afcb-505054503030",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.04 Аксессуары для выключателей автоматических ВА-99 EKF PROxima",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/4938096E765222A5857E6B6BC61420E1.jpg"
        },
        {
            "id": "871f8290-365d-11db-9786-0007e92ec442",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.09 Выключатели автоматические ВА-99М до 1600А  EKF Basic",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/906F0579A22B1535413A4611DCC185D2.jpg"
        },
        {
            "id": "e370446b-4cd2-11e6-b98c-000c29c6d5f2",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.07 Аксессуары для выключателей автоматических ВА-99М EKF Basic",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/258CEEBE9454D8F99F65B05B7A0C2F35.jpg"
        },
        {
            "id": "f31d6f71-55f4-11dc-97fc-0080484601b3",
            "parentId": "e9935bb2-c971-11e4-bfc3-005056b80040",
            "name": "04.06 Аксессуары для выключателей автоматических ВА-99С (Compact NS)",
            "hierarchyLevel": 2,
            "mainImage": "https://ekfgroup.com/uploads/products/95F717BE8676118D1E4A714889AB3F5E.jpg"
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
          description: 'Объект product (товар)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '0624426b-3c5d-11e6-87e5-000c29c6d5f2',
        },
        {
          attr: 'parentId',
          type: 'Строка',
          description: 'Идентификационный номер группы товара',
          example: 'e9935bb2-c971-11e4-bfc3-005056b80040',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование номенклатуры',
          example: '04.01 Выключатели силовые до 1000А AV Power EKF AVERES',
        },
        {
          attr: 'hierarchyLevel',
          type: 'Строка',
          description: 'Иерархический уровень товара',
          example: '2',
        },
        {
          attr: 'mainImage',
          type: 'Строка',
          description: 'Ссылка на изображение товара',
          example:
            'https://ekfgroup.com/uploads/products/30DA434AB1B7EB485AED319214625A95.jpg',
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
          attr: 'parent_id',
          type: 'Строка',
          description: 'Идентификационный номер группы товара',
          example: 'e9935bb2-c971-11e4-bfc3-005056b80040',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование номенклатуры',
          example: '04.01 Выключатели силовые до 1000А AV Power EKF AVERES',
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
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/catalog/product-groups?parent_id=e9935bb2-c971-11e4-bfc3-005056b80040",
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

url = "https://ekfgroup.com/api/v1/ekf/catalog/product-groups"

payload = {'parent_id': 'e9935bb2-c971-11e4-bfc3-005056b80040'}

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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/catalog/product-groups?parent_id=e9935bb2-c971-11e4-bfc3-005056b80040");
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
.url("https://ekfgroup.com/api/v1/ekf/catalog/product-groups?parent_id=e9935bb2-c971-11e4-bfc3-005056b80040")
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
"url": "https://ekfgroup.com/api/v1/ekf/catalog/product-groups?parent_id=e9935bb2-c971-11e4-bfc3-005056b80040",
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
