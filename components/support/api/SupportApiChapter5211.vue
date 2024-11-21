<template>
  <article>
    <h4 class="mb-24">{{ index }}. Товары (products)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерам
          о&nbsp;товарах торговой марки EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> products.</li>
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
          https://ekfgroup.com/api/v1/ekf/catalog/products?<span
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
            "series": "Averes",
            "status": "Заказная (16)",
            "multiplicity": "60.00",
            "description": "Автоматические выключатели дифференциального тока DVA-6 AVERES предназначены для защиты от токов утечки, перегрузки и короткого замыкания. Особая конструкция рычага обеспечивает информативность устройства, указывая на причину срабатывания (опущена только часть рычага – короткое замыкание или перегрузка, опущены обе части рычага – ток утечки). После устранения причины срабатывания для повторного взведения рукоятку устройства нужно сначала опустить вниз до конца, а затем взвести (взведение из положения trip невозможно). Гарантийные обязательства составляют 10 лет.",
            "productionTime": 125,
            "updatedAt": "2018-11-22",
            "productGroup": {
                "id": "3cf00bc0-60a3-11e7-80cd-0cc47a0cbffe",
                "name": "Характеристика D",
                "series": "Averes"
            },
            "productType": {
                "name": "Автоматический выключатель дифференциального тока (дифавтомат, АВДТ)",
                "etimClass": "EC000905"
            },
            "manufacturedBy": {
                "name": "Китай",
                "alfa2": "CN",
                "alfa3": "CHN"
            },
            "unitStorage": {
                "internationalСode": "PCE",
                "name": "шт",
                "barcode": "4690216154510",
                "coefficient": "1.000",
                "weight": "0.2500",
                "height": "0.0370",
                "width": "0.1010",
                "depth": "0.0890",
                "volume": "0.00033259"
            },
            "unitGroupPacking": {
                "internationalСode": "PCE",
                "name": "шт",
                "barcode": "4690216154510",
                "coefficient": "1.000",
                "weight": "0.2500",
                "height": "0.0370",
                "width": "0.1010",
                "depth": "0.0890",
                "volume": "0.00033259"
            },
            "unitTransportPackaging": {
                "internationalСode": "",
                "name": "коробка (60 шт)",
                "barcode": "14690216154517",
                "coefficient": "60.000",
                "weight": "15.0000",
                "height": "0.1950",
                "width": "0.2600",
                "depth": "0.5300",
                "volume": "0.02687100"
            },
            <!-- "relatedProducts": [
                {
                    "id": "72c126f7-04d5-11e7-ab3e-000c29c6d5f2",
                    "vendorCode": "av-m6-averes",
                    "shortName": "Привод моторный с режимом автовзвода AV-M6 EKF AVERES",
                    "name": "Привод моторный с режимом автовзвода AV-M6 EKF AVERES"
                },
                {
                    "id": "2fe02669-57d1-11e6-b98c-000c29c6d5f2",
                    "vendorCode": "av-min-averes",
                    "shortName": "AV-MIN EKF AVERES",
                    "name": "Расцепитель минимального напряжения AV-MIN EKF AVERES"
                },
                {
                    "id": "2fe0265d-57d1-11e6-b98c-000c29c6d5f2",
                    "vendorCode": "av-of-averes",
                    "shortName": "AV-OF EKF AVERES",
                    "name": "Контакт вспомогательный AV-OF EKF AVERES"
                },
                {
                    "id": "2fe02661-57d1-11e6-b98c-000c29c6d5f2",
                    "vendorCode": "av-sd-averes",
                    "shortName": "AV-SD EKF AVERES",
                    "name": "Контакт сигнальный AV-SD EKF AVERES"
                }
            ], -->
            "url": "https://ekfgroup.com/catalog/avtomaticheskie-vykljuchateli-differencialnogo-toka-i-uzo/avtomaticheskie-vykljuchateli-differencialnogo-toka-serii-dva-6/differentsialnyy-avtomat-dva-6-1pn-1a-d-30ma-ac-6ka-ekf-averes"
        }
    ]
}</pre>
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
          attr: 'series',
          type: 'Строка',
          description: 'Серия номенклатуры',
          example: 'PROxima',
        },
        {
          attr: 'status',
          type: 'Строка',
          description: 'Статус номенклатуры',
          example: 'Новая',
        },
        {
          attr: 'multiplicity',
          type: 'Число, точность 2.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Кратность упаковки',
          example: '1.00',
        },
        {
          attr: 'productionTime',
          type: 'Число',
          description: 'Время производства',
          example: '14 или 125',
        },
        {
          attr: 'description',
          type: 'Строка',
          description: 'Описание номенклатуры',
          example:
            'Автоматические выключатели дифференциального тока DVA-6 AVERES предназначены для защиты от токов утечки, перегрузки и короткого замыкания. Особая конструкция рычага обеспечивает информативность устройства, указывая на причину срабатывания (опущена только часть рычага – короткое замыкание или перегрузка, опущены обе части рычага – ток утечки). После устранения причины срабатывания для повторного взведения рукоятку устройства нужно сначала опустить вниз до конца, а затем взвести (взведение из положения trip невозможно). Гарантийные обязательства составляют 10 лет.',
        },
        {
          description: 'Объект productGroup (группа товара)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description: 'Уникальный идентификационный номер группы',
          example: '3cf00bc0-60a3-11e7-80cd-0cc47a0cbffe',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование группы',
          example: 'Характеристика D',
        },
        {
          attr: 'series',
          type: 'Строка',
          description: 'Серия группы',
          example: 'PROxima',
        },
        {
          description: 'Объект productType (вид номенклатуры)',
          header: true,
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование вида номенклатуры',
          example: 'Модульный автоматический выключатель',
        },
        {
          attr: 'etimClass',
          type: 'Строка',
          description: 'ETIM Class номенклатуры',
          example: 'EC000042',
        },
        {
          description: 'Объект manufacturedBy (страна происхождения товара)',
          header: true,
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Страна производства товара',
          example: 'Россия',
        },
        {
          attr: 'alfa2',
          type: 'Строка',
          description:
            'Код страны производства товара<br /> Общероссийский классификатор стран мира ОК (МК (ИСО3166) 004-97) 025-2001 код Альфа-2',
          example: 'RU',
        },
        {
          attr: 'alfa3',
          type: 'Строка',
          description:
            'Код страны производства товара<br /> Общероссийский классификатор стран мира ОК (МК (ИСО3166) 004-97) 025-2001 код Альфа-3',
          example: 'RUS',
        },
        {
          description: 'Объект unitStorage (единица хранения)',
          header: true,
        },
        {
          attr: 'internationalCode',
          type: 'Строка',
          description:
            'Кодовое буквенное обозначение (международное) единицы измерения согласно Общероссийскому классификатору единиц измерения ОК 015-94',
          example: 'PCE',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование единицы измерения',
          example: 'шт',
        },
        {
          attr: 'barcode',
          type: 'Строка',
          description: 'Штрих-код единицы измерения',
          example: '4690216154503',
        },
        {
          attr: 'coefficient',
          type: 'Число, точность 3.<br /> Разделитель дробной части &laquo;.&raquo;',
          description:
            'Количество единиц хранения в единице измерения номенклатуры',
          example: '1.000',
        },
        {
          attr: 'weight',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Вес единицы измерения в кг',
          example: '0.1000',
        },
        {
          attr: 'height',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Высота единицы измерения в м',
          example: '0.0800',
        },
        {
          attr: 'width',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Ширина единицы измерения в м',
          example: '0.0180',
        },
        {
          attr: 'depth',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Глубина единицы измерения в м',
          example: '0.0730',
        },
        {
          attr: 'volume',
          type: 'Число, точность 8.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Объем единицы измерения в м<sup>3</sup>',
          example: '0.00010512',
        },
        {
          description: 'Объект unitGroupPacking (групповая упаковка)',
          header: true,
        },
        {
          attr: 'internationalCode',
          type: 'Строка',
          description: 'Международный код единицы измерения',
          example: 'PCE',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование единицы измерения',
          example: 'шт',
        },
        {
          attr: 'barcode',
          type: 'Строка',
          description: 'Штрих-код единицы измерения',
          example: '4690216154503',
        },
        {
          attr: 'coefficient',
          type: 'Число, точность 3.<br /> Разделитель дробной части &laquo;.&raquo;',
          description:
            'Количество единиц хранения в единице измерения номенклатуры',
          example: '1.000',
        },
        {
          attr: 'weight',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Вес единицы измерения в кг',
          example: '0.1000',
        },
        {
          attr: 'height',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Высота единицы измерения в м',
          example: '0.0800',
        },
        {
          attr: 'width',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Ширина единицы измерения в м',
          example: '0.0180',
        },
        {
          attr: 'depth',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Глубина единицы измерения в м',
          example: '0.0730',
        },
        {
          attr: 'volume',
          type: 'Число, точность 8.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Объем единицы измерения в м<sup>3</sup>',
          example: '0.00010512',
        },
        {
          description: 'Объект unitTransportPackaging (транспортная упаковка)',
          header: true,
        },
        {
          attr: 'internationalCode',
          type: 'Строка',
          description: 'Международный код единицы измерения',
          example: 'NMP',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование единицы измерения',
          example: 'коробка (60 шт)',
        },
        {
          attr: 'barcode',
          type: 'Строка',
          description: 'Штрих-код единицы измерения',
          example: '4690216154503',
        },
        {
          attr: 'coefficient',
          type: 'Число, точность 3.<br /> Разделитель дробной части &laquo;.&raquo;',
          description:
            'Количество единиц хранения в единице измерения номенклатуры',
          example: '120.000',
        },
        {
          attr: 'weight',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Вес единицы измерения в кг',
          example: '0.1000',
        },
        {
          attr: 'height',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Высота единицы измерения в м',
          example: '0.0800',
        },
        {
          attr: 'width',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Ширина единицы измерения в м',
          example: '0.0180',
        },
        {
          attr: 'depth',
          type: 'Число, точность 4.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Глубина единицы измерения в м',
          example: '0.0730',
        },
        {
          attr: 'volume',
          type: 'Число, точность 8.<br /> Разделитель дробной части &laquo;.&raquo;',
          description: 'Объем единицы измерения в м<sup>3</sup>',
          example: '0.00010512',
        },
        // {
        //   description: 'Объект relatedProducts (покупают с данным товаром)',
        //   header: true,
        // },
        // {
        //   attr: 'id',
        //   type: 'Строка',
        //   description:
        //     'Уникальный идентификационный номер элемента (номенклатуры)',
        //   example: '72c126f7-04d5-11e7-ab3e-000c29c6d5f2',
        // },
        // {
        //   attr: 'vendorСode',
        //   type: 'Строка',
        //   description: 'Артикул номенклатуры',
        //   example: 'av-m6-averes',
        // },
        // {
        //   attr: 'short_name',
        //   type: 'Строка',
        //   description: 'Краткое наименование номенклатуры',
        //   example: 'Привод моторный с режимом автовзвода AV-M6 EKF AVERES',
        // },
        // {
        //   attr: 'name',
        //   type: 'Строка',
        //   description: 'Полное наименование номенклатуры',
        //   example: 'Привод моторный с режимом автовзвода AV-M6 EKF AVERES',
        // },
        // {
        //   attr: 'url',
        //   type: 'URL',
        //   description: 'Ссылка на данный товар',
        //   example:
        //     'https://ekfgroup.com/catalog/avtomaticheskie-vykljuchateli-differencialnogo-toka-i-uzo/avtomaticheskie-vykljuchateli-differencialnogo-toka-serii-dva-6/differentsialnyy-avtomat-dva-6-1pn-1a-d-30ma-ac-6ka-ekf-averes',
        // },
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
          example: '2018-3-12',
        },
        {
          attr: 'updated_to',
          type: 'Дата в&nbsp;формате ГГГГ-ММ-ДД',
          description: 'Дата обновления (до)',
          example: '2018-3-15',
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
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/catalog/products?vendor_code=rcbo6-1pn-1D-30-ac-av",
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

url = "https://ekfgroup.com/api/v1/ekf/catalog/products"

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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/catalog/products?vendor_code=rcbo6-1pn-1D-30-ac-av");
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
.url("https://ekfgroup.com/api/v1/ekf/catalog/products?vendor_code=rcbo6-1pn-1D-30-ac-av")
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
"url": "https://ekfgroup.com/api/v1/ekf/catalog/products?vendor_code=rcbo6-1pn-1D-30-ac-av",
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
