<template>
  <main class="page-landing-doorbells pb-32 pb-lg-64">
    <section class="section section-banner overflow-hidden">
      <b-container>
        <b-row align-v="center">
          <b-col md="6">
            <h1 class="text-uppercase mb-md-24 mb-lg-32 pb-xl-24">
              {{ $t('title') }}
            </h1>
            <p class="banner-lead d-none d-md-block">
              {{ $t('lead') }}
            </p>
            <b-button
              :to="localePath('/doorbells/ringtones')"
              variant="outline-white"
              class="d-none d-md-inline-flex"
            >
              {{ $t('downloadRingtones') }}
              <svg-icon
                name="note-24"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
          </b-col>
          <b-col md="6" lg="5" offset-lg="1">
            <div class="banner-image">
              <picture>
                <source
                  srcset="/images/doorbells/banner-sm.png"
                  media="(max-width: 991px)"
                />
                <source
                  srcset="/images/doorbells/banner-md.png"
                  media="(max-width: 1199px)"
                />
                <source srcset="/images/doorbells/banner.png" />
                <img :alt="$t('title')" src="/images/doorbells/banner.png" />
              </picture>
            </div>
            <b-button
              :to="localePath('/doorbells/ringtones')"
              variant="outline-white"
              class="d-md-none"
            >
              {{ $t('downloadRingtones') }}
              <svg-icon
                name="note-24"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-md-center text-uppercase">
          {{ $t('proxima.title') }}
        </h2>
        <p class="lead text-md-center mb-32 mb-xl-48">
          {{ $t('proxima.description') }}
        </p>
        <b-row class="text-center">
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-couple.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">{{ $t('proxima.benefits.code') }}</p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-distance.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">{{ $t('proxima.benefits.range') }}</p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-code.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">{{ $t('proxima.benefits.programmable') }}</p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-hand.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">
              {{ $t('proxima.benefits.falseTrigger') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-connection.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">
              {{ $t('proxima.benefits.multipleConnect') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-backup.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">
              {{ $t('proxima.benefits.spareButton') }}
            </p>
          </b-col>
        </b-row>
        <b-row align-v="center" class="flex-md-row-reverse">
          <b-col md="6" class="text-center">
            <b-img-lazy
              :alt="$t('proxima.dbbd001.title')"
              srcset="/images/doorbells/dbb001-sm.png 360w, /images/doorbells/dbb001.png 720w"
              src="/images/doorbells/dbb001.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" xl="5" offset-xl="1">
            <p class="mb-32 mb-lg-48">
              <strong class="fs-4">{{ $t('proxima.dbbd001.title') }}</strong>
              {{ $t('proxima.dbbd001.description') }}
            </p>
            <b-button :to="localePath(catalogLink)" variant="outline-white">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
        <b-row align-v="center" class="my-xl-n7">
          <b-col md="6" class="text-center">
            <b-img-lazy
              :alt="$t('proxima.dbsd003.title')"
              srcset="/images/doorbells/dbs003-sm.png 360w, /images/doorbells/dbs003.png 720w"
              src="/images/doorbells/dbs003.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" xl="5" offset-xl="1">
            <p class="mb-32 mb-lg-48">
              <strong class="fs-4">{{ $t('proxima.dbsd003.title') }}</strong>
              {{ $t('proxima.dbsd003.description') }}
            </p>
            <b-button :to="localePath(catalogLink)" variant="outline-white">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-md-center text-uppercase mb-32">
          {{ $t('basic.title') }}
        </h2>
        <p class="lead text-md-center mb-32 mb-xl-48">
          {{ $t('basic.description') }}
        </p>
        <b-row class="text-center">
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-star.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">
              {{ $t('basic.benefits.package') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-radius.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">
              {{ $t('basic.benefits.range') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4">
            <img
              src="/images/doorbells/benefit-setup.svg"
              width="80"
              class="mb-16"
              aria-hidden="true"
            />
            <p class="h5 mb-32">
              {{ $t('basic.benefits.quickInstallation') }}
            </p>
          </b-col>
        </b-row>
        <b-row align-v="center" class="flex-md-row-reverse">
          <b-col md="6" class="text-center">
            <b-img-lazy
              :alt="$t('basic.dbw001.title')"
              srcset="/images/doorbells/dbw001-sm.png 360w, /images/doorbells/dbw001.png 720w"
              src="/images/doorbells/dbw001.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" xl="5" offset-xl="1">
            <p class="mb-32 mb-lg-48">
              <strong class="fs-4">{{ $t('basic.dbw001.title') }}</strong>
              {{ $t('basic.dbw001.description') }}
            </p>
            <b-button :to="localePath(catalogLink)" variant="outline-white">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
        <b-row align-v="center" class="my-xl-n7">
          <b-col md="6" class="text-center">
            <b-img-lazy
              :alt="$t('basic.dbba003.title')"
              srcset="/images/doorbells/dbb003-sm.png 360w, /images/doorbells/dbb003.png 720w"
              src="/images/doorbells/dbb003.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" xl="5" offset-xl="1">
            <p class="mb-32 mb-lg-48">
              <strong class="fs-4">{{ $t('basic.dbba003.title') }}</strong>
              {{ $t('basic.dbba003.description') }}
            </p>
            <b-button :to="localePath(catalogLink)" variant="outline-white">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-md-center text-uppercase mb-32">
          {{ $t('button.title') }}
        </h2>
        <b-row align-v="center" class="flex-md-row-reverse">
          <b-col md="6" class="text-center">
            <b-img-lazy
              :alt="$t('button.title')"
              src="/images/doorbells/button.png"
              class="img-fluid"
            />
          </b-col>
          <b-col md="6" xl="5" offset-xl="1">
            <p>
              {{ $t('button.description.1') }}
            </p>
            <p class="mb-32">
              {{ $t('button.description.2') }}
            </p>
            <div class="mb-32">
              <b-img-lazy
                :alt="`${$t('button.description.2')}1`"
                src="/images/doorbells/button-scheme-1.png"
                class="img-fluid"
              />
            </div>
            <div class="mb-32">
              <b-img-lazy
                :alt="`${$t('button.description.2')}2`"
                src="/images/doorbells/button-scheme-2.png"
                class="img-fluid"
              />
            </div>
            <b-button :to="localePath(catalogLink)" variant="outline-white">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BImgLazy,
  },
  data() {
    return {
      catalogLink: '/catalog/zvonki-bytovye',
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  mounted() {
    sendToMindbox('EKFGroup.LandingView', {
      customerAction: {
        customFields: {
          LandingName: this.$t('pageTitle'),
        },
      },
    })
  },
}
</script>

<style lang="scss">
.page-landing-doorbells {
  color: $white;
  background-color: #cf1805;
  background-image: linear-gradient(
    180deg,
    #e66b3b,
    #f19759 800px,
    #f19759 1000px,
    #ce1301 2200px,
    #801308 3300px,
    #3a0702 5000px
  );

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      padding-top: 0;
      padding-bottom: 0;
      position: relative;
      z-index: 0;

      .banner-image {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        min-height: 420px;
        z-index: -1;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .section {
      &.section-banner {
        padding-top: 2rem;
        text-align: center;

        .banner-header {
          font-size: 2.5rem;
        }

        .banner-image {
          margin-top: -4rem;
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        .banner-header {
          margin-bottom: 1.5rem;
          font-size: 1.875rem;
        }

        .banner-lead {
          margin-bottom: 1.5rem;
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 3rem;
      padding-bottom: 3rem;

      &.section-banner {
        .banner-header {
          margin-bottom: 2rem;
          font-size: 2.25rem;
        }

        .banner-lead {
          margin-bottom: 2.5rem;
        }

        .banner-image {
          min-height: 565px;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      &.section-banner {
        .banner-header {
          margin-bottom: 3.5rem;
          font-size: 3.25rem;
        }

        .banner-lead {
          margin-bottom: 6rem;
          font-size: $font-size-4;
        }

        .banner-image {
          min-height: 780px;
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "basic": {
      "benefits": {
        "package": "Door bells are packed in bright blister packaging",
        "quickInstallation": "Quick installation",
        "range": "80 meters operating range"
      },
      "dbba003": {
        "description": "are analog wireless door bells in modern design. The bell in your hallway can also be an element of the interior – you can place the wireless bell receiver anywhere in the hallway or in the rooms. The universal stylish design will allow you to fit them into any interior – and the price of the products will pleasantly surprise you. It is enough to insert the batteries into the bell, place it in the apartment, and stick the button on the double-sided tape at the entrance at your door (tape and battery for the button are included).",
        "title": "DBB-A-003 and DBB-A-002"
      },
      "dbw001": {
        "description": "is a low budget solution for the housing and utilities sector. This is a wired door bell, the signal is transmitted through a wire (included). To install the product, it is necessary to lay the cord from the button into a pre-prepared hole in the wall between the entrance and the apartment. The door bell is powered by batteries.",
        "title": "DBW-001"
      },
      "description": "The EKF Basic line of door bells includes wired and wireless economy class products. The main advantages of these door bells are attractive appearance and affordable price. Wireless products use standard radio frequencies to transmit a signal from a button to a receiver, so they are programmed at the factory to a specific frequency for the life of the product.",
      "title": "EKF Basic analog door bells"
    },
    "button": {
      "description": {
        "1": "Often, when using wireless door bells, we are faced with the fact that the button is lost or damaged. In this case, you had to buy the product again – both the button and the receiver. With EKF digital door bells, everything is now much easier – we are pleased to offer you an additional programmable button DB-T-01.",
        "2": "It is enough to carry out a number of manipulations – according to the instructions, they will take no more than 30 seconds – and your old door bell is paired and will work with the new button. This feature allows you to implement several convenient device pairing schemes:"
      },
      "title": "Programmable door bell button",
      "scheme": "Door bell button connection diagram #"
    },
    "downloadRingtones": "Download ringtones",
    "lead": "The door bell is an indispensable part of your interior, the first thing that guests encounter at the doorstep of your house. It is the pleasant ringtone that notifies the owners of their arrival. Therefore, it is so important that the bell is equipped with a convenient modern control. Find out more about EKF door bells.",
    "pageTitle": "EKF Proxima doorbells. Wireless and wired doorbells from the manufacturer",
    "proxima": {
      "benefits": {
        "code": "A unique code to pair a button with door bell",
        "falseTrigger": "False triggering from buttons not connected to the door bell is not possible",
        "multipleConnect": "Ability to pair up to 4 buttons to one door bell and vice versa",
        "programmable": "User programmable",
        "range": "Long range",
        "spareButton": "An additional spare button is included, which is much cheaper than the kit"
      },
      "dbbd001": {
        "description": "differ only in design, both door bells have a pleasant 4-tone signal, 20 melody variations, three-stage volume control. The product runs on 3 AAA batteries and can be located anywhere within the coverage area of the button – on the shelf in the hallway, in the kitchen, on the windowsill in the room – wherever it is convenient for you. The button on double tape can be quickly and conveniently placed in the entrance or on the gates of your house / summer cottage – after all, the button of this series is protected from splashing water and has a degree of protection IP44.",
        "title": "DBB-D-001 and DBB-D-002"
      },
      "dbsd003": {
        "description": "has a distinctive feature – this door bell does not require batteries for its operation – the product has a standard electrical plug and can be plugged into any outlet. You can move the bell around the apartment as you want – all you need is an electrical outlet in the accessibility zone. And if you do not want to be disturbed, you just need to unplug the door bell from the socket.",
        "title": "DBS-D-003"
      },
      "description": "The EKF PROxima series of wireless door bells consists of digital devices that exchange a unique digital code with each other. Thus, the situation is excluded when your call will be triggered by other buttons operating at the same frequency, as is the case with analog calls. Digital technology has at its disposal more than a million combinations of a unique code through which devices communicate with each other. The button-receiver communication is learnable and allows you to create combinations of several buttons – one receiver and vice versa.",
      "title": "EKF Proxima digital door bells"
    },
    "title": "Door Bells"
  },
  "ru": {
    "basic": {
      "benefits": {
        "package": "Звонки упакованы в яркую блистерную упаковку",
        "quickInstallation": "Быстрая установка",
        "range": "Радиус действия 80 метров"
      },
      "dbba003": {
        "description": "– аналоговые беспроводные звонки в новом актуальном дизайне. Звонок в Вашей прихожей также может являться элементом интерьера – приемник беспроводного звонка Вы можете расположить в любом месте прихожей или в комнатах. Универсальный стильный дизайн позволит вписать их в любой интерьер – а цена изделий Вас приятно удивит. В звонок достаточно вставить батарейки, расположить его в квартире, а кнопку приклеить на двусторонний скотч в подъезде у Вашей двери (скотч и батарейка для кнопки – в комплекте).",
        "title": "DBB-A-003 и DBB-A-002"
      },
      "dbw001": {
        "description": "– бюджетное решение для сектора ЖКХ. Это проводной звонок, передача сигнала в нем идет посредством провода (в комплекте). Для монтажа изделия необходимо заложить шнур от кнопки в заранее подготовленное отверстие в стене между подъездом и квартирой. Работает звонок от батареек.",
        "title": "DBW-001"
      },
      "description": "Линейка звонков EKF Basic включает в себя проводные и беспроводные изделия эконом-класса. Основные преимущества данных звонков – это привлекательный внешний вид и доступная цена. Беспроводные изделия используют передачу сигнала от кнопки на приемник по стандартным радиочастотам, поэтому программируются на фабрике на определенную частоту на весь срок службы изделия.",
      "title": "Звонки EKF Basic (аналоговые)"
    },
    "button": {
      "description": {
        "1": "Часто в использовании беспроводных звонков мы сталкиваемся с тем, что кнопка утеряна или испорчена. В таком случае, приходилось покупать изделие снова – и кнопку, и приемник. С цифровыми звонками EKF теперь все намного проще – мы рады предложить вам дополнительную программируемую кнопку DB-T-01.",
        "2": "Достаточно провести ряд манипуляций – по инструкции они займут не более 30 секунд – и ваш старый звонок спарен и будет работать с новой кнопкой. Эта особенность позволяет реализовать несколько удобных схем сопряжения устройств:"
      },
      "title": "Программируемая кнопка звонка",
      "scheme": "Схема подключения кнопки звонка №"
    },
    "downloadRingtones": "Скачать мелодии",
    "lead": "Звонок – незаменимая деталь вашего интерьера, первое с чем сталкиваются гости у порога вашего дома. Именно приятная мелодия звонка оповещает хозяев об их прибытии. Поэтому так важно, чтобы звонок был оснащен удобным современным управлением. Узнайте подробнее о всех возможностях звонков EKF.",
    "pageTitle": "Дверные звонки EKF Proxima. Беспроводные и проводные бытовые звонки от производителя",
    "proxima": {
      "benefits": {
        "code": "Уникальный код образует пару кнопка-звонок",
        "falseTrigger": "Исключено ложное срабатывание от других, не привязанных к звонку кнопок",
        "multipleConnect": "Возможность программировать до 4 кнопок на звонок и наоборот",
        "programmable": "Программирование возможно пользователем",
        "range": "Высокая дальность действия",
        "spareButton": "Доступна дополнительная (запасная) кнопка, которая намного дешевле комплекта"
      },
      "dbbd001": {
        "description": "отличаются лишь дизайном, оба звонка имеют приятный 4-тоновый сигнал, 20 вариаций мелодий, трехступенчатую регулировку по уровню громкости. Изделие работает от 3 батареек ААА, может быть расположено где угодно в пределах зоны покрытия кнопки – на полке в прихожей, на кухне, на подоконнике в комнате – там, где удобно Вам. Кнопку на двойном скотче быстро и удобно можно расположить в подъезде или на воротах Вашего дома/дачи – ведь кнопка этой серии защищена от брызг воды и имеет степень защиты IP44.",
        "title": "DBB-D-001 и DBB-D-002"
      },
      "dbsd003": {
        "description": "имеет отличительную особенность – этот звонок не требует батареек питания для свой работы – изделие имеет стандартную электрическую вилку и может быть подключено в любой розетке. Вы можете перемещать звонок по квартире как хотите – главное, чтобы в зоне доступности была электрическая розетка. А если Вы не хотите, чтобы Вас беспокоили – достаточно просто убрать звонок из розетки.",
        "title": "DBS-D-003"
      },
      "description": "Серия беспроводных звонков EKF PROxima состоит из цифровых устройств, которые обмениваются между собой уникальным цифровым кодом. Таким образом, исключается ситуация, когда Ваш звонок будет срабатывать от других кнопок, работающих на одинаковой частоте, как в случае с аналоговыми звонками. Цифровая технология имеет в своем распоряжении более миллиона комбинаций уникального кода, посредством которого устройства связываются между собой. Связь кнопка-приемник является обучаемой и позволяет создавать комбинации из нескольких кнопок – одного приемника и наоборот.",
      "title": "Звонки EKF Proxima (цифровые)"
    },
    "title": "Бытовые звонки"
  }
}
</i18n>
