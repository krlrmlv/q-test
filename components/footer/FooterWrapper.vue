<template>
  <div>
    <footer class="app-footer">
      <b-container>
        <b-row align-v="center" class="mb-sm-24">
          <b-col cols="12" sm="4" lg="3" xl="2" class="mb-32">
            <b-link :to="localePath('/')" class="d-inline-block">
              <img
                src="/images/logo-ekf-dark.svg"
                width="138"
                height="33"
                alt="EKF"
                class="footer-brand"
              />
            </b-link>
          </b-col>

          <b-col cols="12" sm="8" lg="4" xl="4" class="mb-32 mb-lg-24">
            <FooterCallback />
          </b-col>

          <b-col cols="12" md="12" lg="5" xl="6" class="mb-32 mb-lg-24">
            <FooterSubscribe />
          </b-col>
        </b-row>
        <b-row class="mb-lg-24">
          <b-col cols="12" sm="6" md="4" xl="2" class="mb-24">
            <FooterLinksCollapse :links-group="specializations" />
          </b-col>

          <b-col cols="12" sm="6" md="4" xl="2" class="mb-24">
            <FooterSolutions />
          </b-col>

          <b-col
            v-for="(group, index) in staticLinks"
            :key="`links-group-${index}`"
            cols="12"
            sm="6"
            md="4"
            xl="2"
            class="mb-24"
          >
            <FooterLinksCollapse :links-group="group" />
          </b-col>
        </b-row>

        <b-row class="mb-lg-48 mx-xl-n20">
          <b-col
            cols="12"
            md="6"
            lg="6"
            xl="4"
            order-md="2"
            order-xl="3"
            class="mb-32 mb-lg-16 d-flex flex-column col-xxxl-3"
          >
            <FooterSocialLinks class="mb-24 mb-lg-32 ml-md-auto" />

            <FooterAppLinks class="ml-md-auto" />
          </b-col>

          <b-col
            cols="12"
            sm="6"
            xl="4"
            order-md="1"
            class="mb-12 d-flex flex-column align-items-start"
          >
            <LocationIndicator dark class="d-none d-md-block d-lg-none" />

            <div class="legal-links mt-auto mt-md-32 mt-lg-auto">
              <p class="lh-120 mb-16 mb-lg-8">
                <b-link
                  :to="localePath('/legal/user-agreement')"
                  class="fs-2 footer-link"
                >
                  {{ $t('legal.userAgreement') }}
                </b-link>
              </p>
              <p class="lh-120 mb-16 mb-lg-8">
                <b-link
                  :to="localePath('/legal/disclosure')"
                  target="_blank"
                  class="fs-2 footer-link"
                >
                  {{ $t('legal.disclosure') }}
                </b-link>
              </p>
              <p class="lh-120 mb-8 mb-lg-28 d-sm-none d-lg-block">
                <b-link
                  to="/files/footer/insider-information-list.pdf"
                  target="_blank"
                  class="fs-2 footer-link"
                >
                  {{ $t('footer.insiderInformationList') }}
                </b-link>
              </p>

              <p class="lh-120 mb-0 fs-1 text-gray-600 d-sm-none d-lg-block">
                Наш сайт защищен с помощью reCAPTCHA и соответствует
              </p>

              <p
                class="lh-120 mb-0 fs-1 text-gray-600 mb-24 mb-md-0 d-sm-none d-lg-block"
              >
                <a
                  rel="nofollow"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  class="text-reset"
                  >Политике конфиденциальности</a
                >

                и
                <a
                  rel="nofollow"
                  href="https://policies.google.com/terms"
                  target="_blank"
                  class="text-reset"
                  >Условиям использования</a
                >
                Google.
              </p>
            </div>
          </b-col>

          <b-col
            cols="12"
            lg="12"
            xl="4"
            order-md="3"
            order-xl="2"
            class="col-xxxl-5 d-md-none d-lg-flex justify-content-between"
          >
            <p
              class="d-none d-lg-block mb-12 fs-2 text-gray-500 align-self-end"
              v-html="$t('footer.errorReport')"
            />

            <LocationIndicator dark class="mt-lg-8 align-self-start" />
            <SelectRegionIndicator dark class="d-lg-none mt-16" />
          </b-col>
        </b-row>

        <hr class="border-gray-700 mb-md-32" />

        <b-row class="fs-1 fs-lg-3 lh-120">
          <b-col md="auto" order-md="2" class="ml-auto text-md-right mb-8">
            <SeoLink
              href="https://yandex.ru/maps/-/CBa5vKU6SC"
              target="_blank"
              class="footer-link"
            >
              <span v-html="$t('footer.address')" />
            </SeoLink>
          </b-col>
          <b-col md="auto" order-md="1" class="mb-8">
            <b-link :to="localePath('/')" class="footer-link">
              © {{ currentYear }} EKF
            </b-link>
          </b-col>
        </b-row>
      </b-container>
    </footer>

    <ErrorReport />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { staticLinks } from '~/components/constants/footer'

export default {
  data() {
    return {
      staticLinks,
    }
  },

  computed: {
    ...mapGetters('layouts', ['layouts']),

    currentYear() {
      const date = new Date()
      return date.getFullYear()
    },

    specializations() {
      return {
        title: 'professionals.title',
        link: null,
        items: this.layouts?.map((item) => ({
          title: item?.name,
          link: this.localePath(`/view/${item?.slug}`),
        })),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-footer {
  padding: 2.5rem 0 3rem;
  color: $body-bg;
  background-color: $footer-bg;
}

.footer-link {
  color: $gray-500;

  @include hover {
    color: $white;
  }
}

@include media-breakpoint-down(md) {
  .footer-brand {
    height: 2rem;
    width: auto;
  }

  .legal-links {
    .footer-link {
      color: $white;
      @include hover {
        color: $primary;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .app-footer {
    padding: 6rem 0 2rem;
  }
}
</style>
