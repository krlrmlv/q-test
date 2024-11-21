<template>
  <main class="page-landing-siz">
    <section class="section section-banner">
      <b-container>
        <h1 class="font-weight-normal text-uppercase text-right">
          {{ $t('title') }}
        </h1>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <p class="mb-24" v-html="$t('lead')"></p>
        <b-button :to="localePath(catalogLink)" variant="outline-white">
          {{ $t('catalog.goToCatalog') }}
        </b-button>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="font-weight-normal text-uppercase text-right mb-24">
          {{ $t('advantages.title') }}
        </h2>
        <b-row class="d-lg-none">
          <b-col md="7">
            <ul class="list-unstyled mb-24">
              <li class="media align-items-center mb-24">
                <b-img-lazy
                  src="/images/siz/benefit-bit.jpg"
                  width="72"
                  class="rounded-pill mr-16"
                  aria-hidden="true"
                />
                <div class="media-body" v-html="$t('advantages.bit')"></div>
              </li>
              <li class="media align-items-center mb-24">
                <b-img-lazy
                  src="/images/siz/benefit-spring.jpg"
                  width="72"
                  class="rounded-pill mr-16"
                  aria-hidden="true"
                />
                <div class="media-body" v-html="$t('advantages.spring')"></div>
              </li>
              <li class="media align-items-center mb-24">
                <b-img-lazy
                  src="/images/siz/benefit-ridges.jpg"
                  width="72"
                  class="rounded-pill mr-16"
                  aria-hidden="true"
                />
                <div class="media-body" v-html="$t('advantages.ridges')"></div>
              </li>
              <li class="media align-items-center mb-24">
                <b-img-lazy
                  src="/images/siz/benefit-cover.jpg"
                  width="72"
                  class="rounded-pill mr-16"
                  aria-hidden="true"
                />
                <div class="media-body" v-html="$t('advantages.cover')"></div>
              </li>
              <li class="media align-items-center mb-24">
                <b-img-lazy
                  src="/images/siz/benefit-petals.jpg"
                  width="72"
                  class="rounded-pill mr-16"
                  aria-hidden="true"
                />
                <div class="media-body" v-html="$t('advantages.petals')"></div>
              </li>
            </ul>
          </b-col>
          <b-col md="4" offset-md="1" class="d-none d-md-block">
            <b-img-lazy
              :alt="$t('advantages.title')"
              src="/images/siz/benefits-sm.png"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
      <div class="text-center d-none d-lg-block">
        <b-img-lazy
          :alt="$t('advantages.title')"
          :src="$t('advantages.image')"
          class="img-fluid"
        />
      </div>
    </section>

    <section class="section section-sizes">
      <b-container>
        <b-row align-v="center">
          <b-col xl="10" class="mb-24">
            <h2 class="font-weight-normal text-uppercase mb-0">
              {{ $t('sectionSiz') }}
            </h2>
          </b-col>
          <b-col cols="auto" xl="2" class="mb-24">
            <b-button
              :to="localePath(catalogLink)"
              variant="outline-white"
              block
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>

        <div class="sizes">
          <div class="sizes-row sizes-row-gray">
            <div class="sizes-legend">
              <span>1–2,75</span>
              <b-img-lazy src="/images/siz/siz-gray.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell active"><span>1,0</span></div>
            <div class="sizes-cell active"><span>1,5</span></div>
            <div class="sizes-cell active"><span>1,75</span></div>
            <div class="sizes-cell"><span>2,75</span></div>
            <div class="sizes-cell"><span>3,0</span></div>
            <div class="sizes-cell"><span>3,75</span></div>
            <div class="sizes-cell"><span>5,75</span></div>
            <div class="sizes-cell"><span>10,5</span> <span>17,5</span></div>
          </div>
          <div class="sizes-row sizes-row-blue">
            <div class="sizes-legend">
              <span>1–3,75</span>
              <b-img-lazy src="/images/siz/siz-blue.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
          </div>
          <div class="sizes-row sizes-row-orange">
            <div class="sizes-legend">
              <span>1,5–5,75</span>
              <b-img-lazy src="/images/siz/siz-orange.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
          </div>
          <div class="sizes-row sizes-row-yellow">
            <div class="sizes-legend">
              <span>1,75–10,5</span>
              <b-img-lazy src="/images/siz/siz-yellow.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell"></div>
          </div>
          <div class="sizes-row sizes-row-red">
            <div class="sizes-legend">
              <span>3,0–17,0</span>
              <b-img-lazy src="/images/siz/siz-red.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
          </div>
        </div>
      </b-container>
    </section>

    <section class="section section-sizes">
      <b-container>
        <b-row align-v="center">
          <b-col xl="10" order-xl="2" class="mb-24">
            <h2 class="font-weight-normal text-uppercase text-xl-right mb-0">
              {{ $t('sectionSizL') }}
            </h2>
          </b-col>
          <b-col cols="auto" xl="2" order-xl="1" class="mb-24">
            <b-button
              :to="localePath(catalogLink)"
              variant="outline-white"
              block
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>

        <div class="sizes">
          <div class="sizes-row sizes-row-yellow">
            <div class="sizes-legend">
              <span>3–8,5</span>
              <b-img-lazy
                src="/images/siz/sizl-yellow.png"
                aria-hidden="true"
              />
            </div>
            <div class="sizes-cell"><span>1,0</span></div>
            <div class="sizes-cell active"><span>3,0</span></div>
            <div class="sizes-cell active"><span>4,5</span></div>
            <div class="sizes-cell"><span>8,5</span></div>
            <div class="sizes-cell"><span>12,75</span> <span>16,0</span></div>
          </div>
          <div class="sizes-row sizes-row-white">
            <div class="sizes-legend">
              <span>1–12,75</span>
              <b-img-lazy src="/images/siz/sizl-white.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell"></div>
          </div>
          <div class="sizes-row sizes-row-red">
            <div class="sizes-legend">
              <span>4,5–16,0</span>
              <b-img-lazy src="/images/siz/sizl-red.png" aria-hidden="true" />
            </div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
            <div class="sizes-cell active"></div>
          </div>
        </div>
      </b-container>
    </section>

    <section class="section section-footer overflow-hidden">
      <b-row cols-lg="4" cols-xl="5" no-gutters>
        <b-col lg="1" xl="1">
          <div
            class="footer-item flex-lg-column justify-content-lg-center"
            style="background-color: #0e5968"
          >
            <b-img-lazy
              :alt="$t('footer.box')"
              src="/images/siz/footer-box.jpg"
              class="footer-item-img img-fluid"
            />
            <div class="footer-item-body" v-html="$t('footer.box')"></div>
          </div>
        </b-col>
        <b-col lg="3" xl="4">
          <b-row cols-lg="3" cols-xl="4" no-gutters>
            <b-col lg="1" xl="1">
              <div class="footer-item" style="background-color: #aac0c5">
                <div
                  class="footer-item-body"
                  v-html="$t('footer.reliable')"
                ></div>
              </div>
            </b-col>
            <b-col lg="2" xl="2">
              <div class="footer-item" style="background-color: #60b8c2">
                <div
                  class="footer-item-body"
                  v-html="$t('footer.design')"
                ></div>
                <b-img-lazy
                  :alt="$t('footer.design')"
                  src="/images/siz/footer-design.jpg"
                  class="footer-item-img img-fluid"
                />
              </div>
            </b-col>
            <b-col lg="1" xl="1">
              <div
                class="footer-item flex-lg-column"
                style="background-color: #38878d"
              >
                <div
                  class="footer-item-body"
                  v-html="$t('footer.package')"
                ></div>
                <b-img-lazy
                  :alt="$t('footer.package')"
                  src="/images/siz/footer-package.jpg"
                  class="footer-item-img img-fluid"
                />
              </div>
            </b-col>
            <b-col xl="1" class="d-none d-xl-block">
              <div class="footer-item" style="background-color: #6d8a90">
                <b-img-lazy
                  src="/images/siz/footer-quality.jpg"
                  class="footer-item-img img-fluid ml-auto"
                  aria-hidden="true"
                />
              </div>
            </b-col>
            <b-col lg="1" xl="1">
              <div class="footer-item" style="background-color: #6c574b">
                <div class="footer-item-body" v-html="$t('footer.price')"></div>
              </div>
            </b-col>
            <b-col lg="1" xl="2">
              <div
                class="footer-item flex-lg-column"
                style="background-color: #aac0c5"
              >
                <div class="footer-item-body" v-html="$t('footer.bit')"></div>
                <b-img-lazy
                  :alt="$t('footer.bit')"
                  src="/images/siz/footer-bat.jpg"
                  class="footer-item-img img-fluid ml-auto mt-auto"
                />
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
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
      catalogLink: '/catalog/soedinitelnye-izoliruyushhie-zazhimy-siz',
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
@import '~bootstrap/scss/media';

