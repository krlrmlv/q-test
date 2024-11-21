<template>
  <main class="page-landing-epro">
    <section class="section section-dark section-banner">
      <b-container>
        <b-row>
          <b-col md="6" lg="5" xl="4">
            <h1 class="fs-3 fs-lg-4 font-weight-normal text-primary mb-24">
              <span class="d-block mb-24">{{ $t('remoteController') }}</span>
              <img
                src="/images/epro/epro24landing.svg"
                width="300"
                alt="ePro 24"
              />
            </h1>
            <h2 class="h4">{{ $t('tagline') }}</h2>
          </b-col>
          <b-col md="6" lg="7" xl="8" class="text-center">
            <img
              srcset="
                /images/epro/banner-sm.jpg 360w,
                /images/epro/banner.jpg    760w
              "
              src="/images/epro/banner.jpg"
              sizes="(max-width: 767px) 360px, 760px"
              class="img-fluid"
              aria-hidden="true"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col md="6" lg="5" xl="4" order-md="2" class="mb-32 mb-md-0">
            <h2 class="h4 mb-24">{{ $t('tagline') }}</h2>
            <p>{{ $t('intro.p1') }}</p>
            <p>{{ $t('intro.p2') }}</p>
            <p class="mb-24">{{ $t('intro.p3') }}</p>
            <SeoLink
              href="https://epro.ekfgroup.com/"
              target="_blank"
              class="btn btn-secondary"
            >
              {{ $t('webApp') }}
            </SeoLink>
          </b-col>
          <b-col md="6" lg="7" xl="8" order-md="1">
            <img
              srcset="
                /images/epro/ekf-cloud-sm.jpg 360w,
                /images/epro/ekf-cloud.jpg    654w
              "
              src="/images/epro/ekf-cloud.jpg"
              sizes="(max-width: 767px) 360px, 654px"
              class="img-fluid"
              alt="ePRO 24"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-dark">
      <b-container>
        <b-row>
          <b-col xl="10" offset-xl="1">
            <h2 class="h4 mb-24">{{ $t('controller.title') }}</h2>
            <ul class="list-unstyled mb-32">
              <li class="mb-8">{{ $t('controller.usage.1') }}</li>
              <li class="mb-8">{{ $t('controller.usage.2') }}</li>
              <li class="mb-8">{{ $t('controller.usage.3') }}</li>
            </ul>
            <div class="text-center text-md-left mb-24">
              <b-img-lazy
                :alt="`${$t('controller.title')} ePRO 24`"
                :srcset="`/images/epro/controller-sm.jpg 360w, /images/epro/${$t(
                  'controller.image'
                )} 852w`"
                :src="`/images/epro/${$t('controller.image')}`"
                sizes="(max-width: 767px) 360px, 852px"
                class="img-fluid"
              />
            </div>
            <ul class="list-unstyled d-md-none">
              <li>
                <b-img-lazy
                  src="/images/epro/logo-modbus.png"
                  width="80"
                  alt="Modbus"
                />
              </li>
              <li>{{ $t('controller.features.power') }}</li>
              <li>{{ $t('controller.features.usb') }}</li>
              <li>{{ $t('controller.features.wifi') }}</li>
              <li>{{ $t('controller.features.sim') }}</li>
              <li>{{ $t('controller.features.expansion') }}</li>
              <li>{{ $t('controller.features.inputs') }}</li>
              <li>{{ $t('controller.features.case') }}</li>
              <li>{{ $t('controller.features.led') }}</li>
              <li>{{ $t('controller.features.outputs') }}</li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-getting-started">
      <b-container>
        <h2 class="h4 mb-32">{{ $t('getStarted.title') }}</h2>
        <b-row>
          <b-col v-for="index in 6" :key="`step-${index}`" md="6" lg="4">
            <div class="step">
              <span class="step-index">{{ index }}</span>
              <p>
                {{ $t(`getStarted.steps.${index}`) }}
                <b-link
                  v-if="index === 1"
                  :to="localePath('/calculators/mastertool/smart-box')"
                  target="_blank"
                  class="text-reset text-underline"
                >
                  Smart-BOX
                </b-link>
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-dark section-manual">
      <b-container>
        <h2 class="h4 mb-32">{{ $t('manual.title') }}</h2>
        <b-row
          v-for="(step, stepIndex) in steps"
          :key="`step-${stepIndex}`"
          class="manual-step"
        >
          <b-col md="7" lg="4">
            <ol class="list-unstyled">
              <li
                v-for="index in step.paragraphs"
                :key="`p-${stepIndex}-${index}`"
              >
                {{ $t(`manual.steps.${stepIndex + 1}.${index}`) }}
                <SeoLink
                  v-if="stepIndex === 0 && index === 1"
                  href="https://epro.ekfgroup.com"
                  target="_blank"
                  class="text-reset text-underline"
                  >https://epro.ekfgroup.com.</SeoLink
                >
              </li>
            </ol>
          </b-col>
          <b-col md="5" lg="3" xl="2" class="align-self-xl-center">
            <div class="manual-image manual-image-mobile">
              <b-img-lazy
                :alt="`${$t('manual.title')}, ${$t('manual.step')} ${
                  stepIndex + 1
                }`"
                :src="`/images/epro/manual-${stepIndex + 1}-mobile.jpg`"
                class="img-fluid"
              />
            </div>
          </b-col>
          <b-col lg="4" xl="6" class="d-none d-lg-block">
            <div class="manual-image manual-image-desktop">
              <b-img-lazy
                :alt="`${$t('manual.title')}, ${$t('manual.step')} ${
                  stepIndex + 1
                }`"
                :src="`/images/epro/manual-${stepIndex + 1}-desktop.jpg`"
                class="img-fluid"
              />
            </div>
          </b-col>
          <span class="step-index">
            {{ $t('manual.step') }} {{ stepIndex + 1 }}
          </span>
        </b-row>
        <b-row class="manual-legend">
          <b-col md="4" lg="3">
            <div class="legend-item">
              <span class="legend-icon" aria-hidden="true">
                <svg-icon name="epro/toggle-16" width="24" height="24" />
              </span>
              {{ $t('manual.control.title') }}
            </div>
          </b-col>
          <b-col md="8" lg="9" xl="7">
            <div class="legend-definition">
              {{ $t('manual.control.before') }}
              <span class="legend-icon" aria-hidden="true">
                <svg-icon name="epro/toggle-16" width="16" height="16" />
              </span>
              <span class="sr-only">{{ $t('manual.control.title') }}</span>
              {{ $t('manual.control.after') }}
            </div>
          </b-col>
        </b-row>
        <b-row class="manual-legend">
          <b-col md="4" lg="3">
            <div class="legend-item">
              <span class="legend-icon" aria-hidden="true">
                <svg-icon name="epro/monitor-16" width="24" height="24" />
              </span>
              {{ $t('manual.monitoring.title') }}
            </div>
          </b-col>
          <b-col md="8" lg="9" xl="7">
            <div class="legend-definition">
              {{ $t('manual.monitoring.before') }}
              <span class="legend-icon" aria-hidden="true">
                <svg-icon name="epro/monitor-16" width="16" height="16" />
              </span>
              <span class="sr-only">{{ $t('manual.monitoring.title') }}</span>
              {{ $t('manual.monitoring.after') }}
            </div>
          </b-col>
        </b-row>
        <ul class="list-unstyled d-md-none">
          <li>
            <b-img-lazy
              :alt="$t('manual.legend.edit.alt')"
              src="/images/epro/legend-edit.png"
              class="img-fluid mb-4"
            />
            <p class="mb-24">{{ $t('manual.legend.edit.text') }}</p>
          </li>
          <li>
            <b-img-lazy
              :alt="$t('manual.legend.input.alt')"
              src="/images/epro/legend-ctrl-number.png"
              class="img-fluid mb-4"
            />
            <p class="mb-24">{{ $t('manual.legend.input.text') }}</p>
          </li>
          <li>
            <b-img-lazy
              :alt="$t('manual.legend.loading.alt')"
              src="/images/epro/legend-indicator.png"
              class="img-fluid mb-4"
            />
            <p class="mb-24">{{ $t('manual.legend.loading.text') }}</p>
          </li>
          <li>
            <b-img-lazy
              :alt="$t('manual.legend.time.alt')"
              src="/images/epro/legend-time.png"
              class="img-fluid mb-4"
            />
            <p class="mb-24">{{ $t('manual.legend.time.text') }}</p>
          </li>
          <li>
            <b-img-lazy
              src="/images/epro/legend-sm.png"
              class="img-fluid mb-24"
              aria-hidden="true"
            />
          </li>
        </ul>
        <div class="d-none d-md-block py-xl-6">
          <b-img-lazy
            :alt="$t('manual.legend.title')"
            :src="`/images/epro/${$t('manual.legend.image')}`"
            class="img-fluid"
          />
        </div>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'
export default {
  components: {
    BImgLazy,
  },
  data() {
    return {
      steps: [{ paragraphs: 4 }, { paragraphs: 4 }, { paragraphs: 8 }],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<style lang="scss">
.page-landing-epro {
  line-height: 1.2;

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-dark {
      color: $white;
      background-color: #1b2026;
    }

    &.section-banner {
      padding-top: 3rem;
      padding-bottom: 4.5rem;
      text-align: center;

      .banner-header {
        margin-bottom: 1.5rem;
        font-size: $font-size-3;
        color: $primary-light;
      }
    }

    &.section-getting-started {
      .step {
        display: flex;
        align-items: center;
      }

      .step-index {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        align-self: flex-start;
        justify-content: center;
        position: relative;
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
        font-size: 1.5rem;
        font-weight: $font-weight-medium;
        line-height: 1;
        text-align: center;
        border-radius: $rounded-pill;
        border: 2px solid $gray-200;
        color: $white;
        background-color: $gray-100;
        overflow: hidden;
        z-index: 0;

        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0.25rem;
          right: 0.25rem;
          top: 0.25rem;
          bottom: 0.25rem;
          border-radius: $rounded-pill;
          background-color: #2a74cc;
          background-image: linear-gradient(to top, #507cee, #580350);
          box-shadow: 0 0.1875rem 0.375rem rgba($black, 0.25);
          z-index: -1;
        }
      }
    }

    &.section-manual {
      .manual-step {
        position: relative;
        padding-top: 6rem;

        ol {
          margin-bottom: 2.5rem;

          & > li {
            margin-bottom: 1.25rem;
          }
        }

        .step-index {
          display: block;
          position: absolute;
          left: 3.5rem;
          right: 0;
          top: 2rem;
          padding: 0 0 0.75rem 2rem;
          font-size: $font-size-2;
          letter-spacing: 0.3em;
          border-bottom: 1px solid #936dc0;
          color: #e79cff;

          &::before {
            display: block;
            content: '';
            position: absolute;
            left: -0.3125rem;
            bottom: -0.375rem;
            width: 0.6875rem;
            height: 0.6875rem;
            border-radius: $rounded-pill;
            background-color: #936dc0;
          }
        }
      }

      .manual-image {
        max-width: 200px;
        margin: 0 auto 2rem;
        padding: 1rem;
        border-radius: 1.5rem;
        border: 2px solid $white;

        & > img {
          border-radius: 0.75rem;
        }
      }

      .manual-legend {
        margin-bottom: 3rem;
        line-height: 1.5;

        .legend-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
          margin: 0 0.125rem;
          padding: 0.25rem;
          color: $secondary;
          background-color: $white;
          border-radius: $rounded-pill;
        }

        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          font-size: $font-size-4;
          font-weight: $font-weight-normal;
          color: rgba($white, 0.65);

          .legend-icon {
            margin: 0 1rem 0 0;
            padding: 0.5rem;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      padding-top: 3rem;
      padding-bottom: 3rem;

      &.section-banner {
        padding-top: 5.25rem;
        padding-bottom: 6rem;
        text-align: left;
      }

      &.section-getting-started {
        .step {
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .step-index {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }

      &.section-manual {
        .manual-step {
          margin-bottom: 3rem;
          padding-top: 0;
          padding-bottom: 3rem;

          .step-index {
            left: $grid-gutter-width * 0.5;
            right: calc(33.33333% + 3rem);
            top: auto;
            bottom: 1.25rem;

            &::after {
              display: block;
              content: '';
              position: absolute;
              right: -0.3125rem;
              bottom: -0.375rem;
              width: 0.6875rem;
              height: 0.6875rem;
              border-radius: $rounded-pill;
              background-color: #936dc0;
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;

      &.section-banner {
        padding-top: 6rem;
        padding-bottom: 4.5rem;

        .banner-header {
          font-size: $font-size-4;
        }
      }

      &.section-manual {
        .manual-step {
          margin-bottom: 4rem;
        }

        .manual-image {
          &.manual-image-desktop {
            position: relative;
            max-width: none;
            margin-bottom: 4rem;

            &::after {
              display: block;
              content: '';
              position: absolute;
              bottom: -1px;
              left: 50%;
              width: 50%;
              padding-bottom: 12.5%;
              background-image: url("data:image/svg+xml,%3Csvg width='200' height='50' version='1.1' viewBox='0 0 200 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m30.802 42.207c3.5664 4.8868 9.3612 7.7926 15.541 7.7926h108.47c6.3008 0 12.193-3.0201 15.737-8.0653l29.448-41.935h-200z' fill='none' stroke='%23fff' stroke-width='2px'/%3E%3C/svg%3E");
              background-position: top;
              background-repeat: no-repeat;
              background-size: contain;
              transform: translateX(-50%) translateY(100%);
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      padding-top: 4.5rem;

      &.section-banner {
        padding-top: 8rem;
      }

      &.section-manual {
        overflow: hidden;
        background-image: linear-gradient(
          to top,
          rgba($white, 0.05),
          transparent 4rem
        );

        .manual-step {
          margin-left: -1.25rem;
          margin-right: -1.25rem;
          margin-bottom: 4.5rem;
          padding-bottom: 0;

          & > [class*='col'] {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .step-index {
            left: 1.25rem;
            right: calc(50% + 1.25rem);
            bottom: 3rem;
          }
        }

        .manual-image {
          &.manual-image-desktop {
            margin-bottom: 4.5rem;
          }
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "controller": {
      "features": {
        "case": "Case: plastic. Size: 4 modules",
        "expansion": "Up to 32 expansion modules",
        "inputs": "6 digital inputs 230 AC",
        "led": "LED indicator",
        "outputs": "4 relay outputs 5 A",
        "power": "230V power supply",
        "sim": "SIM",
        "usb": "micro USB",
        "wifi": "Wi-Fi"
      },
      "image": "controller-en.svg",
      "title": "Controller",
      "usage": {
        "1": "Remote load management",
        "2": "Monitoring of the outgoing lines condition",
        "3": "Monitoring of the state of protective equipment (automatic devices, RCDs, differential automatic devices, AFCIs)"
      }
    },
    "getStarted": {
      "steps": {
        "1": "Open service: ",
        "2": "Select equipment, download the diagram and specification",
        "3": "Order equipment from any EKF partner",
        "4": "Assemble the cabinet according to the scheme",
        "5": "Connect to the ePRO 24 controller via a USB cable, set up WiFi and GSM passwords",
        "6": "Download the application or use the WEB-application"
      },
      "title": "Getting started"
    },
    "intro": {
      "p1": "ePRO 24 service is designed for remote monitoring and control of electrical equipment in your home, apartment, office and other facilities.",
      "p2": "Create a switchboard according to your needs, add a controller to it.",
      "p3": "Download the ePRO 24 software and use it to control electrical equipment from anywhere in the world."
    },
    "manual": {
      "control": {
        "after": "can be controlled by clicking on them. Gray color means that the load is off, blue with lilac – the load is on.",
        "before": "Elements with",
        "title": "Control"
      },
      "legend": {
        "edit": {
          "alt": "Edit/delete topic",
          "text": "Click here to edit or delete a topic."
        },
        "image": "legend-en.svg",
        "input": {
          "alt": "Input or output number",
          "text": "Here you can see the number of the input or output that the topic is responsible for."
        },
        "loading": {
          "alt": "Loading indicator",
          "text": "A spinning indicator around the control means that the device has not yet sent a response to the command. If the indicator is spinning for a very long time, it is worth checking the controller – the connection is lost."
        },
        "time": {
          "alt": "Time of latest update",
          "text": "The time of the latest update of information on current topic is displayed here."
        },
        "title": "Legend"
      },
      "monitoring": {
        "after": "are elements of monitoring. Blue color means the presence of voltage at the controller input, gray means its absence.",
        "before": "Elements with",
        "title": "Monitoring"
      },
      "step": "step",
      "steps": {
        "1": {
          "1": "Open",
          "2": "Register (in case you want to manage the same controller from different devices, you need to log in under the same account from different devices).",
          "3": "Enter your personal account.",
          "4": "Create a new cabinet. To do this, click «+». Each new base controller will appear as a new cabinet."
        },
        "2": {
          "1": "Choose an image for your cabinet. You can upload a suitable photo from your device or choose from the standard library.",
          "2": "Next, enter the 8-digit serial number of the controller. It can be found on the case or by connecting via USB and using the ePRO Config app.",
          "3": "Enter the number of connected expansion modules. If you have no connected expansion modules, then leave 0 in the last column.",
          "4": "Save settings."
        },
        "3": {
          "1": "Enter the created cabinet.",
          "2": "To add a load monitoring or control element, click «+».",
          "3": "Name your load, for example: «Outlets», «Lights», «Oven».",
          "4": "Select connection type.",
          "5": "Select the module number and the number of the input or output to which the controller is connected.",
          "6": "Choose an icon.",
          "7": "Save settings.",
          "8": "Add all the elements in this way."
        }
      },
      "title": "Manual"
    },
    "pageTitle": "ePro 24 remote controller — EKF",
    "remoteController": "Remote controller",
    "tagline": "Simple, convenient, reliable!",
    "webApp": "Web app"
  },
  "ru": {
    "controller": {
      "features": {
        "case": "Корпус: пластик. Размер: 4 модуля",
        "expansion": "До 32 модулей расширения",
        "inputs": "6 цифровых входов 230 AC",
        "led": "LED индикатор",
        "outputs": "4 релейных выхода 5 А",
        "power": "Питание 230В",
        "sim": "SIM",
        "usb": "micro USB",
        "wifi": "Wi-Fi"
      },
      "image": "controller.svg",
      "title": "Контроллер",
      "usage": {
        "1": "Удаленное управление нагрузками",
        "2": "Мониторинг состояния отходящих линий",
        "3": "Мониторинг состояния защитной аппаратуры (автоматы, УЗО, диф. автомат, УЗДП)"
      }
    },
    "getStarted": {
      "steps": {
        "1": "Открываем сервис",
        "2": "Подбираем оборудование, скачиваем схему и спецификацию",
        "3": "Заказываем оборудование у любого партнера EKF",
        "4": "Собираем шкаф по схеме",
        "5": "Подключаемся к контроллеру ePRO 24 через шнур USB, настраиваем пароли WiFi и GSM",
        "6": "Скачиваем приложение или используем WEB-приложение для управления"
      },
      "title": "Как начать работу?"
    },
    "image": "controller.svg",
    "intro": {
      "p1": "Сервис ePRO 24 разработан для удаленного контроля и управления электрооборудованием в доме, квартире, офисе и на других объектах.",
      "p2": "Создайте распределительный щит под свои нужды, добавьте в него контроллер.",
      "p3": "Загрузите программу ePRO 24 и контролируйте через нее электрооборудование из любой точки мира."
    },
    "manual": {
      "control": {
        "after": "можно управлять, нажав на них. Серый цвет означает, что нагрузка отключена, голубой с сиреневым – нагрузка включена.",
        "before": "Элементами со знаком",
        "title": "Управление"
      },
      "legend": {
        "edit": {
          "alt": "Редактировать/удалить топик",
          "text": "Нажмите сюда для того, чтобы отредактировать или удалить топик."
        },
        "image": "legend.svg",
        "input": {
          "alt": "Номер входа или выхода",
          "text": "Здесь вы можете увидеть номер входа или выхода, за который отвечает топик."
        },
        "loading": {
          "alt": "Индикатор загрузки",
          "text": "«Бегунок» вокруг элемента управления означает, что устройство еще не отправило ответ о выполнении команды. В случае если бегунок крутится очень долго, стоит проверить контроллер – связь потеряна."
        },
        "time": {
          "alt": "Время последнего получения информации",
          "text": "Тут отображается время последнего получения информации по этому топику."
        },
        "title": "Условные обозначения"
      },
      "monitoring": {
        "after": "можно только следить. Голубой цвет означает наличие напряжения на входе контроллера, серый – его отсутствие.",
        "before": "За состоянием элементов со знаком",
        "title": "Мониторинг"
      },
      "step": "шаг",
      "steps": {
        "1": {
          "1": "Заходим на",
          "2": "Регистрируемся (в случае, если вы захотите управлять одним и тем же контроллером с разных устройств, необходимо зайти под одной и той же учетной записью с разных устройств).",
          "3": "Входим в личный кабинет.",
          "4": "Создаем новый шкаф. Для этого жмем на «+». Каждый новый базовый контроллер будет отображаться как новый шкаф."
        },
        "2": {
          "1": "Выбираем изображение для вашего шкафа. Можно загрузить подходящее фото c вашего устройства либо выбрать из стандартной библиотеки.",
          "2": "Далее введите 8-значный серийный номер контроллера. Его можно найти на корпусе либо узнать, подключившись по USB, используя программу ePRO Config.",
          "3": "Введите количество подключенных модулей расширения. Если у вас нет подключенных модулей расширения, то оставьте 0 в последней графе.",
          "4": "Сохраните настройки."
        },
        "3": {
          "1": "Заходим в созданный шкаф.",
          "2": "Для того чтобы добавить элемент мониторинга или управления нагрузки, нажмите «+».",
          "3": "Придумайте название для вашей нагрузки, например: «Розетки», «Свет», «Духовой шкаф».",
          "4": "Выберите тип подключения.",
          "5": "Выберите номер модуля и номер входа или выхода, к которому подключен контроллер.",
          "6": "Подберите подходящую иконку.",
          "7": "Сохраните настройки.",
          "8": "Добавьте таким образом все элементы."
        }
      },
      "title": "Инструкция"
    },
    "pageTitle": "ePro 24 — Контроллер удаленного управления — EKF",
    "remoteController": "Контроллер удаленного управления",
    "tagline": "Просто, удобно, надежно!",
    "webApp": "Веб-приложение"
  }
}
</i18n>
