<template>
  <article>
    <h4 class="mb-24">{{ index }}. Аналоги товаров (product-analogs)</h4>

    <SupportApiTabs :examples="examples">
      <template #description>
        <h6>Общие положения</h6>

        <p class="mb-8">
          API-метод предназначен для&nbsp;предоставления данных Партнерам
          о&nbsp;доп.товарах и аналогах на продукцию торговой марки EKF.
        </p>

        <ul class="mb-32">
          <li><strong>Имя метода:</strong> product-analogs</li>
          <li>
            <strong>Запрос:</strong> <span class="badge badge-post">GET</span>
          </li>
          <li><strong>Версия:</strong>1.0</li>
          <li><strong>Формат выдачи ответа API:</strong> JSON.</li>
        </ul>

        <h6>Формат ответа</h6>

        <SupportApiAttributesTable :items="tableResponse" class="mb-32" />

        <h6>Атрибуты</h6>

        <p>Все атрибуты объекта в&nbsp;массиве data:</p>

        <SupportApiAttributesTable :items="tableAttributes" class="mb-32" />

        <h6>Параметры</h6>

        <SupportApiAttributesTable :items="tableParameters" class="mb-32" />

        <h6>Пример запроса/ответа</h6>

        <p class="mb-8">URL:</p>
        <p class="code">
          https://ekfgroup.com/api/v1/ekf/catalog/product-analogs?<span
            class="text-parameter"
            >vendor_code=mcb4763-1-01C-pro&additional&ekf&competitors</span
          >
        </p>

        <p class="mb-8">Response:</p>

        <div class="code fs-2">
          <pre class="mb-0">
{
    "total": 1,
    "data": [
        {
            "id": "7b3e9a3e-c218-11e2-abc0-005056b80040",
            "collapsed_parent_id": "679e5922-c212-11e2-abc0-005056b80040",
            "vendor_code": "mcb4763-1-01C-pro",
            "name": "Автоматический выключатель 1P 1А (C) 4,5kA ВА 47-63 EKF PROxima",
            "short_name": "Авт. выкл. 1P 1А (C) 4,5kA ВА 47-63 EKF",
            "additional_products": [
                {
                    "id": "7f507201-3ccb-11e5-aa8a-005056b80040",
                    "collapsed_parent_id": "7b3e9a20-c218-11e2-abc0-005056b80040",
                    "vendor_code": "mdb-47-grey-pro",
                    "name": "Кнопка модульная КМ-47 (серая) EKF PROxima",
                    "short_name": "Кнопка модульная КМ-47 (серая) EKF PROxima"
                },
                {
                    "id": "a1936d8b-c21a-11e2-abc0-005056b80040",
                    "collapsed_parent_id": "7b3e9a20-c218-11e2-abc0-005056b80040",
                    "vendor_code": "mdrmm-47-pro",
                    "name": "Расцепитель минимального и максимального напряжения РММ-47 EKF PROxima",
                    "short_name": "Расцепитель минимального и максимального напряжения РММ-47 EKF PROxima"
                },
                {
                    "id": "855bd24e-3ccb-11e5-aa8a-005056b80040",
                    "collapsed_parent_id": "7b3e9a20-c218-11e2-abc0-005056b80040",
                    "vendor_code": "mdb-47-red-pro",
                    "name": "Кнопка модульная КМ-47 (красная) EKF PROxima",
                    "short_name": "Кнопка модульная КМ-47 (красная) EKF PROxima"
                },
                {
                    "id": "a1936d6a-c21a-11e2-abc0-005056b80040",
                    "collapsed_parent_id": "7b3e9a20-c218-11e2-abc0-005056b80040",
                    "vendor_code": "mdac-47-pro",
                    "name": "Аварийный контакт АК-47 EKF PROxima",
                    "short_name": "Аварийный контакт АК-47 EKF PROxima"
                },
                {
                    "id": "a1936d80-c21a-11e2-abc0-005056b80040",
                    "collapsed_parent_id": "7b3e9a20-c218-11e2-abc0-005056b80040",
                    "vendor_code": "mdri-47-pro",
                    "name": "Расцепитель независимый РН-47 EKF PROxima",
                    "short_name": "Расцепитель независимый РН-47 EKF PROxima"
                },
                {
                    "id": "a1936d75-c21a-11e2-abc0-005056b80040",
                    "collapsed_parent_id": "7b3e9a20-c218-11e2-abc0-005056b80040",
                    "vendor_code": "mdbc-47-pro",
                    "name": "Блок-контакт БК-47 EKF PROxima",
                    "short_name": "Блок-контакт БК-47 EKF PROxima"
                }
            ],
            "ekf_analogs": [
                {
                    "id": "3a5a1aaf-ef8f-11d8-8882-505054503030",
                    "collapsed_parent_id": "ee655072-702f-11d9-b49c-505054503030",
                    "vendor_code": "mcb4763-1-01C",
                    "name": "Автоматический выключатель ВА 47-63, 1P 1А (C) 4,5kA EKF",
                    "short_name": "ВА 47-63, 1P 1А (C) EKF"
                },
                {
                    "id": "17421c65-efa0-11e6-bd2e-000c29c6d5f2",
                    "collapsed_parent_id": "b13538a7-ef76-11e6-bd2e-000c29c6d5f2",
                    "vendor_code": "mcb10-1-01C-av",
                    "name": "Выключатель автоматический AV-10 1P 1A (C) 10kA EKF AVERES",
                    "short_name": "AV-10 1P 1A (C) 10kA EKF AVERES"
                }
            ],
            "competitor_analogs": [
                {
                    "id": "e5e3a1dc-3970-11e7-80ca-0cc47a0cbffe",
                    "vendor_code": "A9F74101",
                    "name": "АВТ. ВЫКЛ.iC60N 1П 1A C",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "ebe2fe75-3970-11e7-80ca-0cc47a0cbffe",
                    "vendor_code": "A9K24101",
                    "name": "АВТ. ВЫКЛ.iK60 1П 1A C",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "f1da8553-3970-11e7-80ca-0cc47a0cbffe",
                    "vendor_code": "407662",
                    "name": "Авт.выкл.DX3 1П C1A 6000/10kA",
                    "type": null,
                    "competitor_name": "Legrand"
                },
                {
                    "id": "76de10de-c691-11e5-87b5-000c29c6d5f2",
                    "vendor_code": "187982",
                    "name": "Авт. выкл.DZ47-60 1P 1A 4.5kA х-ка C  (CHINT)",
                    "type": null,
                    "competitor_name": "Chint"
                },
                {
                    "id": "c356bd9e-c691-11e5-87b5-000c29c6d5f2",
                    "vendor_code": "11049DEK",
                    "name": "Авт. выкл. 1Р 1А х-ка C ВА-101 4,5кА DEKraft",
                    "type": null,
                    "competitor_name": "Dekraft"
                },
                {
                    "id": "49485204-c692-11e5-87b5-000c29c6d5f2",
                    "vendor_code": "MVA20-1-001-C",
                    "name": "Авт. выкл.ВА47-29 1Р  1А 4,5кА х-ка С ИЭК",
                    "type": null,
                    "competitor_name": "IEK"
                },
                {
                    "id": "5ea52176-c694-11e5-87b5-000c29c6d5f2",
                    "vendor_code": "SQ0206-0065",
                    "name": "Авт. выкл.ВА47-29 1Р  1А 4,5кА х-ка С TDM",
                    "type": null,
                    "competitor_name": "TDM"
                },
                {
                    "id": "3a8b2057-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "1277580",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b2058-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "1277676",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b2059-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "1277677",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b205a-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "2CCS471001R0014",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b205b-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "2CDS211001R0014",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА ABB SH200",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b205c-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "2CDV271001R0014",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b205d-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "4968758",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (0P+N) 1А хар. C 10кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "3a8b205e-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "4968898",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (0P+N) 1А хар. C 25кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "4085c9fd-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "5396208",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "4085c9fe-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "5396488",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "4085c9ff-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "5396595",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "4085ca00-508f-11e9-a20f-00155dfa1116",
                    "vendor_code": "STOS261 C1",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА ABB",
                    "type": null,
                    "competitor_name": "ABB"
                },
                {
                    "id": "1bd4d3bc-5098-11e9-a20f-00155dfa1116",
                    "vendor_code": "12049DEK",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА DEKraft ВА-103",
                    "type": null,
                    "competitor_name": "Dekraft"
                },
                {
                    "id": "1bd4d3bd-5098-11e9-a20f-00155dfa1116",
                    "vendor_code": "13148DEK",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА DEKraft ВА-105",
                    "type": null,
                    "competitor_name": "Dekraft"
                },
                {
                    "id": "35699e19-50be-11e9-a20f-00155dfa1116",
                    "vendor_code": "164754",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА EATON",
                    "type": null,
                    "competitor_name": "EATON"
                },
                {
                    "id": "3f5c983d-50c0-11e9-a20f-00155dfa1116",
                    "vendor_code": "MVA41-1-001-C",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА IEK (ИЭК) ВА47-60",
                    "type": null,
                    "competitor_name": "IEK"
                },
                {
                    "id": "be4d68d9-50c0-11e9-a20f-00155dfa1116",
                    "vendor_code": "403633",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА Legrand",
                    "type": null,
                    "competitor_name": "Legrand"
                },
                {
                    "id": "be4d68da-50c0-11e9-a20f-00155dfa1116",
                    "vendor_code": "407256",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА Legrand DX3",
                    "type": null,
                    "competitor_name": "Legrand"
                },
                {
                    "id": "be4d68db-50c0-11e9-a20f-00155dfa1116",
                    "vendor_code": "409107",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА Legrand DX3",
                    "type": null,
                    "competitor_name": "Legrand"
                },
                {
                    "id": "be4d68dc-50c0-11e9-a20f-00155dfa1116",
                    "vendor_code": "409125",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C Legrand",
                    "type": null,
                    "competitor_name": "Legrand"
                },
                {
                    "id": "200238e6-50c1-11e9-a20f-00155dfa1116",
                    "vendor_code": "81-0009",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 4.5кА REXANT",
                    "type": null,
                    "competitor_name": "REXANT"
                },
                {
                    "id": "ae4305a1-50c1-11e9-a20f-00155dfa1116",
                    "vendor_code": "24955",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C Schneider Electric",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "ae4305a2-50c1-11e9-a20f-00155dfa1116",
                    "vendor_code": "25392",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 15кА Schneider Electric",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "ae4305a3-50c1-11e9-a20f-00155dfa1116",
                    "vendor_code": "A9F64101",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 4.5кА Schneider Electric",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "ae4305a4-50c1-11e9-a20f-00155dfa1116",
                    "vendor_code": "A9F84101",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА Schneider Electric Acti9/Multi9",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "ae4305a5-50c1-11e9-a20f-00155dfa1116",
                    "vendor_code": "A9F94101",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 15кА Schneider Electric Acti9/Multi9",
                    "type": null,
                    "competitor_name": "Schneider Electric"
                },
                {
                    "id": "f9309eed-50c2-11e9-a20f-00155dfa1116",
                    "vendor_code": "103542",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА КЭАЗ (Курский электроаппаратный завод) Optima",
                    "type": null,
                    "competitor_name": "КЭАЗ"
                },
                {
                    "id": "f9309eee-50c2-11e9-a20f-00155dfa1116",
                    "vendor_code": "236513",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА КЭАЗ (Курский электроаппаратный завод) Optima",
                    "type": null,
                    "competitor_name": "КЭАЗ"
                },
                {
                    "id": "f9309eef-50c2-11e9-a20f-00155dfa1116",
                    "vendor_code": "249245",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 10кА КЭАЗ (Курский электроаппаратный завод)",
                    "type": null,
                    "competitor_name": "КЭАЗ"
                },
                {
                    "id": "f9309ef0-50c2-11e9-a20f-00155dfa1116",
                    "vendor_code": "253171",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 4.5кА КЭАЗ (Курский электроаппаратный завод) _",
                    "type": null,
                    "competitor_name": "КЭАЗ"
                },
                {
                    "id": "f9309ef1-50c2-11e9-a20f-00155dfa1116",
                    "vendor_code": "260504",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 6кА КЭАЗ (Курский электроаппаратный завод)",
                    "type": null,
                    "competitor_name": "КЭАЗ"
                },
                {
                    "id": "4caa5a01-50c3-11e9-a20f-00155dfa1116",
                    "vendor_code": "Б0031713",
                    "name": "Автоматический выключатель (автомат) 1-полюсный (1P) 1А хар. C 4.5кА Эра",
                    "type": null,
                    "competitor_name": "Эра"
                },
                {
                    "id": "15b882b6-d54d-11e9-a215-00155dfa1116",
                    "vendor_code": "1C1UL",
                    "name": "АВ согласно UL489 и CSA-22.2 № 5-09, 1-пол., C, 1 А, 10 кА, 277/480 В AC, серия UL",
                    "type": null,
                    "competitor_name": "ABL SURSUM"
                },
                {
                    "id": "15b882b7-d54d-11e9-a215-00155dfa1116",
                    "vendor_code": "1C1UM",
                    "name": "Автоматический выключатель UL 1-полюсный, C, 1 А, 10 кА, 277/480 В AC",
                    "type": null,
                    "competitor_name": "ABL SURSUM"
                },
                {
                    "id": "15b882b8-d54d-11e9-a215-00155dfa1116",
                    "vendor_code": "C1T1",
                    "name": "Автоматический выключатель 1-полюсный, C, 1 А, 10 кА, 230/400 В AC, серия Т",
                    "type": null,
                    "competitor_name": "ABL SURSUM"
                },
                {
                    "id": "2fea57a3-f066-11eb-a21c-00155d007700",
                    "vendor_code": "mcb10-1-01C-av",
                    "name": "AV-10 1P  1A (C) 10kA EKF AVERES",
                    "type": null,
                    "competitor_name": "EKF"
                },
                {
                    "id": "3ae8cf6b-b89f-11e6-b9d9-000c29c6d5f2",
                    "vendor_code": "7000100",
                    "name": "ВА47-063, 1P, 1A, Icu-4,5kA, х-ка  С",
                    "type": null,
                    "competitor_name": "Контактор"
                },
                {
                    "id": "468aab80-b8a6-11e6-b9d9-000c29c6d5f2",
                    "vendor_code": "13.04.000068",
                    "name": "Автоматический выключатель HiBD63-S1 PMCS0000C 00001  1 полюс, 1А, ток к.з. 4.5kA, хар-ка C",
                    "type": null,
                    "competitor_name": "Hyundai"
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
          example: '7b3e9a3e-c218-11e2-abc0-005056b80040',
        },
        {
          attr: 'collapsed_parent_id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер группы элемента (номенклатуры)',
          example: '679e5922-c212-11e2-abc0-005056b80040',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mcb4763-1-01C-pro',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Полное наименование номенклатуры',
          example:
            'Автоматический выключатель 1P 1А (C) 4,5kA ВА 47-63 EKF PROxima',
        },
        {
          attr: 'short_name',
          type: 'Строка',
          description: 'Краткое наименование номенклатуры',
          example: 'Авт. выкл. 1P 1А (C) 4,5kA ВА 47-63 EKF',
        },
        {
          description:
            'Массив additional_products - доп.товары (при наличии параметра запроса additional)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '7f507201-3ccb-11e5-aa8a-005056b80040',
        },
        {
          attr: 'collapsed_parent_id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер группы элемента (номенклатуры)',
          example: '7b3e9a20-c218-11e2-abc0-005056b80040',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mdb-47-grey-pro',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Полное наименование номенклатуры',
          example: 'Кнопка модульная КМ-47 (серая) EKF PROxima',
        },
        {
          attr: 'short_name',
          type: 'Строка',
          description: 'Краткое наименование номенклатуры',
          example: 'Кнопка модульная КМ-47 (серая) EKF PROxima',
        },
        {
          description:
            'Массив ekf_analogs - аналоги EKF (при наличии параметра запроса ekf)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '3a5a1aaf-ef8f-11d8-8882-505054503030',
        },
        {
          attr: 'collapsed_parent_id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер группы элемента (номенклатуры)',
          example: 'ee655072-702f-11d9-b49c-505054503030',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул номенклатуры',
          example: 'mcb4763-1-01C',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Полное наименование номенклатуры',
          example: 'Автоматический выключатель ВА 47-63, 1P 1А (C) 4,5kA EKF',
        },
        {
          attr: 'short_name',
          type: 'Строка',
          description: 'Краткое наименование номенклатуры',
          example: 'ВА 47-63, 1P 1А (C) EKF',
        },
        {
          description:
            'Массив competitor_analogs - аналоги конкурентов (при наличии параметра запроса competitors)',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: 'e5e3a1dc-3970-11e7-80ca-0cc47a0cbffe',
        },
        {
          attr: 'vendor_code',
          type: 'Строка',
          description: 'Артикул номенклатуры конкурента',
          example: 'A9F74101',
        },
        {
          attr: 'name',
          type: 'Строка',
          description: 'Наименование номенклатуры конкурента',
          example: 'АВТ. ВЫКЛ.iC60N 1П 1A C',
        },
        {
          attr: 'type',
          type: 'Строка',
          description:
            'Тип аналога. Возможные значения: "Прямой", "Функциональный", "Не указан"',
          example: 'Функциональный',
        },
        {
          attr: 'competitor_name',
          type: 'Строка',
          description: 'Наименование конкурента',
          example: 'Schneider Electric',
        },
      ],
      tableParameters: [
        {
          description: 'Параметры фильтрации',
          header: true,
        },
        {
          attr: 'id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер элемента (номенклатуры)',
          example: '7b3e9a3e-c218-11e2-abc0-005056b80040',
        },
        {
          attr: 'group_id',
          type: 'Строка',
          description:
            'Уникальный идентификационный номер группы элемента (номенклатуры)',
          example: '679e5922-c212-11e2-abc0-005056b80040',
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
        {
          description:
            'Параметры для выборки нужных данных (обязательно наличие хотя бы одного параметра)',
          header: true,
        },
        {
          attr: 'additional',
          type: 'Boolean',
          description:
            'При наличии в запросе флага - в ответе будет присутствовать поле additional_products с массивом доп.товаров',
          example: '/product-analogs?additional',
        },
        {
          attr: 'ekf',
          type: 'Boolean',
          description:
            'При наличии в запросе флага - в ответе будет присутствовать поле ekf_analogs с массивом аналогов EKF',
          example: '/product-analogs?ekf',
        },
        {
          attr: 'competitors',
          type: 'Boolean',
          description:
            'При наличии в запросе флага - в ответе будет присутствовать поле competitor_analogs с массивом аналогов конкурентов',
          example: '/product-analogs?competitors',
        },
      ],
      /* eslint-disable */
      examples: [
        {
          key: 'php',
          title: 'PHP',
          text: `$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://ekfgroup.com/api/v1/ekf/catalog/product-analogs?vendor_code=mcb4763-1-01C-pro&additional&ekf&competitors",
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

url = "https://ekfgroup.com/api/v1/ekf/catalog/product-analogs"

payload = {'vendor_code': 'mcb4763-1-01C-pro', 'additional': 'yes', 'ekf': 'yes', 'competitors': 'yes'}

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
          text: `var client = new RestClient("https://ekfgroup.com/api/v1/ekf/catalog/product-analogs?vendor_code=mcb4763-1-01C-pro&additional&ekf&competitors");
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
.url("https://ekfgroup.com/api/v1/ekf/catalog/product-analogs?vendor_code=mcb4763-1-01C-pro&additional&ekf&competitors")
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
"url": "https://ekfgroup.com/api/v1/ekf/catalog/product-analogs?vendor_code=mcb4763-1-01C-pro&additional&ekf&competitors",
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
