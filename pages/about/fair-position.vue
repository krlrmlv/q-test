<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <b-row align-v="center" class="mb-16 mb-md-32 mb-lg-64">
        <b-col cols="12" md="6">
          <b-row>
            <b-col cols="12" xl="8" class="d-none d-md-block mb-16">
              <img
                :alt="$t('about.fairPosition')"
                src="/images/logo-fair-position.jpg"
                class="img-fluid"
              />
            </b-col>
            <b-col cols="12">
              <p class="text-secondary" v-html="$t('intro.line1')" />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" md="6">
          <b-row align-v="center" no-gutters>
            <b-col cols="7" class="d-md-none">
              <img
                :alt="$t('about.fairPosition')"
                src="/images/logo-fair-position.jpg"
                class="img-fluid"
              />
            </b-col>
            <b-col cols="5" md="12">
              <picture>
                <source
                  srcset="/images/about/fair-position/hand-sm.jpg"
                  media="(max-width: 767px)"
                />
                <source srcset="/images/about/fair-position/hand.jpg" />
                <img
                  src="/images/about/fair-position/hand.jpg"
                  alt=""
                  class="img-fluid"
                  aria-hidden="true"
                />
              </picture>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <p class="text-lg-center mb-64 pb-lg-32">
        <span v-html="$t('intro.line2')" />
        <SeoLink href="https://www.fairp.ru/" target="_blank"
          >www.fairp.ru.</SeoLink
        >
      </p>
    </b-container>

    <section class="section-about bg-light">
      <b-container>
        <h2 v-html="$t('documentation.title')" />

        <SeoLink
          v-for="(document, index) in documents"
          :key="`document-${index}`"
          :href="$t(`documentation.${document}.file`)"
          target="_blank"
          class="d-flex align-items-center text-reset text-hover-primary mb-16"
        >
          <span class="align-self-start text-primary mr-8">
            <svg-icon
              name="file/pdf-24"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </span>
          <span v-html="$t(`documentation.${document}.title`)" />
        </SeoLink>
      </b-container>
    </section>

    <b-container tag="section" class="section-about">
      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9 shadow">
            <img
              :alt="$t('fightingCorruption.title')"
              src="/images/about/fair-position/anticorruption.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h2 v-html="$t('fightingCorruption.title')" />
          <p class="mb-lg-32" v-html="$t('fightingCorruption.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('fairCompetition.title')"
              src="/images/about/fair-position/competition.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h2 v-html="$t('fairCompetition.title')" />
          <p class="mb-lg-32" v-html="$t('fairCompetition.description')" />
        </b-col>
      </b-row>

      <b-row class="mb-n16">
        <b-col lg="6" class="mb-16">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('complianceControl.title')"
              src="/images/about/fair-position/quality.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 pl-xl-64">
          <h2 v-html="$t('complianceControl.title')" />
          <p class="mb-lg-32" v-html="$t('complianceControl.description')" />
        </b-col>
      </b-row>
    </b-container>

    <!-- <section class="section-about bg-light">
      <b-container>
        <h2 class="mb-32 mb-lg-64" v-html="$t('withUs')" />

        <b-row
          align-v="center"
          class="justify-content-center mx-xl-n48 mb-n32 mb-lg-n64"
        >
          <b-col
            v-for="(partner, index) in partners"
            :key="`partner-${index}`"
            :class="{ 'text-right': index % 2 }"
            cols="6"
            sm="4"
            md="auto"
            class="text-sm-center mb-32 mb-lg-64 px-xl-48"
          >
            <img
              :alt="partner"
              :src="`/images/about/fair-position/partners/${partner}.png`"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'about.fairPosition', active: true }],
      documents: ['measures', 'recommendations', 'memo'],
      partners: [
        'etm',
        'avselectro',
        'elevel',
        'rs',
        'promsvet',
        'minimax',
        'electrocomplect',
        'forumelectro',
        'elektromir',
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

<i18n>
{
  "en": {
    "complianceControl": {
      "description": "The&nbsp;serious problem of&nbsp;the&nbsp;market is&nbsp;the&nbsp;intentional distortion of&nbsp;characteristics in&nbsp;the&nbsp;technical documentation of&nbsp;electrical products and&nbsp;their inconsistency with&nbsp;the&nbsp;stated qualities. We are confident that this problem needs to&nbsp;be solved, and&nbsp;already engaged in&nbsp;this.",
      "title": "Compliance control"
    },
    "documentation": {
      "measures": {
        "file": "https://798af696-0619-4730-b746-af58ebd39521.filesusr.com/ugd/825a4d_9fde22171a1d4217a2544ca573a4f1c1.pdf",
        "title": "Measures to&nbsp;prevent corruption and&nbsp;recommendations for&nbsp;assessing corruption risks"
      },
      "memo": {
        "file": "https://798af696-0619-4730-b746-af58ebd39521.filesusr.com/ugd/825a4d_ab98859771dc447993af98a9435e5493.pdf",
        "title": "Memo. Fastening the&nbsp;responsibilities of&nbsp;employees of&nbsp;the&nbsp;organization related to&nbsp;the&nbsp;prevention of&nbsp;corruption, responsibility and&nbsp;stimulation"
      },
      "recommendations": {
        "file": "https://798af696-0619-4730-b746-af58ebd39521.filesusr.com/ugd/825a4d_9c8fd7120271443eb7b5787ec95e2d6d.pdf",
        "title": "Methodical recommendations for&nbsp;the&nbsp;development and&nbsp;adoption by&nbsp;organizations of&nbsp;measures to&nbsp;prevent and&nbsp;combat corruption"
      },
      "title": "Documentation"
    },
    "fairCompetition": {
      "description": "Work on&nbsp;the&nbsp;norms and&nbsp;rules of&nbsp;business generally accepted in&nbsp;the&nbsp;Russian and&nbsp;world practice, following the&nbsp;legislation creates a&nbsp;favorable environment for&nbsp;conscientious market participants and&nbsp;satisfies customer requests. We speak for&nbsp;fair and&nbsp;transparent business.",
      "title": "Fair competition"
    },
    "fightingCorruption": {
      "description": "Corruption schemes in&nbsp;doing business provide advantage to&nbsp;the&nbsp;unscrupulous market participants. We want to&nbsp;create favorable conditions for&nbsp;all sides and&nbsp;eliminate the&nbsp;use of&nbsp;illegal motivation methods in&nbsp;the&nbsp;electrical industry.",
      "title": "Fighting corruption"
    },
    "intro": {
      "line1": "We support anti-corruption policies to&nbsp;ensure the&nbsp;transparent work of&nbsp;the&nbsp;electrical production market",
      "line2": "We are an&nbsp;active participant in&nbsp;the&nbsp;&laquo;Fair Position&raquo; Association and&nbsp;control the&nbsp;quality of&nbsp;electrical products. We want the&nbsp;consumer to&nbsp;have access to&nbsp;modern electrical equipment without fakes, so that there are no&nbsp;unfair competition in&nbsp;the&nbsp;market, and&nbsp;therefore we put our efforts and&nbsp;invest resources to&nbsp;the&nbsp;projects of&nbsp;the&nbsp;Association. We pay special attention to&nbsp;opposition to&nbsp;the&nbsp;illegal turnover of&nbsp;imported electrical products in&nbsp;the&nbsp;market of&nbsp;the&nbsp;Russian Federation.<br /> Join our fair position at"
    },
    "pageTitle": "Fair position — EKF",
    "withUs": "Already with us"
  },
  "ru": {
    "complianceControl": {
      "description": "Серьезная проблема рынка&nbsp;– намеренное искажение характеристик в&nbsp;технической документации электротехнических изделий и&nbsp;их несоответствие заявленным качествам. Мы уверены, что эту проблему необходимо решать, и&nbsp;уже занялись этим.",
      "title": "Контроль соответствия"
    },
    "documentation": {
      "measures": {
        "file": "https://798af696-0619-4730-b746-af58ebd39521.filesusr.com/ugd/825a4d_9fde22171a1d4217a2544ca573a4f1c1.pdf",
        "title": "Меры по&nbsp;предупреждению коррупции и&nbsp;рекомендации по&nbsp;оценке коррупционных рисков"
      },
      "memo": {
        "file": "https://798af696-0619-4730-b746-af58ebd39521.filesusr.com/ugd/825a4d_ab98859771dc447993af98a9435e5493.pdf",
        "title": "Памятка. Закрепление обязанностей работников организации, связанных с&nbsp;предупреждением коррупции, ответственность и&nbsp;стимулирование"
      },
      "recommendations": {
        "file": "https://798af696-0619-4730-b746-af58ebd39521.filesusr.com/ugd/825a4d_9c8fd7120271443eb7b5787ec95e2d6d.pdf",
        "title": "Методические рекомендации по&nbsp;разработке и&nbsp;принятию организациями мер по&nbsp;предупреждению и&nbsp;противодействию коррупции"
      },
      "title": "Документация"
    },
    "fairCompetition": {
      "description": "Работа по&nbsp;общепринятым в&nbsp;российской и&nbsp;мировой практике нормам и&nbsp;правилам ведения бизнеса, следование законодательству создает благоприятную среду для&nbsp;добросовестных участников рынка и&nbsp;удовлетворяет запросы покупателей. Мы выступаем за&nbsp;честное и&nbsp;прозрачное ведение бизнеса.",
      "title": "Честная конкуренция"
    },
    "fightingCorruption": {
      "description": "Коррупционные схемы в&nbsp;ведении бизнеса дают преимущества недобросовестным участникам рынка. Мы хотим создать благоприятные условия для&nbsp;всех сторон и&nbsp;исключить использование незаконных методов мотивации в&nbsp;электротехнической отрасли.",
      "title": "Борьба с&nbsp;коррупцией"
    },
    "intro": {
      "line1": "Мы поддерживаем антикоррупционную политику, чтобы обеспечить прозрачную работу рынка электротехнической продукции",
      "line2": "Мы являемся активным участником ассоциации &laquo;Честная позиция&raquo; и&nbsp;контролируем качество электротехнической продукции. Мы хотим, чтобы потребителю было доступно современное электрооборудование без&nbsp;подделок, чтобы на&nbsp;рынке не&nbsp;было недобросовестной конкуренции, и&nbsp;поэтому вкладываем силы и&nbsp;инвестируем ресурсы в&nbsp;проекты Ассоциации. Особое внимание мы уделяем противодействию незаконному обороту импортных электротехнических изделий на&nbsp;рынке Российской Федерации. Присоединяйтесь к&nbsp;нашей честной позиции"
    },
    "pageTitle": "Честная позиция — EKF",
    "withUs": "С нами уже"
  }
}
</i18n>
