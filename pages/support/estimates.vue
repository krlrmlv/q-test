<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('support.estimates.title') }}</h1>

      <p class="mb-32 mb-lg-64">
        {{ $t('support.estimates.description') }}
      </p>

      <b-row class="mb-8">
        <b-col
          v-for="(item, index) in items"
          :key="index"
          lg="6"
          class="mb-32 mb-lg-24"
        >
          <SeoLink
            :href="item.link"
            tag-name="div"
            target="_blank"
            rel="nofollow"
            class="card card-estimates"
          >
            <h4 class="card-header">
              {{ $t(`${item.key}.title`) }}
            </h4>

            <p class="card-body" v-html="$t(`${item.key}.description`)"></p>

            <div class="card-footer">
              {{ $t('goToSite') }}
              <span class="ml-8">
                <svg-icon
                  name="arrow-right-24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                />
              </span>
            </div>
          </SeoLink>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'support.estimates.title', active: true }],
      items: [
        {
          key: 'smetaRu',
          link: 'http://www.smeta.ru/static/1.html',
        },
        {
          key: 'babySmeta',
          link: 'https://www.smeta.ru/static/1_761.html',
        },
        {
          key: 'normocalculator',
          link: 'http://www.smeta.ru/static/1_762.html',
        },
        {
          key: 'turbo',
          link: 'http://www.data-basis.ru/products/turbo-smetchik',
        },
        {
          key: 'macro',
          link: 'http://www.data-basis.ru/products/macro-smetchik',
        },
        {
          key: 'object',
          link: 'http://www.data-basis.ru/products/object-smetchik',
        },
        {
          key: 'grand',
          link: 'http://www.grandsmeta.ru/pricelists',
        },
        {
          key: 'hector',
          link: 'http://www.gektorstroi.ru/products/price/',
        },
        {
          key: 'win',
          link: 'http://winsmeta.com/price/prog/',
        },
        {
          key: 'winNeo',
          link: 'http://winsmeta.com/price/prog/',
        },
        {
          key: 'rik',
          link: 'http://www.smetarik.ru/produkty-i-uslugi',
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<style lang="scss" scoped>
.card-estimates {
  min-height: 22rem;
  height: 100%;
  text-decoration: none;
  color: inherit;
  transition: $transition-base;
  transition-property: box-shadow;

  &:hover {
    text-decoration: none;
    box-shadow: $box-shadow;
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 2.5rem 2.5rem 0;
    background-color: transparent;
  }

  .card-body {
    margin: 0;
    padding: 1rem 2.5rem;
  }

  .card-footer {
    padding: 0 2.5rem 2.5rem;
    font-size: $font-size-3;
    font-weight: $font-weight-medium;
    color: $primary;
    background-color: transparent;
  }
}

@include media-breakpoint-down(md) {
  .card-estimates {
    min-height: 0;

    &:hover {
      box-shadow: none;
    }

    .card-header {
      padding: 0;
    }

    .card-body {
      padding: 1rem 0;
    }

    .card-footer {
      padding: 0;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "babySmeta": {
      "description": "The estimate program BabySMETA is&nbsp;a&nbsp;simplified version of&nbsp;the&nbsp;full-featured estimate program Smeta.RU. Equipped with&nbsp;the&nbsp;necessary set of&nbsp;functions and&nbsp;reporting forms, which are sufficient for&nbsp;maintaining and&nbsp;monitoring local and&nbsp;resource estimates, acts of&nbsp;work performed, KS-6, M-29. BabyСMETA is&nbsp;a&nbsp;budget product for&nbsp;small construction companies and&nbsp;individuals.",
      "title": "BabySMETA"
    },
    "goToSite": "Go to website",
    "grand": {
      "description": "Grand Smeta software complex allows you to&nbsp;fully automate the&nbsp;work associated with&nbsp;the&nbsp;release of&nbsp;design estimates for&nbsp;any types of&nbsp;work.<ul class='mb-0 pl-16'><li>Drawing up and&nbsp;checking of&nbsp;local estimates (forms N4, N5)</li><li>Accounting for&nbsp;the&nbsp;amount of&nbsp;work performed for&nbsp;month, for&nbsp;period with&nbsp;decomposition by&nbsp;positions and&nbsp;by&nbsp;materials (form 2B, KS-2, form KS-3, form M- 29, form KS-6)</li><li>Drawing up object estimates</li><li>Calculation of&nbsp;the&nbsp;need for&nbsp;materials</li><li>Working with&nbsp;normative base</li><li>Resource estimate, methods of&nbsp;calculating local estimates</li><li>Defect statement</li></ul",
      "title": "Grand Smeta"
    },
    "hector": {
      "description": "Hector software package provides users with&nbsp;a&nbsp;unique tool for&nbsp;the&nbsp;development of&nbsp;necessary and&nbsp;mandatory documentation for&nbsp;construction: construction organization design, work production design, flow charts. For&nbsp;each type of&nbsp;construction, a&nbsp;full set of&nbsp;documents being developed, their sections and&nbsp;individual tasks are given, for&nbsp;each task basic regulatory documents and&nbsp;methods for&nbsp;developing design solutions, examples of&nbsp;approved design solutions are given. Experienced designers are actively involved in&nbsp;the&nbsp;development and&nbsp;continuous improvement of&nbsp;the&nbsp;product.",
      "title": "Hector: Construction Designer"
    },
    "macro": {
      "description": "&laquo;MACRO Estimatorrlaquo; is&nbsp;a&nbsp;program that creates estimates based on&nbsp;the&nbsp;estimate and&nbsp;regulatory framework. It provides the&nbsp;user with:<ul class='mb-0 pl-16'><li>an intuitive interface;</li><li>standard controls;</li><li>printing of ready-made estimates and acts through &laquo;TURBO Estimator&raquo;;</li><li>export of ready-made estimates and acts to TURBO Estimator;</li><li>printing of a technological statement of the production of works.</li></ul>",
      "title": "MACRO estimator"
    },
    "normocalculator": {
      "description": "&laquo;Standard calculator&raquo; is&nbsp;a&nbsp;specialized tool for&nbsp;creating estimate and&nbsp;regulatory bases. It has the&nbsp;ability to&nbsp;import documentation from&nbsp;various software systems. Carries out a&nbsp;quick binding to&nbsp;territorial conditions, provides a&nbsp;high degree of&nbsp;automation for&nbsp;developers of&nbsp;regulatory frameworks. It is used by&nbsp;developers of&nbsp;estimates and&nbsp;regulatory bases, regional pricing centers in&nbsp;construction and&nbsp;other specialized organizations.",
      "title": "Standard calculator"
    },
    "object": {
      "description": "The &laquo;OBJECT Estimator&raquo; program is intended for&nbsp;drawing up object and&nbsp;summary estimates and&nbsp;estimate calculations. In&nbsp;the&nbsp;&laquo;OBJECT Estimator&raquo; program, local estimates are combined into&nbsp;object and&nbsp;summary estimates by&nbsp;the&nbsp;methods of&nbsp;embedding or&nbsp;linking documents. When embedding a&nbsp;document in&nbsp;an&nbsp;object or&nbsp;summary estimate, all data from this document is exported in&nbsp;full, that is, the&nbsp;local estimate is embedded in&nbsp;the&nbsp;object or&nbsp;summary estimate as&nbsp;a&nbsp;whole. When linking documents from local estimates to&nbsp;object and&nbsp;summary estimates, only the&nbsp;data necessary for&nbsp;calculating these documents is exported.",
      "title": "OBJECT estimator"
    },
    "pageTitle": "Costing services — EKF",
    "rik": {
      "description": "The RIK software complex is designed for&nbsp;automated production of&nbsp;estimate documentation. The&nbsp;program works with&nbsp;the&nbsp;regulatory frameworks EPER 1984, SNiR 1991, MTSN 81-98, GESN 2001, TEP, FER, TSN, FSNB, new TSNB TER-2001. The&nbsp;main features of&nbsp;the&nbsp;program:<ul class='mb-0 pl-16'><li>Real-time visualization of endings: local estimates; resource estimate calculation; object estimate calculation; consolidated estimate calculation; production plan.</li><li>Export of output documents to Microsoft Word.</li><li>Export of output documents to Microsoft Excel.</li><li>Import of resource prices from Microsoft Excel.</li><li>Graphical presentation of data.</li><li>Voice input of the cipher and the volume of prices in the estimate.</li><li>Entering textual information into the estimate using a pen-scanner.</li><li>Data exchange with the programs &laquo;ALTIUS - Construction Management&raquo; and &laquo;Nemetschek Allplan&raquo;.</li><li>Possibility of multi-user work in a network archive under control of MS SQL, Oracle, Firebird DBMS.</li></ul>",
      "title": "RIK estimate"
    },
    "smetaRu": {
      "description": "Smeta.RU is&nbsp;a&nbsp;high-quality and&nbsp;versatile program for&nbsp;calculating estimates. It is intended for&nbsp;the&nbsp;preparation and&nbsp;verification of&nbsp;construction estimate documentation. Ideal for&nbsp;both large construction companies working with&nbsp;large amounts of&nbsp;estimate information, and&nbsp;for&nbsp;small contractors. The&nbsp;formula for&nbsp;the&nbsp;popularity of&nbsp;this program among Russian surveyors is simple: user-friendly interface + rich functionality + computing power.",
      "title": "Smeta.RU"
    },
    "turbo": {
      "description": "The program &laquo;TURBO Estimator&raquo; is intended for&nbsp;drawing up and&nbsp;checking local estimates, acts of&nbsp;work performed, compensation for&nbsp;the&nbsp;cost of&nbsp;resources, resource sheets, forms of&nbsp;writing off materials, cumulative sheets. From&nbsp;the&nbsp;variety of&nbsp;offers on&nbsp;the&nbsp;market of&nbsp;estimate software &laquo;TURBO Estimator&raquo;, they distinguish a&nbsp;convenient and&nbsp;simple interface, as&nbsp;well as&nbsp;a&nbsp;wide range of&nbsp;various functions and a&nbsp;number of&nbsp;unique capabilities:<ul class='mb-0 pl-16'><li>When working with estimate-normative bases</li><li>When working with documents</li><li>When checking estimate documentation</li><li>Ability to create parameterized estimate calculations-estimate macros</li></ul>",
      "title": "TURBO estimator"
    },
    "win": {
      "description": "WinSmeta is a&nbsp;cost estimate program that runs in&nbsp;the&nbsp;Windows environment. It is a&nbsp;multifunctional and&nbsp;very convenient tool for&nbsp;creating, calculating and&nbsp;checking estimate documentation in&nbsp;the&nbsp;construction industry.",
      "title": "WinSmeta"
    },
    "winNeo": {
      "description": "WinSmeta NEO is a&nbsp;modern universal software package that allows you to&nbsp;fully automate the&nbsp;workstation of&nbsp;an&nbsp;estimate engineer. A&nbsp;wide range of&nbsp;functional capabilities, ease of&nbsp;use and&nbsp;ease of&nbsp;training make the&nbsp;WinSmeta NEO software package one of&nbsp;the&nbsp;leaders in&nbsp;the&nbsp;market of&nbsp;costing programs. The&nbsp;main competitive advantages of&nbsp;the&nbsp;WinSmeta NEO software package are: wide functionality; convenience and&nbsp;ease of&nbsp;use; affordable cost; the&nbsp;ability to&nbsp;use both in&nbsp;large organizations and&nbsp;in&nbsp;medium and&nbsp;small enterprises; prompt and&nbsp;thoughtful technical support and&nbsp;advice from&nbsp;experienced specialists who will help you make the&nbsp;WinSmeta NEO estimate program your professional tool.",
      "title": "WinSmeta NEO"
    }
  },
  "ru": {
    "babySmeta": {
      "description": "Сметная программа BabyСМЕТА&nbsp;– это упрощённая версия полнофункциональной cметной программы Smeta.RU. Оснащена необходимым набором функций и&nbsp;форм отчетности, которых достаточно для&nbsp;ведения и&nbsp;контроля локальных и&nbsp;ресурсных сметных расчётов, актов выполненных работ, КС-6, М-29. BabyСМЕТА&nbsp;– это бюджетный продукт для&nbsp;небольших строительных организаций и&nbsp;физических лиц.",
      "title": "BabyСМЕТА"
    },
    "goToSite": "Перейти на сайт",
    "grand": {
      "description": "Программный комплекс &laquo;Гранд Смета&raquo; позволяет полностью автоматизировать работы, связанные с&nbsp;выпуском проектно-сметной документации на&nbsp;любые виды работ. <ul class='mb-0 pl-16'><li>Составление и&nbsp;проверка локальных смет (формы N4, N5)</li><li>Учет выполненных объемов работ за&nbsp;месяц, за&nbsp;период с&nbsp;разложением по&nbsp;позициям и&nbsp;по&nbsp;материалам (форма 2В, КС-2, форма КС-3, форма М-29, форма КС-6)</li><li>Составление объектных смет</li><li>Расчет потребности в&nbsp;материалах</li><li>Работа с&nbsp;нормативной базой</li><li>Ресурсная смета, методы расчета локальных смет</li><li>Дефектная ведомость</li></ul>",
      "title": "Гранд Смета"
    },
    "hector": {
      "description": "Программный комплекс &laquo;Гектор: Проектировщик-строитель&raquo; предоставляет пользователям уникальный инструмент для&nbsp;разработки необходимой и&nbsp;обязательной для&nbsp;строительства документации: проекта организации строительства, проекта производства работ, технологических карт. Для&nbsp;каждого вида строительства приведен полный набор разрабатываемых документов, их&nbsp;разделов и&nbsp;отдельных задач, по&nbsp;каждой задаче даются основополагающие нормативные документы и&nbsp;методики разработки проектных решений, примеры апробированных проектных решений. В&nbsp;разработке и&nbsp;постоянном совершенствовании продукта активно участвуют опытные проектировщики.",
      "title": "Гектор: Проектировщик-строитель"
    },
    "macro": {
      "description": "&laquo;МАКРО сметчик&raquo;&nbsp;– программа, создающая сметы на&nbsp;основе сметно-нормативной базы. Она предоставляет пользователю: интуитивно понятный интерфейс; стандартные элементы управления; печать готовых смет и&nbsp;актов через &laquo;ТУРБО Сметчик&raquo;; экспорт готовых смет и&nbsp;актов в&nbsp;&laquo;ТУРБО сметчик&raquo;; печать технологической ведомости производства работ.",
      "title": "МАКРО сметчик"
    },
    "normocalculator": {
      "description": "&laquo;Нормокалькулятор&raquo;&nbsp;– специализированный инструмент для&nbsp;создания сметно-нормативных баз. Обладает возможностью импорта документации из&nbsp;различных программных комплексов. Осуществляет быструю привязку к&nbsp;территориальным условиям, обеспечивает высокую степень автоматизации для&nbsp;разработчиков нормативных баз. Им пользуются разработчики сметно-нормативных баз, региональные центры ценообразования в&nbsp;строительстве и&nbsp;иные профильные организации.",
      "title": "Нормокалькулятор"
    },
    "object": {
      "description": "Программа &laquo;ОБЪЕКТНЫЙ сметчик&raquo; предназначена для&nbsp;составления объектных и&nbsp;сводных смет и&nbsp;сметных расчетов. В&nbsp;программе &laquo;ОБЪЕКТНЫЙ сметчик&raquo; объединение локальных смет в&nbsp;объектные и&nbsp;сводные сметы осуществляется методами внедрения или&nbsp;связывания документов. При&nbsp;внедрении документа в&nbsp;объектную или&nbsp;сводную смету все данные из&nbsp;этого документа экспортируются полностью, то&nbsp;есть локальная смета внедряется в&nbsp;объектную или&nbsp;сводную целиком. При&nbsp;связывании документов из&nbsp;локальных смет в&nbsp;объектные и&nbsp;сводные экспортируются только данные, необходимые для&nbsp;расчета этих документов.",
      "title": "ОБЪЕКТНЫЙ сметчик"
    },
    "pageTitle": "Сервисы для составления смет — EKF",
    "rik": {
      "description": "Программный комплекс РИК предназначен для&nbsp;автоматизированного выпуска сметной документации. Программа работает с&nbsp;нормативными базами ЕРЕР 1984, СНиР 1991, МТСН 81-98, ГЭСН 2001, ТЕР, ФЕР, ТСН, ФСНБ, новые ТСНБ ТЕР-2001. Основные особенности программы:<ul class='mb-0 pl-16'><li>Визуализация в&nbsp;реальном времени концовок: локальных смет; ресурсного сметного расчета; объектного сметного расчета; сводного сметного расчета; плана производства.</li><li>Экспорт выходных документов в&nbsp;Microsoft Word.</li><li>Экспорт выходных документов в&nbsp;Microsoft Excel.</li><li>Импорт цен ресурсов из&nbsp;Microsoft Excel.</li><li>Графическое представление данных.</li><li>Голосовой ввод шифра и&nbsp;объема расценок в&nbsp;смету.</li><li>Ввод текстовой информации в&nbsp;смету с&nbsp;помощью ручки-сканера.</li><li>Обмен данными с&nbsp;программами &laquo;АЛТИУС&nbsp;– Управление строительством&raquo; и&nbsp;&laquo;Nemetschek Allplan&raquo;.</li><li>Возможность многопользовательской работы в&nbsp;сетевом архиве под&nbsp;управлением СУБД MS SQL, Oracle, Firebird.</li></ul>",
      "title": "Смета РИК"
    },
    "smetaRu": {
      "description": "Smeta.RU&nbsp;– качественная и&nbsp;универсальная программа для&nbsp;расчета смет. Она предназначена для&nbsp;составления и&nbsp;проверки строительной сметной документации. Идеальна как&nbsp;для&nbsp;крупных строительных фирм, работающих с&nbsp;большими объёмами сметной информации, так&nbsp;и&nbsp;для&nbsp;небольших подрядных организаций. Формула популярности этой программы у&nbsp;сметчиков России проста: удобный интерфейс&nbsp;+ богатые функциональные возможности&nbsp;+ вычислительная мощь.",
      "title": "Smeta.RU"
    },
    "turbo": {
      "description": "Программа &laquo;ТУРБО сметчик&raquo; предназначена для&nbsp;составления и&nbsp;проверки локальных смет, актов выполненных работ, компенсации стоимости ресурсов, ресурсных ведомостей, форм списания материалов, накопительных ведомостей. Из&nbsp;многообразия предложений на&nbsp;рынке сметного программного обеспечения &laquo;ТУРБО сметчик&raquo; выделяют удобный и&nbsp;простой интерфейс, а&nbsp;также широкий набор разнообразных функций и&nbsp;ряд уникальных возможностей:<ul class='mb-0 pl-16'><li>При&nbsp;работе со&nbsp;сметно-нормативными базами</li><li>При&nbsp;работе с&nbsp;документами</li><li>При&nbsp;проверке сметной документации</li><li>Возможность создавать параметризованные сметные расчеты-сметные макросы</li></ul>",
      "title": "ТУРБО сметчик"
    },
    "win": {
      "description": "WinСмета&nbsp;– программа составления смет, работающая в&nbsp;среде Windows. Это многофункциональный и&nbsp;очень удобный инструмент для&nbsp;создания, расчёта и&nbsp;проверки сметной документации в&nbsp;строительной сфере.",
      "title": "WinСмета"
    },
    "winNeo": {
      "description": "WinСмета NEO&nbsp;– современный универсальный программный комплекс, позволяющий полностью автоматизировать рабочее место инженера-сметчика. Широкий набор функциональных возможностей, простота в&nbsp;работе и&nbsp;лёгкость в&nbsp;обучении делают программный комплекс WinСмета&nbsp;NEO одним из&nbsp;лидеров на&nbsp;рынке сметных программ. Основными конкурентными преимуществами программного комплекса WinСмета&nbsp;NEO можно назвать: широкие функциональные возможности; удобство и&nbsp;простота в&nbsp;использовании; доступная стоимость; возможность использования как&nbsp;в&nbsp;крупных организациях, так&nbsp;и&nbsp;в&nbsp;средних и&nbsp;малых предприятиях; оперативная и&nbsp;вдумчивая техническая поддержка и&nbsp;консультации опытных специалистов, которые помогут вам сделать сметную программу WinСмета&nbsp;NEO своим профессиональным инструментом.",
      "title": "WinСмета NEO"
    }
  }
}
</i18n>
