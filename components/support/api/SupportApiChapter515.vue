<template>
  <article>
    <h4 class="mb-24">
      {{ index }}. Продажи товаров филиалами Партнеров (sales-branches)
    </h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерами
          о&nbsp;суммах продаж филиалами по&nbsp;артикулам (без&nbsp;учета
          возвратов товара) товаров торговой марки EKF. Данные могут
          предоставлять собой как&nbsp;ежедневный отчет,
          так&nbsp;и&nbsp;состояние о&nbsp;продажах в&nbsp;текущем месяце. Также
          отчеты могут быть представлены как&nbsp;в&nbsp;денежном,
          так&nbsp;и&nbsp;в&nbsp;количественном эквиваленте.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> sales-branches.</li>
          <li>
            <strong>Запрос:</strong> <span class="badge badge-post">POST</span>
          </li>
          <li><strong>Версия:</strong> 1.</li>
          <li><strong>Формат выдачи ответа API:</strong> JSON.</li>
        </ul>

        <h6>Атрибуты (отправка данных по&nbsp;артикулам)</h6>

        <SupportApiAttributesTable :items="tableItems" class="mb-32" />

        <h6>Атрибуты (отправка данных по&nbsp;филиалу, без&nbsp;артикулов)</h6>

        <SupportApiAttributesTable :items="tableItemsBranch" class="mb-32" />

        <h6>Пример запроса</h6>

        <p class="mb-8">URL:</p>
        <p class="code">https://ekfgroup.com/api/v1/partners/sales-branches</p>

        <p class="mb-8">
          Data (пример 1&nbsp;&ndash; отправка состояния продаж за&nbsp;день
          по&nbsp;артикулам):
        </p>

        <div class="code fs-2 mb-16">
          <pre class="mb-0">
{
    "date": "2018-02-15",
    "location": "Noginsk filial 3",
    "sales": [
        {
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "unitInternationalCode": "PCE",
            "sum": "15.00"
        },
        {
            "vendor_code": "apd2-dk20",
            "unitInternationalCode": "PCE",
            "sum": "1000.00"
        }
    ]
}</pre
          >
        </div>

        <p class="mb-8">
          Data (пример 2&nbsp;&ndash; отправка состояния суммы продаж
          за&nbsp;месяц по&nbsp;артикулам):
        </p>
        <div class="code fs-2 mb-16">
          <pre class="mb-0">
{
    "date": "2018-02-15",
    "location": "Noginsk filial 3",
    "summary": true,
    "sales": [
        {
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "unitInternationalCode": "PCE",
            "quantity": "43"
        },
        {
            "vendor_code": "apd2-dk20",
            "unitInternationalCode": "PCE",
            "quantity": "21"
        }
    ]
}</pre
          >
        </div>

        <p class="mb-8">
          Data (пример 3&nbsp;&ndash; отправка состояния продаж за&nbsp;день
          по&nbsp;филиалам):
        </p>

        <div class="code fs-2 mb-16">
          <pre class="mb-0">
{
    "data": [
        {
            "date": "2019-04-25",
            "location": "Ryazan branch EKF",
            "sum": "2238.23"
        },
        {
            "date": "2019-04-25",
            "location": "Рязанский филиал ОП 23",
            "quantity": "42"
        }
    ]
}</pre
          >
        </div>

        <p class="mb-8">
          Data (пример 4&nbsp;&ndash; отправка состояния суммы продаж
          за&nbsp;день по&nbsp;филиалам):
        </p>

        <div class="code fs-2">
          <pre class="mb-0">
{
    "summary": true,
    "data": [
        {
            "date": "2019-04-25",
            "location": "Ryazan branch EKF",
            "quantity": "10032"
        },
        {
            "date": "2019-04-25",
            "location": "Рязанский филиал ОП 23",
            "sum": "12000011.32"
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
      tableItems: [
        {
          attr: 'date',
          type: 'Дата в&nbsp;формате: гггг-мм-дд',
          description:
            'Дата и&nbsp;время данных по&nbsp;продажам товара на&nbsp;момент времени',
          example: '2018-02-15',
        },
        {
          attr: 'location',
          type: 'Строка',
          description: 'Расположение филиала',
          example: 'Noginsk filial 3',
        },
        {
          attr: 'summary <em>(опционально)</em>',
          type: 'Логический',
          description: `Продажи за&nbsp;месяц или&nbsp;за&nbsp;1&nbsp;день
          <ul class="list-unstyled mb-0">
            <li><strong>true</strong>&nbsp;&ndash; за&nbsp;месяц (т.е. продано N по&nbsp;состоянию на&nbsp;M месяц)</li>
            <li><strong>false</strong>&nbsp;&ndash; за&nbsp;1&nbsp;день (т.е. продано N за&nbsp;1&nbsp;день)</li>
            <li><strong>по умолчанию</strong>&nbsp;&ndash; false</li>
          </ul>`,
          example: 'false',
        },
        {
          description: 'Объект sales (продажи)',
          header: true,
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул товара',
          example: 'rcbo6-1pn-63C-30-ac-av56',
        },
        {
          attr: 'unitInternationalCode',
          type: 'Строка',
          description: `Кодовое буквенное обозначение (международное) единицы измерения согласно Общероссийскому классификатору единиц измерения ОК 015-94
          <ul class="list-unstyled mb-0">
            <li><strong>PCE</strong>&nbsp;&ndash; Штука</li>
            <li><strong>KOM</strong>&nbsp;&ndash; Комплект</li>
            <li><strong>NMP</strong>&nbsp;&ndash; Упаковка</li>
            <li><strong>MTR</strong>&nbsp;&ndash; Метр</li>
          </ul>`,
          example: 'PCE',
        },
        {
          description: 'Опционально (сумма или&nbsp;количество)',
          header: true,
        },
        {
          attr: 'sum',
          type: 'Число, точность 2.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Сумма продаж товара',
          example: '15.000',
        },
        {
          attr: 'quantity',
          type: 'Число',
          description: 'Количество продаж товара',
          example: '250',
        },
      ],
      tableItemsBranch: [
        {
          attr: 'summary <em>(опционально)</em>',
          type: 'Логический',
          description: `Продажи за&nbsp;месяц или&nbsp;за&nbsp;1&nbsp;день
          <ul class="list-unstyled mb-0">
            <li><strong>true</strong>&nbsp;&ndash; за&nbsp;месяц (т.е. продано N по&nbsp;состоянию на&nbsp;M месяц)</li>
            <li><strong>false</strong>&nbsp;&ndash; за&nbsp;1&nbsp;день (т.е. продано N за&nbsp;1&nbsp;день)</li>
            <li><strong>по умолчанию</strong>&nbsp;&ndash; false</li>
          </ul>`,
          example: 'true',
        },
        {
          description: 'Массив data',
          header: true,
        },
        {
          attr: 'date',
          type: 'Дата в&nbsp;формате: гггг-мм-дд',
          description:
            'Дата и&nbsp;время данных по&nbsp;продажам товара на&nbsp;момент времени',
          example: '2019-04-25',
        },
        {
          attr: 'location',
          type: 'Строка',
          description: 'Наименование склада',
          example: 'Ryazan branch EKF',
        },
        {
          description: 'Опционально (сумма или&nbsp;количество)',
          header: true,
        },
        {
          attr: 'sum',
          type: 'Число, точность 2.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Сумма продаж товара',
          example: '2238.23',
        },
        {
          attr: 'quantity',
          type: 'Число',
          description: 'Количество продаж товара',
          example: '250',
        },
      ],
      examples: [
        {
          key: 'php',
          title: 'PHP',
          text: `$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://ekfgroup.com/api/v1/partners/sales-branches",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS => '{
    "date": "2018-02-15",
    "location": "Noginsk filial 3",
    "summary": false,
    "sales": [
        {
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "unitInternationalCode": "PCE",
            "sum": "15.00"
        },
        {
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "unitInternationalCode": "PCE",
            "sum": "1000.00"
        }
    ]
}',
CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "Accept: application/json",
    "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMz"
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

url = "https://ekfgroup.com/api/v1/partners/sales"

payload = {
    "date": "2018-02-15",
    "location": "Ryazan",
    "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
    "unitInternationalCode": "PCE",
    "quantity": "10.000"
}
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMz"
}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)`,
        },
        {
          key: 'c',
          title: 'C#',
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/partners/sales-branches");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMz");
request.AddHeader("Content-Type", "application/json");
request.AddHeader("Accept", "application/json");
request.AddParameter("undefined", '{
    "date": "2018-02-15",
    "location": "Noginsk filial 3",
    "summary": false,
    "sales": [
        {
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "unitInternationalCode": "PCE",
            "sum": "15.00"
        },
        {
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "unitInternationalCode": "PCE",
            "sum": "1000.00"
        }
    ]
}', ParameterType.RequestBody);
IRestResponse response = client.Execute(request);`,
        },
        {
          key: 'java',
          title: 'Java',
          text: `OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, '{
    "date": "2018-02-15",
    "location": "Noginsk filial 3",
    "summary": false,
    "sales": [
        {
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "unitInternationalCode": "PCE",
            "sum": "15.00"
        },
        {
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "unitInternationalCode": "PCE",
            "sum": "1000.00"
        }
    ]
}');
Request request = new Request.Builder()
    .url("https://ekfgroup.com/api/v1/partners/sales-branches")
    .post(body)
    .addHeader("Accept", "application/json")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMz")
    .build();

Response response = client.newCall(request).execute();`,
        },
        {
          key: 'javascript',
          title: 'JavaScript',
          text: `var settings = {
"async": true,
"crossDomain": true,
"url": "https://ekfgroup.com/api/v1/partners/sales-branches",
"method": "POST",
"headers": {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMzMDBkMGE0OGI2OTY1NGNhMTU3MDdlNTQ2MWU5Mjn92LyL1WrsdF92s4ypAilr6hMXaUsyNgzvWs3Xw64EsHVTBUb94spncNKXpjM3ZoGLgQHufNk6sZuujGMkQcwqMvr8ChpdALa6MvxNmp-FjWjXmLwqrK6lkXZrZfZwYre_JUMcPm-ieyUYJNrJIfXtKOE3ozxAN4zq8EcOE13SP-fGLPajdqZhiXcfocWOJ1fUAi_qJfnScaax4zf40-v9SsbE52lzYynQJTCWUHa-kcIs3RjJPLY-GjckX9rusuF67i3d1OeIhVumg2KO5zvNaBJ7VuXT1n8_22nOVxIw26mSD5gNlTDhUCDIkWxH--kWUPKKm9zPlQbovi0unEg5Xgnri28iWd79p5ib2SYmF24iQrQvScDl14e_9w3zyECndtxh_Jzfgj0-Tur-bMuRiRD9adX-KwumDkeRoCECBzrtBPeEf8LDr8a1JgHp7XMRxkKPQQMeMpkzcuOewFCm9eTSiefYh6qFgGQBvn0elJfFP5UWKLtDW1C7QygAi5syS0bBkajdkVkSsAOENzoZUl2Scxz24OGuGd-GMRvAIlCB4pxrWoGq1dKMCNiWLuMdENeCk0B7gbR4aiaGJtcb9icPbWyY4yEq7-bt58k99kIV_yzbXezi8384lyh",
},
"processData": false,
"data": {
    "date": "2018-02-15",
    "location": "Noginsk filial 3",
    "summary": false,
    "sales": [
        {
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "unitInternationalCode": "PCE",
            "sum": "15.00"
        },
        {
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "unitInternationalCode": "PCE",
            "sum": "1000.00"
        }
    ]
}
}

$.ajax(settings).done(function (response) {
console.log(response);
});`,
        },
      ],
    }
  },
}
</script>
