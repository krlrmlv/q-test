<template>
  <article>
    <h4 class="mb-24">{{ index }}. URL для карточек товаров (product-urls)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;выгрузки Партнерами URL
          для&nbsp;карточек товаров.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> product-urls.</li>
          <li>
            <strong>Запрос:</strong> <span class="badge badge-post">POST</span>
          </li>
          <li><strong>Версия:</strong> 1.</li>
          <li><strong>Формат выдачи ответа API:</strong> JSON.</li>
        </ul>

        <h6>Атрибуты</h6>

        <p>Все атрибуты должны быть переданы в&nbsp;массиве data:</p>

        <SupportApiAttributesTable :items="tableItems" class="mb-32" />

        <h6>Пример запроса</h6>

        <p class="mb-8">URL:</p>
        <p class="code">https://ekfgroup.com/api/v1/partners/product-urls</p>

        <p class="mb-8">Data:</p>
        <div class="code fs-2">
          <pre class="mb-0">
{
    "data": [
        {
            "type": "2",
            "vendor_code": "apd2-dk20",
            "url": "https://ekfgroup.com/this/is/example"
        },
        {
            "type": "1",
            "vendor_code": "rcbo6-1pn-2D-30-ac-av",
            "url": "https://ekfgroup.com/this-is-example"
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
          attr: 'type',
          type: 'Число',
          description: `Тип сегмента:
          <ul class="list-unstyled mb-0">
            <li><strong>1</strong>&nbsp;&ndash; B2B</li>
            <li><strong>2</strong>&nbsp;&ndash; B2C</li>
            <li><strong>3</strong>&nbsp;&ndash; оба</li>
          </ul>`,
          example: '3',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул товара',
          example: 'mcb4763-1-01C-pro',
        },
        {
          attr: 'url',
          type: 'Строка',
          description: 'Ссылка на&nbsp;товар',
          example:
            'https://ekfgroup.com/catalog/avtomaticheskie-vykljuchateli-modulnye-i-dop-ustrojstva/vykljuchateli-avtomaticheskie-serii-av-6',
        },
      ],
      /* eslint-disable */
      examples: [
        {
          key: 'php',
          title: 'PHP',
          text: `$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://ekfgroup.com/api/v1/partners/product-urls",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS => '{
    "data": [
        {
            "type": "2",
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "url": "https:\/\/ekfgroup.com\/this-is-example"
        },
        {
            "type": "1",
            "vendor_code": "apd2-dk20",
            "url": "https:\/\/ekfgroup.com\/this\/is\/example"
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

url = "https://ekfgroup.com/api/v1/partners/product-urls"

payload = {
    "data": [
        {
            "type": "2",
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "url": "https:\/\/ekfgroup.com\/this-is-example"
        },
        {
            "type": "1",
            "vendor_code": "apd2-dk20",
            "url": "https:\/\/ekfgroup.com\/this\/is\/example"
        }
    ]
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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/partners/product-urls");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMz");
request.AddHeader("Content-Type", "application/json");
request.AddHeader("Accept", "application/json");
request.AddParameter("undefined", '{
    "data": [
        {
            "type": "2",
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "url": "https:\/\/ekfgroup.com\/this-is-example"
        },
        {
            "type": "1",
            "vendor_code": "apd2-dk20",
            "url": "https:\/\/ekfgroup.com\/this\/is\/example"
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
    "data": [
        {
            "type": "2",
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "url": "https:\/\/ekfgroup.com\/this-is-example"
        },
        {
            "type": "1",
            "vendor_code": "apd2-dk20",
            "url": "https:\/\/ekfgroup.com\/this\/is\/example"
        }
    ]
}');
Request request = new Request.Builder()
    .url("https://ekfgroup.com/api/v1/partners/product-urls")
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
"url": "https://ekfgroup.com/api/v1/partners/product-urls",
"method": "POST",
"headers": {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MzY2OWRjOThhMjAwN2JlNjc3ZDBjYmZhY2I1OTMzMDBkMGE0OGI2OTY1NGNhMTU3MDdlNTQ2MWU5Mjn92LyL1WrsdF92s4ypAilr6hMXaUsyNgzvWs3Xw64EsHVTBUb94spncNKXpjM3ZoGLgQHufNk6sZuujGMkQcwqMvr8ChpdALa6MvxNmp-FjWjXmLwqrK6lkXZrZfZwYre_JUMcPm-ieyUYJNrJIfXtKOE3ozxAN4zq8EcOE13SP-fGLPajdqZhiXcfocWOJ1fUAi_qJfnScaax4zf40-v9SsbE52lzYynQJTCWUHa-kcIs3RjJPLY-GjckX9rusuF67i3d1OeIhVumg2KO5zvNaBJ7VuXT1n8_22nOVxIw26mSD5gNlTDhUCDIkWxH--kWUPKKm9zPlQbovi0unEg5Xgnri28iWd79p5ib2SYmF24iQrQvScDl14e_9w3zyECndtxh_Jzfgj0-Tur-bMuRiRD9adX-KwumDkeRoCECBzrtBPeEf8LDr8a1JgHp7XMRxkKPQQMeMpkzcuOewFCm9eTSiefYh6qFgGQBvn0elJfFP5UWKLtDW1C7QygAi5syS0bBkajdkVkSsAOENzoZUl2Scxz24OGuGd-GMRvAIlCB4pxrWoGq1dKMCNiWLuMdENeCk0B7gbR4aiaGJtcb9icPbWyY4yEq7-bt58k99kIV_yzbXezi8384lyh",
},
"processData": false,
"data": {
    "data": [
        {
            "type": "2",
            "vendor_code": "rcbo6-1pn-63C-30-ac-av56",
            "url": "https:\/\/ekfgroup.com\/this-is-example"
        },
        {
            "type": "1",
            "vendor_code": "apd2-dk20",
            "url": "https:\/\/ekfgroup.com\/this\/is\/example"
        }
    ]
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
