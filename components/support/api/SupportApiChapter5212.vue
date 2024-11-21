<template>
  <article>
    <h4 class="mb-24">{{ index }}. Файлы продукции (files)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерам
          о&nbsp;файлах торговой марки EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> files.</li>
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
          https://ekfgroup.com/api/v1/ekf/catalog/files?<span
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
            "files": [
                {
                    "name": "Сертификат",
                    "fileType": {
                        "id": "f79f43d4-5fd0-11e6-b98c-000c29c6d5f2",
                        "code": "certificate",
                        "name": "Сертификат"
                    },
                    "file": "https://ekfgroup.com/uploads/products/DA8171AA4874E99DA939E18CF2F17CE0.pdf"
                },
                {
                    "name": "Основное изображение",
                    "fileType": {
                        "id": "f79f43d2-5fd0-11e6-b98c-000c29c6d5f2",
                        "code": "main_image",
                        "name": "Основное изображение"
                    },
                    "file": "https://ekfgroup.com/uploads/products/57882E60BF1F11278FEE8911DD79946B.jpg"
                },
                {
                    "name": "Дополнительное изображение",
                    "fileType": {
                        "id": "f79f43cf-5fd0-11e6-b98c-000c29c6d5f2",
                        "code": "additional_image",
                        "name": "Дополнительное изображение"
                    },
                    "file": "https://ekfgroup.com/uploads/products/4804815663D0B5EDF284504BF119F5F6.jpg"
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
          attr: 'vendor_code',
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
          description: 'Объект files (файлы номенклатуры)',
          header: true,
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование файла',
          example: 'Дополнительное изображение',
        },
        {
          description: 'В&nbsp;объекте files объект fileType (тип файла)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description: 'Уникальный идентификационный номер типа файла',
          example: 'f79f43cf-5fd0-11e6-b98c-000c29c6d5f2',
        },
        {
          attr: 'code',
          type: 'Строка',
          description: `Уникальный символьный идентификатор типа файла
          <ul class="list-unstyled mb-0">
            <li><strong>3dmodel</strong>&nbsp;&ndash; 3Д-модель</li>
            <li><strong>additional_image</strong>&nbsp;&ndash; Дополнительное изображение</li>
            <li><strong>additional_photo</strong>&nbsp;&ndash; Дополнительное фото</li>
            <li><strong>advantages_file</strong>&nbsp;&ndash; Преимущества</li>
            <li><strong>advertisement</strong>&nbsp;&ndash; Листовка</li>
            <li><strong>banner</strong>&nbsp;&ndash; Баннер</li>
            <li><strong>booklet</strong>&nbsp;&ndash; Буклет</li>
            <li><strong>certificate</strong>&nbsp;&ndash; Сертификат</li>
            <li><strong>conditions</strong>&nbsp;&ndash; Условия</li>
            <li><strong>description_features</strong>&nbsp;&ndash; Описание и&nbsp;особенности</li>
            <li><strong>description_features_site</strong>&nbsp;&ndash; Описание и&nbsp;преимущества Сайт</li>
            <li><strong>description_file</strong>&nbsp;&ndash; Описание</li>
            <li><strong>doc</strong>&nbsp;&ndash; Документация</li>
            <li><strong>dwg</strong>&nbsp;&ndash; Чертеж</li>
            <li><strong>group_packing</strong>&nbsp;&ndash; Макет групповой упаковки</li>
            <li><strong>individual_packing</strong>&nbsp;&ndash; Макет индивидуальной упаковки</li>
            <li><strong>logo</strong>&nbsp;&ndash; Логотип</li>
            <li><strong>main_image</strong>&nbsp;&ndash; Основное изображение</li>
            <li><strong>manual</strong>&nbsp;&ndash; Инструкция</li>
            <li><strong>master_catalogue</strong>&nbsp;&ndash; Мастер-каталог</li>
            <li><strong>pac_group</strong>&nbsp;&ndash; Макет групповой</li>
            <li><strong>pac_transp</strong>&nbsp;&ndash; Макет транспортный</li>
            <li><strong>pac_unit</strong>&nbsp;&ndash; Макет единичный</li>
            <li><strong>pasport</strong>&nbsp;&ndash; Паспорт</li>
            <li><strong>promotions</strong>&nbsp;&ndash; Акции</li>
            <li><strong>reference</strong>&nbsp;&ndash; Референс</li>
            <li><strong>shtamp</strong>&nbsp;&ndash; Печать (штамп)</li>
            <li><strong>specifications_dimensions</strong>&nbsp;&ndash; Технические характеристики</li>
            <li><strong>standard_equipment</strong>&nbsp;&ndash; Типовая комплектация</li>
            <li><strong>table</strong>&nbsp;&ndash; Таблица</li>
            <li><strong>to_description</strong>&nbsp;&ndash; К описанию</li>
            <li><strong>transport_packing</strong>&nbsp;&ndash; Макет транспортной упаковки</li>
            <li><strong>usage_file</strong>&nbsp;&ndash; Применение</li>
            <li><strong>video</strong>&nbsp;&ndash; Видео</li>
          </ul>`,
          example: 'additional_image',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование типа файла',
          example: 'Дополнительное изображение',
        },
        {
          attr: 'file',
          type: 'Строка',
          description: 'Ссылка на файл',
          example: 'https://ekfgroup.com/uploads/products/48048BF119F5F6.jpg',
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
          attr: 'group_id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер группы элемента (номенклатуры)',
          example: '679e5922-c212-11e2-abc0-005056b80040',
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
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/catalog/files?vendor_code=rcbo6-1pn-1D-30-ac-av",
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

url = "https://ekfgroup.com/api/v1/ekf/catalog/files"

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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/catalog/files?vendor_code=rcbo6-1pn-1D-30-ac-av");
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
.url("https://ekfgroup.com/api/v1/ekf/catalog/files?vendor_code=rcbo6-1pn-1D-30-ac-av")
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
"url": "https://ekfgroup.com/api/v1/ekf/catalog/files?vendor_code=rcbo6-1pn-1D-30-ac-av",
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