.page-landing-siz {
  line-height: 1.2;
  color: rgba($white, 0.9);
  background-color: #3f7888;
  background-image: linear-gradient(
    #3f7888,
    #4b8793 750px,
    #458b92 1500px,
    #2f8188 2250px,
    #076b72
  );
  background-position: center top 280px;
  background-repeat: no-repeat;
  background-size: auto;

  .section {
    padding-top: 1rem;
    padding-bottom: 1rem;

    &.section-banner {
      height: 280px;
      padding-top: 2rem;
      background-color: #1f5971;
      background-image: url('/images/siz/banner-bg-xs.jpg');
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: auto;
    }

    &.section-sizes {
      .sizes {
        width: 100%;
        margin-bottom: 1rem;
      }

      .sizes-row {
        display: flex;
        position: relative;
        border-right: 2px solid #3dafb8;
        border-bottom: 2px solid #3dafb8;

        &.sizes-row-gray {
          .sizes-legend {
            & > span {
              background-color: #a8abaf;
            }
          }
          .sizes-cell {
            &.active {
              &::after {
                background-color: $white;
              }
            }
          }
        }
        &.sizes-row-blue {
          .sizes-legend {
            & > span {
              background-color: #006bbf;
            }
          }
          .sizes-cell {
            &.active {
              &::after {
                background-color: #00e0ff;
              }
            }
          }
        }
        &.sizes-row-orange {
          .sizes-legend {
            & > span {
              background-color: #fc8f53;
            }
          }
          .sizes-cell {
            &.active {
              &::after {
                background-color: #fc8f53;
              }
            }
          }
        }
        &.sizes-row-yellow {
          .sizes-legend {
            & > span {
              background-color: #dcb500;
            }
          }
          .sizes-cell {
            &.active {
              &::after {
                background-color: #dcb500;
              }
            }
          }
        }
        &.sizes-row-red {
          .sizes-legend {
            & > span {
              background-color: #be1f30;
            }
          }
          .sizes-cell {
            &.active {
              &::after {
                background-color: #be1f30;
              }
            }
          }
        }
        &.sizes-row-white {
          .sizes-legend {
            & > span {
              background-color: #e7d7bc;
            }
          }
          .sizes-cell {
            &.active {
              &::after {
                background-color: #e7d7bc;
              }
            }
          }
        }
      }

      .sizes-legend {
        display: flex;
        flex: 1 1 100%;

        & > span {
          display: flex;
          flex: 1 1 100%;
          align-items: center;
          padding-left: 2rem;
        }

        & > img {
          flex: 0 0 auto;
          align-self: center;
          margin-right: 1rem;
          margin-left: -45px;
        }
      }

      .sizes-cell {
        display: none;
        flex: 1 1 0;
        position: relative;
        height: 100px;
        border-left: 2px solid #3dafb8;

        & > span {
          position: absolute;
          top: 0;
          left: 0;
          padding-bottom: 0.25rem;
          transform: translateY(-100%) translateX(-50%);

          & + span {
            left: auto;
            right: 0;
            transform: translateY(-100%) translateX(50%);
          }
        }

        &.active {
          &::after {
            display: block;
            content: '';
            position: absolute;
            left: -1px;
            right: -1px;
            bottom: -1px;
            height: 3px;
            z-index: 1;
          }
        }
      }
    }

    &.section-footer {
      padding-bottom: 0;

      .footer-item {
        display: flex;
        height: 100%;
        font-size: 1.25rem;
        text-transform: uppercase;

        .footer-item-body {
          padding: 1.5rem;
        }

        .footer-item-img {
          display: none;
        }
      }
    }
  }

  @include media-breakpoint-up(sm) {
    background-position: center top 340px;

    .section {
      &.section-banner {
        height: 340px;
        background-image: url('/images/siz/banner-bg-sm.jpg');
      }

      &.section-sizes {
        .sizes {
          padding-right: 1rem;
        }

        .sizes-legend {
          flex: 0 0 180px;

          & > span {
            padding-left: $grid-gutter-width * 0.5;
          }
        }

        .sizes-cell {
          display: block;
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    background-position: center top 400px;

    .section {
      &.section-banner {
        height: 400px;
        background-image: url('/images/siz/banner-bg-md.jpg');
      }

      &.section-sizes {
        .sizes {
          padding-top: 2rem;
        }

        .sizes-cell {
          & > span {
            & + span {
              white-space: nowrap;

              &::after {
                display: inline;
                content: ' мм²';
              }
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    font-size: $font-size-4;
    background-position: center top 600px;

    .section {
      &.section-banner {
        height: 600px;
        background-image: url('/images/siz/banner-bg-lg.jpg');
      }

      &.section-footer {
        .footer-item {
          font-size: 1.5rem;

          .footer-item-img {
            display: block;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    background-position: center top 820px;

    h1,
    .h1 {
      font-size: 3rem;
    }

    h2,
    .h2 {
      font-size: 2.5rem;
    }

    .section {
      &.section-banner {
        height: 820px;
        margin-bottom: -120px;
        background-image: url('/images/siz/banner-bg.jpg');
      }

      &.section-sizes {
        padding-bottom: 3rem;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "advantages": {
      "bit": "Special twist bit in&nbsp;each package",
      "cover": "The&nbsp;non-flammable plastic cover of&nbsp;the cap provides three types of&nbsp;protection: electrical, fireproof and&nbsp;mechanical",
      "image": "/images/siz/benefits-en.svg",
      "petals": "Special petals increase torque and&nbsp;ease the&nbsp;twisting process",
      "ridges": "Special ribs on&nbsp;the&nbsp;body simplify the&nbsp;twisting process",
      "spring": "Square spring provides better grip on&nbsp;conductors",
      "title": "SIZ & SIZ-L advantages"
    },
    "footer": {
      "bit": "Bit in&nbsp;each package",
      "box": "SIZ of&nbsp;all sizes in&nbsp;one box",
      "design": "Bright design and&nbsp;wide choice in&nbsp;conductor cross-section",
      "package": "Convenient retail packaging for&nbsp;100&nbsp;pcs.",
      "price": "Affordable price",
      "reliable": "Reliable construction, high quality materials"
    },
    "lead": "SIZ&nbsp;&ndash; connecting insulating clamp.<br />SIZ are designed for&nbsp;connection and&nbsp;fixation in&nbsp;the&nbsp;twist of&nbsp;copper wires. The&nbsp;clamp is&nbsp;screwed onto&nbsp;the&nbsp;bare parts of&nbsp;the&nbsp;wires in&nbsp;several clockwise turns until the&nbsp;bundle of&nbsp;wires is&nbsp;fully fixed, while the&nbsp;outer case acts as&nbsp;an&nbsp;insulation.<br />The&nbsp;body of&nbsp;the&nbsp;insulating clamp is&nbsp;made of&nbsp;halogen-free polypropylene. An&nbsp;anodized conical spring is&nbsp;mounted inside the&nbsp;plastic case. The&nbsp;cross-section of&nbsp;the&nbsp;spring has a&nbsp;square shape, which provides a&nbsp;reliable grip and&nbsp;retention of&nbsp;the&nbsp;twisted wires throughout the&nbsp;entire service life.<br />PPE clamps are&nbsp;used for&nbsp;electrical work in&nbsp;both domestic and&nbsp;industrial premises. The&nbsp;convenience of&nbsp;these products lies in&nbsp;the&nbsp;speed of&nbsp;installation, reliability of&nbsp;connection and&nbsp;insulation of&nbsp;wires, as&nbsp;well as&nbsp;in&nbsp;the&nbsp;possibility of&nbsp;reusing the&nbsp;unit without violating the&nbsp;integrity of&nbsp;the&nbsp;wires.",
    "pageTitle": "SIZ & SIZ-L caps — EKF",
    "sectionSiz": "Total cross-section of SIZ wires",
    "sectionSizL": "Total cross-section of SIZ-L wires",
    "title": "SIZ & SIZ-L caps"
  },
  "ru": {
    "advantages": {
      "bit": "Специальная бита для&nbsp;скрутки в&nbsp;каждой упаковке",
      "cover": "Негорючая пластиковая оболочка колпачка обеспечивает три вида защиты: электроизоляционную, противопожарную и&nbsp;механическую",
      "image": "/images/siz/benefits.svg",
      "petals": "Специальные лепестки позволяют увеличить крутящий момент и&nbsp;облегчить процесс скрутки",
      "ridges": "Специальные ребра на&nbsp;корпусе упрощают процесс скрутки",
      "spring": "Квадратное сечение пружины обеспечивает более надежное сцепление с&nbsp;проводниками",
      "title": "Преимущества СИЗ и СИЗ-Л"
    },
    "footer": {
      "bit": "Бита в&nbsp;каждой упаковке",
      "box": "СИЗы всех размеров в&nbsp;одном боксе",
      "design": "Яркий дизайн и&nbsp;широкий выбор по&nbsp;сечению проводника",
      "package": "Удобная розничная упаковка на&nbsp;100&nbsp;шт.",
      "price": "Доступная цена",
      "reliable": "Надежная конструкция, высокое качество материалов"
    },
    "lead": "СИЗ&nbsp;– соединительный изолирующий зажим.<br />СИЗ предназначены для&nbsp;соединения и&nbsp;фиксации в&nbsp;скрутке медных проводов. Зажим накручивают на&nbsp;оголенные части проводов в&nbsp;несколько оборотов по&nbsp;часовой стрелке до&nbsp;полной фиксации пучка проводов, при&nbsp;этом внешний корпус выполняет функцию изоляции.<br />Корпус изолирующего зажима выполнен из&nbsp;полипропилена, не&nbsp;содержащего галогенов. Внутри пластикового корпуса вмонтирована анодированная пружина конической конфигурации. Сечение пружины имеет квадратную форму, которая обеспечивает надежный захват и&nbsp;удержание скрутки проводов на&nbsp;протяжении всего срока эксплуатации.<br />Зажимы СИЗ используются при&nbsp;электромонтажных работах как&nbsp;в&nbsp;бытовых, так&nbsp;и&nbsp;в&nbsp;промышленных помещениях. Удобство данной продукции заключается в&nbsp;быстроте монтажа, надежности соединения и&nbsp;изоляции проводов, а&nbsp;также в&nbsp;возможности многократного использования узла без&nbsp;нарушения целостности проводов.",
    "pageTitle": "Колпачки СИЗ и СИЗ-Л — EKF",
    "sectionSiz": "Суммарное сечение проводов СИЗ",
    "sectionSizL": "Суммарное сечение проводов СИЗ-Л",
    "title": "Колпачки СИЗ и СИЗ-Л"
  }
}
</i18n>
