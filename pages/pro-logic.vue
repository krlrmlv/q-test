<template>
  <main class="pro-logic-landing">
    <section class="intro">
      <b-container>
        <b-row>
          <b-col
            cols="12"
            lg="5"
            class="mt-24 mt-lg-0 text-md-center"
            order-lg="2"
          >
            <img
              src="/images/pro-logic/intro-capabilities/intro-xs.png"
              alt="intro"
              class="img-fluid d-lg-none"
            />
            <img
              src="/images/pro-logic/intro-capabilities/intro.png"
              alt="intro"
              class="img-fluid d-none d-lg-block"
            />
          </b-col>
          <b-col cols="12" lg="7" order-lg="1">
            <h5 class="sub-title mt-24 mb-lg-0" v-html="$t('intro.sub')" />
            <h1 class="title">{{ $t('intro.title') }}</h1>
            <ul class="mb-lg-40">
              <li>{{ $t('intro.li1') }}</li>
              <li>{{ $t('intro.li2') }}</li>
              <li>{{ $t('intro.li3') }}</li>
            </ul>
            <b-button :href="catalogLink" variant="primary" class="">
              {{ $t('goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
        <div class="white-rectangle mt-24 mt-lg-64 py-40">
          <b-row>
            <b-col
              cols="12"
              lg="4"
              xl="3"
              offset-lg="2"
              class="d-flex align-items-center"
            >
              <h3 class="text-primary m-lg-0">
                {{ $t('intro.whatIsPlk') }}
              </h3>
            </b-col>
            <b-col cols="12" lg="5" offset-xl="1">
              <div v-html="$t('intro.whatIsPlkText')"></div>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
    <section class="application-area">
      <b-container>
        <h2
          class="text-center mb-48 mb-lg-72"
          v-html="$t('application-area.title')"
        />
        <b-row>
          <b-col cols="6" lg="4" class="text-center mb-56">
            <img
              src="/images/pro-logic/intro-capabilities/heating.png"
              alt=""
              class="img-fluid"
            />
            <p class="mt-16 mt-lg-24" v-html="$t('application-area.heating')" />
          </b-col>
          <b-col cols="6" lg="4" class="text-center mb-56">
            <img
              src="/images/pro-logic/intro-capabilities/metal.png"
              alt=""
              class="img-fluid"
            />
            <p class="mt-16 mt-lg-24" v-html="$t('application-area.metal')" />
          </b-col>
          <b-col cols="6" lg="4" class="text-center mb-56">
            <img
              src="/images/pro-logic/intro-capabilities/tree.png"
              alt=""
              class="img-fluid"
            />
            <p class="mt-16 mt-lg-24" v-html="$t('application-area.tree')" />
          </b-col>
          <b-col cols="6" lg="4" class="text-center mb-56">
            <img
              src="/images/pro-logic/intro-capabilities/water.png"
              alt=""
              class="img-fluid"
            />
            <p class="mt-16 mt-lg-24" v-html="$t('application-area.water')" />
          </b-col>
          <b-col cols="6" lg="4" class="text-center mb-56">
            <img
              src="/images/pro-logic/intro-capabilities/foodprom.png"
              alt=""
              class="img-fluid"
            />
            <p
              class="mt-16 mt-lg-24"
              v-html="$t('application-area.foodprom')"
            />
          </b-col>
          <b-col cols="6" lg="4" class="text-center mb-56">
            <img
              src="/images/pro-logic/intro-capabilities/pack.png"
              alt=""
              class="img-fluid"
            />
            <p class="mt-16 mt-lg-24" v-html="$t('application-area.pack')" />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="epro-capabilities">
      <b-container>
        <h2
          class="text-center my-56 my-lg-96"
          v-html="$t('epro-capabilities.title')"
        />
        <div class="d-lg-none">
          <b-row>
            <b-col cols="12" md="6">
              <div class="text-center">
                <img
                  src="/images/pro-logic/intro-capabilities/rule.jpg"
                  alt="rule"
                  class="mb-32"
                />
              </div>
              <h6 class="ml-40" v-html="$t('epro-capabilities.rule.title')" />
              <ul class="ml-32 mb-56">
                <li>{{ $t('epro-capabilities.rule.engines') }}</li>
                <li>{{ $t('epro-capabilities.rule.heating') }}</li>
                <li>{{ $t('epro-capabilities.rule.fridge') }}</li>
              </ul>
            </b-col>
            <b-col cols="12" md="6">
              <div class="text-center">
                <img
                  src="/images/pro-logic/intro-capabilities/data-transfer.jpg"
                  alt="rule"
                  class="mb-32"
                />
              </div>
              <h6
                class="ml-40"
                v-html="$t('epro-capabilities.data-transfer.title')"
              />
              <ul class="ml-32 mb-56">
                <li>{{ $t('epro-capabilities.data-transfer.ops') }}</li>
                <li>{{ $t('epro-capabilities.data-transfer.scada') }}</li>
              </ul>
            </b-col>
            <b-col cols="12" md="6">
              <div class="text-center">
                <img
                  src="/images/pro-logic/intro-capabilities/control.jpg"
                  alt="rule"
                  class="mb-32"
                />
              </div>
              <h6
                class="ml-40"
                v-html="$t('epro-capabilities.control.title')"
              />
              <ul class="ml-32 mb-56">
                <li>{{ $t('epro-capabilities.control.switch') }}</li>
                <li>{{ $t('epro-capabilities.control.areaParams') }}</li>
                <li>{{ $t('epro-capabilities.control.count') }}</li>
              </ul>
            </b-col>
            <b-col cols="12" md="6">
              <div class="text-center">
                <img
                  src="/images/pro-logic/intro-capabilities/human-machine.jpg"
                  alt="rule"
                  class="mb-32 hm-img"
                />
              </div>
              <h6
                class="ml-40"
                v-html="$t('epro-capabilities.human-machine.title')"
              />
              <ul class="ml-32 mb-56">
                <li>{{ $t('epro-capabilities.human-machine.panel') }}</li>
                <li>{{ $t('epro-capabilities.human-machine.indicators') }}</li>
              </ul>
            </b-col>
          </b-row>
        </div>
        <img
          src="/images/pro-logic/intro-capabilities/epro-capabilities.jpg"
          alt="epro-capabilities"
          class="img-fluid d-none d-lg-block"
        />
      </b-container>
    </section>

    <section class="benefits">
      <h2
        class="text-center pt-56 pb-32 pt-lg-80"
        v-html="$t('benefits.title')"
      />
      <b-container>
        <b-row class="mb-64 pb-4 mt-lg-40">
          <b-col md="6" class="mb-48 mb-lg-0">
            <img
              src="/images/pro-logic/benefits/terminals-xs.png"
              class="img-fluid d-lg-none"
              alt="terminals"
            />
            <img
              src="/images/pro-logic/benefits/terminals.png"
              class="img-fluid d-none d-lg-block"
              alt="terminals"
            />
          </b-col>
          <b-col md="6" offset-xl="1" xl="5" class="align-self-center">
            <h5 class="ml-24" v-html="$t('benefits.terminals.title')" />
            <ul class="list-primary list-check pb-2 pb-md-24 ml-24">
              <li>{{ $t('benefits.terminals.li1') }}</li>
              <li>{{ $t('benefits.terminals.li2') }}</li>
              <li>{{ $t('benefits.terminals.li3') }}</li>
              <li>{{ $t('benefits.terminals.li4') }}</li>
              <li>{{ $t('benefits.terminals.li5') }}</li>
            </ul>
          </b-col>
        </b-row>
        <b-row class="mb-64 pb-4 mt-40">
          <b-col md="6" order-md="2" offset-xl="1" class="mb-48 mb-lg-0">
            <img
              src="/images/pro-logic/benefits/indication-panel-xs.png"
              class="img-fluid d-lg-none"
              alt="terminals"
            />
            <img
              src="/images/pro-logic/benefits/indication-panel.png"
              class="img-fluid d-none d-lg-block"
              alt="terminals"
            />
          </b-col>
          <b-col md="6" order-md="1" xl="5" class="align-self-center">
            <h5 class="ml-24" v-html="$t('benefits.indication-panel.title')" />
            <ul class="list-primary list-check pb-2 pb-md-24 ml-24">
              <li>{{ $t('benefits.indication-panel.li1') }}</li>
              <li>{{ $t('benefits.indication-panel.li2') }}</li>
              <li>{{ $t('benefits.indication-panel.li3') }}</li>
              <li>{{ $t('benefits.indication-panel.li4') }}</li>
            </ul>
          </b-col>
        </b-row>
        <b-row class="mt-lg-40">
          <b-col md="6" class="mb-48 mb-lg-0">
            <img
              src="/images/pro-logic/benefits/integration-xs.png"
              class="img-fluid d-lg-none"
              alt="terminals"
            />
            <img
              src="/images/pro-logic/benefits/integration.png"
              class="img-fluid d-none d-lg-block"
              alt="terminals"
            />
          </b-col>
          <b-col md="6" offset-xl="1" xl="5" class="align-self-center">
            <h5 v-html="$t('benefits.integration.title')" />
            <p>{{ $t('benefits.integration.p') }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="mb-72">
      <b-container>
        <h2
          class="text-center py-56 pb-32 pt-lg-80"
          v-html="$t('econonmy.title')"
        />

        <b-row>
          <b-col cols="12" lg="5">
            <img
              src="/images/pro-logic/economy/size.jpg"
              class="img-fluid"
              alt="size"
            />
            <h6
              class="text-center mt-32 mb-56 mb-lg-0"
              v-html="$t('econonmy.size')"
            />
          </b-col>
          <b-col cols="12" lg="5" offset-lg="2">
            <img
              src="/images/pro-logic/economy/din.jpg"
              class="img-fluid"
              alt="din"
            />
            <h6 class="text-center mt-32" v-html="$t('econonmy.din')" />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="pb-72 pink-bg">
      <b-container>
        <h2
          class="text-center py-56 pt-lg-80 mb-0"
          v-html="$t('scale.title')"
        />

        <b-row>
          <b-col cols="12" lg="7" order-lg="2" class="text-center">
            <img
              src="/images/pro-logic/scalability-features/scale.png"
              class="img-fluid d-none d-lg-block"
              alt="din"
            />
            <img
              src="/images/pro-logic/scalability-features/scale-xs.png"
              class="img-fluid d-lg-none mb-32"
              alt="din"
            />
          </b-col>
          <b-col cols="12" lg="5" order-lg="1" class="align-self-center">
            <h4 class="mb-3" v-html="$t('scale.subtitle')"></h4>
            <ul class="pl-24">
              <li>{{ $t('scale.li1') }}</li>
              <li>{{ $t('scale.li2') }}</li>
              <li v-html="$t('scale.li3')" />
              <li>{{ $t('scale.li4') }}</li>
            </ul>
            <h6 class="mb-24" v-html="$t('scale.count')" />
            <b-button
              href="https://ekfgroup.com/catalog/moduli-rasshireniya-dlya-kontrollerov-pro-logic"
              variant="primary"
            >
              {{ $t('goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="pb-72">
      <b-container>
        <h2 class="text-center py-56 py-lg-80" v-html="$t('features.title')" />

        <b-row class="d-lg-none">
          <b-col cols="12">
            <div class="img-block text-center mb-32">
              <img
                src="/images/pro-logic/scalability-features/1.jpg"
                class="img-fluid"
                alt="features1"
              />
            </div>

            <h4 v-html="$t('features.sensor')" />
            <p class="fs-4">
              <span class="font-weight-bold">{{
                $t('features.thermal-resistance')
              }}</span>
              Pt100, Pt1000, Cu50, Cu100
            </p>
            <p class="fs-4">
              <span class="font-weight-bold">
                {{ $t('features.thermal-pair') }}</span
              >
              <br />
              S, K, E, J, B, N, R, Wre3/25, Wre5/26
            </p>
          </b-col>
          <b-col class="mt-40">
            <b-row>
              <b-col class="text-center">
                <img
                  src="/images/pro-logic/scalability-features/2.jpg"
                  class="img-fluid"
                  alt="features1"
                />
                <p class="font-weight-bold fs-2">
                  {{ $t('features.flow-meters') }}
                </p>
              </b-col>
              <b-col class="text-center">
                <img
                  src="/images/pro-logic/scalability-features/3.jpg"
                  class="img-fluid"
                  alt="features1"
                />
                <p class="font-weight-bold fs-2">
                  {{ $t('features.encoders') }}
                </p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="d-lg-none">
          <b-col>
            <h4 class="mt-16" v-html="$t('features.count')" />
            <p v-html="$t('features.high-speed')" />
          </b-col>
        </b-row>

        <img
          src="/images/pro-logic/scalability-features/features.jpg"
          class="img-fluid d-none d-lg-block mb-32"
          alt="features"
        />
      </b-container>
    </section>

    <section class="py-72 pink-bg">
      <b-container>
        <b-row>
          <b-col
            cols="12"
            lg="5"
            order-lg="2"
            offset-lg="1"
            class="text-center"
          >
            <img
              src="/images/pro-logic/settings-specifications-po/easy.png"
              class="img-fluid d-none d-lg-block"
              alt="easy-settings"
            />
            <h2
              class="text-center d-lg-none"
              v-html="$t('easy-to-set-up.title')"
            />
            <img
              src="/images/pro-logic/settings-specifications-po/easy-xs.png"
              class="img-fluid d-lg-none mb-32 mt-48 mt-lg-0"
              alt="easy-settings"
            />
          </b-col>
          <b-col cols="12" lg="6" order-lg="1" class="align-self-center">
            <h2 class="d-none d-lg-block" v-html="$t('easy-to-set-up.title')" />
            <ul class="pl-lg-24 mb-lg-40">
              <li>
                {{ $t('easy-to-set-up.li1') }}
                <span class="font-weight-lg-bold-custom">
                  {{ $t('easy-to-set-up.li1-2') }}</span
                >
              </li>
              <li>
                {{ $t('easy-to-set-up.li2') }}
                <span class="font-weight-lg-bold-custom">
                  {{ $t('easy-to-set-up.li2-2') }}</span
                >
              </li>
              <li>
                {{ $t('easy-to-set-up.li3') }}
                <span class="font-weight-lg-bold-custom">
                  {{ $t('easy-to-set-up.li3-2') }}</span
                >
              </li>
              <li>
                {{ $t('easy-to-set-up.li4') }}
                <span class="font-weight-lg-bold-custom">
                  {{ $t('easy-to-set-up.li4-2') }}</span
                >
              </li>
            </ul>
            <b-button
              href="https://ekfgroup.com/catalog/programmiruemye-ustrojstva-plc-hmi"
              variant="primary"
              class=""
            >
              {{ $t('goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="common-spec py-72 py-lg-96">
      <b-container>
        <b-row>
          <b-col cols="12" lg="4">
            <h2
              class="d-lg-none mb-64 text-center"
              v-html="$t('common-spec.title')"
            />
            <div class="text-center">
              <img
                src="/images/pro-logic/settings-specifications-po/specifications.jpg"
                class="img-fluid mb-40 mb-lg-0"
                alt="easy-settings"
              />
            </div>

            <div class="d-lg-none">
              <p>
                <span class="font-weight-bold">{{
                  $t('common-spec.bold.1')
                }}</span>
                {{ $t('common-spec.light.1') }}
              </p>
              <p>
                <span class="font-weight-bold">
                  {{ $t('common-spec.bold.2') }}</span
                >
                <br />{{ $t('common-spec.light.2') }}
              </p>
              <p>
                <span class="font-weight-bold">{{
                  $t('common-spec.bold.3')
                }}</span>
                {{ $t('common-spec.light.3') }}
              </p>
              <p>
                <span class="font-weight-bold">{{
                  $t('common-spec.bold.4')
                }}</span>
                {{ $t('common-spec.light.4') }}
              </p>
              <p>
                <span class="font-weight-bold">{{
                  $t('common-spec.bold.5')
                }}</span>
                {{ $t('common-spec.light.5') }}
              </p>
              <p>
                <span class="font-weight-bold">{{
                  $t('common-spec.bold.6')
                }}</span>
                <br />
                {{ $t('common-spec.light.6') }}
              </p>
            </div>
          </b-col>
          <b-col
            cols="12"
            offset-lg="1"
            lg="7"
            class="align-self-center d-none d-lg-block"
          >
            <h2 class="d-none d-lg-block" v-html="$t('common-spec.title')" />
            <b-row class="mb-8">
              <b-col cols="6">
                <span class="font-weight-bold"
                  >{{ $t('common-spec.bold.1') }}
                </span>
              </b-col>
              <b-col cols="6"> {{ $t('common-spec.light.1') }} </b-col>
            </b-row>
            <b-row class="mb-8">
              <b-col cols="6">
                <span class="font-weight-bold"
                  >{{ $t('common-spec.bold.2') }}
                </span>
              </b-col>
              <b-col cols="6"> {{ $t('common-spec.light.2') }} </b-col>
            </b-row>
            <b-row class="mb-8">
              <b-col cols="6">
                <span class="font-weight-bold"
                  >{{ $t('common-spec.bold.3') }}
                </span>
              </b-col>
              <b-col cols="6"> {{ $t('common-spec.light.3') }} </b-col>
            </b-row>
            <b-row class="mb-8">
              <b-col cols="6">
                <span class="font-weight-bold"
                  >{{ $t('common-spec.bold.4') }}
                </span>
              </b-col>
              <b-col cols="6"> {{ $t('common-spec.light.4') }} </b-col>
            </b-row>
            <b-row class="mb-8">
              <b-col cols="6">
                <span class="font-weight-bold"
                  >{{ $t('common-spec.bold.5') }}
                </span>
              </b-col>
              <b-col cols="6"> {{ $t('common-spec.light.5') }} </b-col>
            </b-row>
            <b-row class="mb-8">
              <b-col cols="6">
                <span class="font-weight-bold"
                  >{{ $t('common-spec.bold.6') }}
                </span>
              </b-col>
              <b-col cols="6"> {{ $t('common-spec.light.6') }} </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="py-72 pink-bg">
      <b-container>
        <b-row>
          <b-col
            cols="12"
            lg="5"
            order-lg="2"
            offset-lg="1"
            class="text-center"
          >
            <img
              src="/images/pro-logic/settings-specifications-po/po.png"
              class="img-fluid d-none d-lg-block"
              alt="easy-settings"
            />
            <h2 class="text-center d-lg-none" v-html="$t('po.title')" />
            <img
              src="/images/pro-logic/settings-specifications-po/po-xs.png"
              class="img-fluid d-lg-none mb-32 mt-48 mt-lg-0"
              alt="easy-settings"
            />
          </b-col>
          <b-col cols="12" lg="5" order-lg="1" class="align-self-center">
            <h2 class="d-none d-lg-block" v-html="$t('po.title')" />
            <p class="pl-16 pl-lg-0 mb-40" v-html="$t('po.p')" />
            <b-button href="/files/pro-logic/po-2023-11.rar" variant="primary">
              {{ $t('po.load-po') }}
            </b-button>
            <b-button
              href="/files/pro-logic/instruction.pdf"
              variant="outline-primary"
              class="mt-16 mt-lg-0 ml-lg-12"
            >
              {{ $t('po.load-instruction') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-72 py-lg-96">
      <b-container>
        <h2 class="mb-64 text-center" v-html="$t('table-section.title')" />
        <b-row>
          <b-col cols="12">
            <h5 class="text-center" v-html="$t('table-section.f-100.title')" />
            <b-table
              :fields="fields100"
              :items="items100"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`fields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" class="mt-40 mt-lg">
            <h5 class="text-center" v-html="$t('table-section.f-200.title')" />
            <b-table
              :fields="fields200"
              :items="items200"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`fields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.discrete.title')"
            />
            <b-table
              :fields="discreteModulesFields"
              :items="discreteModulesItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`discreteModulesFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5 class="text-center" v-html="$t('table-section.analog.title')" />
            <b-table
              :fields="analogModulesFields"
              :items="analogModulesItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`analogModulesFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.temperature.title')"
            />
            <b-table
              :fields="temperatureFields"
              :items="temperatureItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`temperatureFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.interface.title')"
            />
            <b-table
              :fields="interfaceModuleFields"
              :items="interfaceModuleItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`interfaceModuleFields.${column}`) }}
              </template>
            </b-table>
          </b-col>

          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.discreteRemf.title')"
            />
            <b-table
              :fields="discreteModulesFields"
              :items="discreteRemfItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`discreteModulesFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.analogRemf.title')"
            />
            <b-table
              :fields="discreteModulesFields"
              :items="analogRemfItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`discreteModulesFields.${column}`) }}
              </template>
            </b-table>

            <h5
              class="text-center mt-40"
              v-html="$t('table-section.temperatureRemf.title')"
            />
            <b-table
              :fields="temperatureFields"
              :items="temperatureRemfItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`temperatureFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.discreteEremf.title')"
            />
            <b-table
              :fields="discreteModulesFields"
              :items="discreteEremfItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`discreteModulesFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="6" class="mt-40 mt-lg">
            <h5
              class="text-center"
              v-html="$t('table-section.analogEremf.title')"
            />
            <b-table
              :fields="discreteModulesFields"
              :items="analogEremfItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`discreteModulesFields.${column}`) }}
              </template>
            </b-table>

            <h5
              class="text-center mt-40"
              v-html="$t('table-section.temperatureEremf.title')"
            />
            <b-table
              :fields="temperatureFields"
              :items="temperatureEremfItems"
              responsive
              bordered
              striped
            >
              <template #head()="{ column }">
                {{ $t(`temperatureFields.${column}`) }}
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-72 pink-bg">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" order-lg="2" class="text-center">
            <img
              src="/images/pro-logic/completed-projects.png"
              class="img-fluid d-none d-lg-block"
              alt="easy-settings"
            />
            <h2
              class="text-center d-lg-none"
              v-html="$t('completed-projects.title')"
            />
            <img
              src="/images/pro-logic/completed-projects-xs.png"
              class="img-fluid d-lg-none mb-32 mt-48 mt-lg-0"
              alt="easy-settings"
            />
          </b-col>
          <b-col cols="12" lg="6" order-lg="1" class="align-self-center">
            <h2
              class="d-none d-lg-block"
              v-html="$t('completed-projects.title')"
            />
            <p
              class="pl-16 pl-lg-0 mb-40"
              v-html="$t('completed-projects.p')"
            />
            <b-button
              target="_blank"
              to="/files/pro-logic/completed-projects.pdf"
              variant="primary"
            >
              {{ $t('completed-projects.load') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <ProLogicSectionVideo class="py-48 py-lg-96" />
  </main>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BTable,
  },
  data() {
    return {
      fields100: [
        'vendorCode',
        'inputsDiscrete',
        'discreteOutputs',
        'outputsAnalog',
        'analogInputs',
        'highSpeedInputs',
        'highSpeedOutputs',
        'com',
        'max',
      ],
      fields200: [
        'vendorCode',
        'inputsDiscrete',
        'discreteOutputs',
        'outputsAnalog',
        'analogInputs',
        'highSpeedInputs',
        'highSpeedOutputs',
        'com',
        'max',
      ],
      discreteModulesFields: ['articul', 'inputsDiscrete', 'discreteOutputs'],
      analogModulesFields: ['articul', 'inputsDiscrete', 'discreteOutputs'],
      temperatureFields: ['articul', 'plugin'],
      interfaceModuleFields: ['articul', 'interface'],
      items100: [
        {
          vendorCode: 'F100-10-R',
          inputsDiscrete: 6,
          discreteOutputs: 4 + ' ' + this.$t('relay'),
          outputsAnalog: '',
          analogInputs: '',
          highSpeedInputs: this.$t('no'),
          highSpeedOutputs: this.$t('no'),
          com: '1хEthernet 1хRS-485',
          max: 5,
        },
        {
          vendorCode: 'F100-10-N',
          inputsDiscrete: 6,
          discreteOutputs: '4 NPN',
          outputsAnalog: '',
          analogInputs: '',
          highSpeedInputs: this.$t('no'),
          highSpeedOutputs: this.$t('no'),
          com: '1хEthernet 1хRS-485',
          max: 5,
        },
        {
          vendorCode: 'F100-16-R',
          inputsDiscrete: 8,
          discreteOutputs: 8 + ' ' + this.$t('relay'),
          outputsAnalog: '',
          analogInputs: '',
          highSpeedInputs: this.$t('no'),
          highSpeedOutputs: this.$t('no'),
          com: '1хEthernet 1хRS-485',
          max: 5,
        },
        {
          vendorCode: 'F100-16-N',
          inputsDiscrete: 8,
          discreteOutputs: '8 NPN',
          outputsAnalog: '',
          analogInputs: '',
          highSpeedInputs: this.$t('no'),
          highSpeedOutputs: this.$t('no'),
          com: '1хEthernet 1хRS-485',
          max: 5,
        },
        {
          vendorCode: 'F100-12A-R',
          inputsDiscrete: 4,
          discreteOutputs: 4 + ' ' + this.$t('relay'),
          outputsAnalog: 2,
          analogInputs: 2,
          highSpeedInputs: this.$t('no'),
          highSpeedOutputs: this.$t('no'),
          com: '1хEthernet 1хRS-485',
          max: 5,
        },
        {
          vendorCode: 'F100-12A-N',
          inputsDiscrete: 4,
          discreteOutputs: '4 NPN',
          outputsAnalog: 2,
          analogInputs: 2,
          highSpeedInputs: this.$t('no'),
          highSpeedOutputs: this.$t('no'),
          com: '1хEthernet 1хRS-485',
          max: 5,
        },
      ],
      items200: [
        {
          vendorCode: 'F200-16-R-P20',
          inputsDiscrete: 8,
          discreteOutputs: 8 + ' ' + this.$t('relay'),
          outputsAnalog: '',
          analogInputs: '',
          highSpeedInputs: 2,
          highSpeedOutputs: '',
          com: '1хEthernet 1хRS-485',
          max: 15,
        },
        {
          vendorCode: 'F200-16-N-P22',
          inputsDiscrete: 8,
          discreteOutputs: '8 NPN',
          outputsAnalog: '',
          analogInputs: '',
          highSpeedInputs: 2,
          highSpeedOutputs: 2,
          com: '1хEthernet 1хRS-485',
          max: 15,
        },
        {
          vendorCode: 'F200-12A-R-P10',
          inputsDiscrete: 4,
          discreteOutputs: 4 + ' ' + this.$t('relay'),
          outputsAnalog: 2,
          analogInputs: 2,
          highSpeedInputs: 1,
          highSpeedOutputs: '',
          com: '1хEthernet 1хRS-485',
          max: 15,
        },
        {
          vendorCode: 'F200-12A-N-P11',
          inputsDiscrete: 4,
          discreteOutputs: '4 NPN',
          outputsAnalog: 2,
          analogInputs: 2,
          highSpeedInputs: 1,
          highSpeedOutputs: 1,
          com: '1хEthernet 1хRS-485',
          max: 15,
        },
      ],
      discreteModulesItems: [
        {
          articul: 'EMF-D-8X',
          inputsDiscrete: '8',
          discreteOutputs: '',
        },
        {
          articul: 'EMF-D-8Y-R',
          inputsDiscrete: '',
          discreteOutputs: 8 + ' ' + this.$t('relay'),
        },
        {
          articul: 'EMF-D-8Y-N',
          inputsDiscrete: '',
          discreteOutputs: '8 NPN',
        },
        {
          articul: 'EMF-D-4X4Y-R',
          inputsDiscrete: '4',
          discreteOutputs: 4 + ' ' + this.$t('relay'),
        },
        {
          articul: 'EMF-D-4X4Y-N',
          inputsDiscrete: '4',
          discreteOutputs: '4 NPN',
        },
        {
          articul: 'EMF-D-16X',
          inputsDiscrete: '16',
          discreteOutputs: '',
        },
        {
          articul: 'EMF-D-16Y-R',
          inputsDiscrete: '',
          discreteOutputs: 16 + ' ' + this.$t('relay'),
        },
        {
          articul: 'EMF-D-16Y-N',
          inputsDiscrete: '',
          discreteOutputs: '16 NPN',
        },
      ],
      discreteRemfItems: [
        {
          articul: 'REMF-D-16X',
          inputsDiscrete: '16',
          discreteOutputs: '',
        },
        {
          articul: 'REMF-D-40X',
          inputsDiscrete: '40',
          discreteOutputs: '',
        },
        {
          articul: 'REMF-D-16Y-R',
          inputsDiscrete: '',
          discreteOutputs: '16 э/м-реле',
        },
        {
          articul: 'REMF-D-16Y-N',
          inputsDiscrete: '',
          discreteOutputs: '16 NPN',
        },
        {
          articul: 'REMF-D-36Y-R',
          inputsDiscrete: '',
          discreteOutputs: '36 э/м-реле',
        },
        {
          articul: 'REMF-D-36Y-N',
          inputsDiscrete: '',
          discreteOutputs: '36 NPN',
        },
        {
          articul: 'REMF-D-8X8Y-R',
          inputsDiscrete: '8',
          discreteOutputs: '8 э/м-реле',
        },
        {
          articul: 'REMF-D-8X8Y-N',
          inputsDiscrete: '8',
          discreteOutputs: '8 NPN',
        },
        {
          articul: 'REMF-D-20X20Y-R',
          inputsDiscrete: '20',
          discreteOutputs: '20 э/м-реле',
        },
        {
          articul: 'REMF-D-20X20Y-N',
          inputsDiscrete: '20',
          discreteOutputs: '20 NPN',
        },
      ],
      analogRemfItems: [
        {
          articul: 'REMF-A-4AI',
          inputsDiscrete: '4',
          discreteOutputs: '',
        },
        {
          articul: 'REMF-A-4AO',
          inputsDiscrete: '',
          discreteOutputs: '4',
        },
      ],
      discreteEremfItems: [
        {
          articul: 'EREMF-D-24X',
          inputsDiscrete: '24',
          discreteOutputs: '',
        },
        {
          articul: 'EREMF-D-40X',
          inputsDiscrete: '40',
          discreteOutputs: '',
        },
        {
          articul: 'EREMF-D-36Y-R',
          inputsDiscrete: '',
          discreteOutputs: '36 э/м-реле',
        },
        {
          articul: 'EREMF-D-36Y-N',
          inputsDiscrete: '',
          discreteOutputs: '36 NPN',
        },
        {
          articul: 'EREMF-D-12X12Y-R',
          inputsDiscrete: '12',
          discreteOutputs: '12 э/м-реле',
        },
        {
          articul: 'EREMF-D-12X12Y-N',
          inputsDiscrete: '12',
          discreteOutputs: '12 NPN',
        },
        {
          articul: 'EREMF-D-20X20Y-R',
          inputsDiscrete: '20',
          discreteOutputs: '20 э/м-реле',
        },
        {
          articul: 'EREMF-D-20X20Y-N',
          inputsDiscrete: '20',
          discreteOutputs: '20 NPN',
        },
      ],
      analogEremfItems: [
        {
          articul: 'EREMF-A-8AI',
          inputsDiscrete: '8',
          discreteOutputs: '',
        },
        {
          articul: 'EREMF-A-8AO',
          inputsDiscrete: '',
          discreteOutputs: '8',
        },
      ],
      analogModulesItems: [
        { articul: 'EMF-A-4AI', inputsDiscrete: '4', discreteOutputs: '' },
        { articul: 'EMF-A-4AO', inputsDiscrete: '', discreteOutputs: '4' },
        { articul: 'EMF-A-2AI2AO', inputsDiscrete: '2', discreteOutputs: '2' },
        { articul: 'EMF-A-8AI', inputsDiscrete: '8', discreteOutputs: '' },
        { articul: 'EMF-A-8AO', inputsDiscrete: '', discreteOutputs: '8' },
        { articul: 'EMF-A-4AI4AO', inputsDiscrete: '4', discreteOutputs: '4' },
      ],
      temperatureItems: [
        { articul: 'EMF-T-4TC', plugin: 4 + ' ' + this.$t('termopair') },
        { articul: 'EMF-T-4TR', plugin: 4 + ' ' + this.$t('termoresist') },
        { articul: 'EMF-T-8TC', plugin: 8 + ' ' + this.$t('termopair') },
      ],
      temperatureRemfItems: [
        { articul: 'REMF-T-4TC', plugin: 4 + ' ' + this.$t('termopair') },
        { articul: 'REMF-T-4TR', plugin: 4 + ' ' + this.$t('termoresist') },
      ],
      temperatureEremfItems: [
        { articul: 'EREMF-T-8TR', plugin: 8 + ' ' + this.$t('termoresist') },
      ],
      interfaceModuleItems: [
        {
          articul: 'EMF-I-1RS',
          interface: '1хRS-232/485 (Modbus RTU, Modbus ASCII)',
        },
      ],
      catalogLink:
        'https://ekfgroup.com/catalog/golovnye-moduli-kontrollery-pro-logic',
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

<i18n>
{
  "ru": {
    "pageTitle": "Программируемые логические контроллеры PRO-Logic",
    "fields": {
      "vendorCode": "Артикул",
      "inputsDiscrete": "Дискретные входы",
      "discreteOutputs": "Дискретные выходы",
      "outputsAnalog": "Аналоговые выходы",
      "analogInputs": "Аналоговые входы",
      "highSpeedInputs": "Высокоскоростные входы",
      "highSpeedOutputs": "Высокоскоростные выходы",
      "com": "COM-Port",
      "max": "Макс. количество модулей расширения"
    },
    "discreteModulesFields": {
      "articul": "Артикул",
      "inputsDiscrete": "Дискретные входы",
      "discreteOutputs": "Дискретные выходы"
    },
    "analogModulesFields": {
      "articul": "Артикул",
      "inputsDiscrete": "Аналоговые входы",
      "discreteOutputs": "Аналоговые выходы"
    },
    "temperatureFields": {
      "articul": "Артикул",
      "plugin": "Подключаемые датчики"
    },
    "interfaceModuleFields": {
      "articul": "Артикул",
      "interface": "Интерфейс"
    },
    "no": "нет",
    "relay": "э/м-реле",
    "termopair": "термопары",
    "termopairs": "термопар",
    "termoresist": "термосопротивления",
    "goToCatalog": "В каталог",
    "intro": {
      "sub": "Программируемые <br /> логические контроллеры",
      "title": "PRO-Logic",
      "li1": "Оптимизация процессов и снижение операционных затрат",
      "li2": "Контроль состояния оборудования и предиктивная аналитика",
      "li3": "Стабильность и безопасность работы системы",
      "whatIsPlk": "Что такое ПЛК?",
      "whatIsPlkText": "Программируемый логический контроллер (ПЛК) – это&nbsp;устройство, предназначенное для выполнения логических операций по заданной программе"
    },
    "application-area": {
      "title": "Область <br class=\"d-lg-none\"> применения",
      "heating": "Отопление, вентиляция, <br> кондиционирование",
      "metal": "Металлообработка",
      "tree": "Деревообработка",
      "water": "Водоподготовка, <br> водоотведение",
      "foodprom": "Пищевая <br> промышленность",
      "pack": "Конвейеры, упаковка, <br> розлив"
    },
    "epro-capabilities": {
      "title": "Возможности <br class=\"d-lg-none\"> PRO-Logic",
      "rule": {
        "title": "Управление",
        "engines": "Двигатели",
        "heating": "Нагреватели",
        "fridge": "Холодильные установки"
      },
      "data-transfer": {
        "title": "Сбор и передача данных",
        "ops": "OPC-cервер",
        "scada": "SCADA-cистема"
      },
      "control": {
        "title": "Контроль",
        "switch": "Переключатели",
        "areaParams": "Параметры среды",
        "count": "Счет и положение"
      },
      "human-machine": {
        "title": "Человеко-машинный интерфейс",
        "panel": "Панель оператора",
        "indicators": "Индикаторы"
      }
    },
    "benefits": {
      "title": "Преимущества <br class=\"d-lg-none\"> PRO-Logic",
      "terminals": {
        "title": "Надежный и удобный <br class=\"d-lg-none\"> монтаж",
        "li1": "Простое подключение",
        "li2": "Экономия времени",
        "li3": "Надежное соединение",
        "li4": "Устойчивость к вибрациям",
        "li5": "Не требуют протяжки"
      },
      "indication-panel": {
        "title": "Индикация состояния системы",
        "li1": "Состояние входов и выходов",
        "li2": "Состояние прибора",
        "li3": "Наличие ошибок",
        "li4": "Связь с периферийными устройствами"
      },
      "integration": {
        "title": "Интеграция в системы <br> мониторинга и управления",
        "p": "Встроенные стандартные интерфейсы для подключения к периферийным устройствам (датчики, частотники, панели оператора) и системам контроля (OPC, SCADA)"
      }
    },
    "econonmy": {
      "title": "Экономия места <br class=\"d-lg-none\"> в&nbsp;шкафу",
      "size": "Компактный размер",
      "din": "Крепление <br class=\"d-lg-none\"> на&nbsp;DIN-рейку"
    },
    "scale": {
      "title": "Масштабируемость",
      "subtitle": "Модули расширения и&nbsp;удаленного ввода/вывода:",
      "li1": "дискретные",
      "li2": "аналоговые",
      "li3": "температурные <br class=\"d-lg-none\"> (термопары, термосопротивления)",
      "li4": "интерфейсные (RS-232/485)",
      "count": "Количество точек ввода/вывода до 3408"
    },
    "features": {
      "title": "Особенности <br class=\"d-lg-none\"> входов и выходов",
      "sensor": "Подключение датчиков температуры типа «Сенсор»",
      "thermal-resistance": "Термосопротивления:",
      "thermal-pair": "Термопары:",
      "flow-meters": "Расходомеры",
      "encoders": "Энкодеры",
      "count": "Высокоскоростной счет и&nbsp;управление",
      "high-speed": "Высокоскоростные входы 200 кГц"
    },
    "easy-to-set-up": {
      "title": "Простота настройки и&nbsp;программирования",
      "li1": "Бесплатная среда разработки проектов",
      "li1-2": "PRO-Logic master",
      "li2": "Стандартные языки программирования:",
      "li2-2": "FBD, LD, IL",
      "li3": "Встроенная библиотека с поддержкой",
      "li3-2": "188 функций",
      "li4": "Встроенный симулятор",
      "li4-2": "для отладки работы системы"
    },
    "common-spec": {
      "title": "Основные характеристики",
      "bold": {
        "1": "Питание:",
        "2": "Входные/выходные сигналы:",
        "3": "Типы выходных сигналов:",
        "4": "Интерфейсы:",
        "5": "Степень пылевлагозащиты:",
        "6": "Условия окружающей среды:"
      },
      "light": {
        "1": "24V DC",
        "2": "дискретные и аналоговые",
        "3": "э/м-реле 2 А либо NPN-транзисторы",
        "4": "RS-485 и Ethernet",
        "5": "IP20",
        "6": "0…+55 ℃ и 5…95% RH"
      }
    },
    "po": {
      "title": "Программное обеспечение",
      "p": "Настройка и программирование PRO&#8209Logic осуществляется с помощью ПО  PRO&#8209;Logic master. Программное обеспечение и Руководство попрограммированию  доступны для бесплатного скачивания.",
      "load-po": "Скачать ПО",
      "load-instruction": "Скачать Руководство"
    },
    "table-section": {
      "title": "Модификации контроллеров, модулей <br> расширения и модулей ввода/вывода",
      "f-100": {
        "title": "Серия PRO-Logic F100"
      },
      "f-200": {
        "title": "Серия PRO-Logic F200"
      },
      "discrete": {
        "title": "Дискретные модули расширения"
      },
      "analog": {
        "title": "Аналоговые модули расширения"
      },
      "temperature": {
        "title": "Температурные модули расширения"
      },
      "interface": {
        "title": "Интерфейсный модуль расширения"
      },
      "discreteRemf": {
        "title": "Дискретные модули ввода/вывода <br> PRO-Logic REMF с «RS-485»"
      },
      "analogRemf": {
        "title": "Аналоговые модули ввода/вывода <br> PRO-Logic REMF с «RS-485»"
      },
      "temperatureRemf": {
        "title": "Температурные модули ввода <br> PRO-Logic REMF"
      },
      "discreteEremf": {
        "title": "Дискретные модули ввода/вывода <br> PRO-Logic EREMF с «RS-485 и Ethernet»"
      },
      "analogEremf": {
        "title": "Аналоговые модули ввода/вывода <br> PRO-Logic EREMF с «RS-485 и Ethernet»"
      },
      "temperatureEremf": {
        "title": "Температурные модули ввода <br> PRO-Logic EREMF"
      }
    },
    "completed-projects": {
      "title": "Реализованные <br> проекты",
      "p": "Скачайте перечень реализованных проектов с&nbsp;использованием оборудования PRO-Logic",
      "load": "Скачать"
    }
  }
}
</i18n>

<style lang="scss">
.pro-logic-landing {
  .hm-img {
    max-height: 218px;
  }
  .btn {
    display: block;
  }
  table {
    thead {
      th {
        font-size: 0.875rem;
        padding: 0.7rem;
        padding-right: 0.7rem;
        text-align: center;
        vertical-align: middle;
        background-color: #f5f1ed;
        &:first-of-type {
          min-width: 8.75rem;
        }
      }
    }
    tr {
      td {
        font-size: 0.875rem;
        text-align: center;
        vertical-align: middle;
        padding: 0.5rem;
      }
    }
  }

  .table-striped > tbody > tr:nth-child(even) > td,
  .table-striped > tbody > tr:nth-child(even) > th {
    background-color: #f5f1ed;
  }

  .intro {
    padding: 1rem 0;
    background-color: #f5f1ed;
    .title {
      font-size: 3.75rem;
    }
  }
  .application-area {
    background-color: #f5f1ed;
  }
  .benefits {
    background-color: #f5f1ed;
    padding-bottom: 4rem;
    li {
      font-size: 1.125rem;
    }
  }
  .pink-bg {
    background-color: #f5f1ed;
  }
}

@include media-breakpoint-up(lg) {
  .pro-logic-landing {
    .font-weight-lg-bold-custom {
      font-weight: $font-weight-bold;
    }
    .btn {
      display: inline-flex;
      &.btn-primary {
        padding-left: 4rem;
        padding-right: 4rem;
      }
    }
    .intro {
      padding: 5.25rem 0;
      .title {
        font-size: 6.25rem;
      }
      .white-rectangle {
        background-color: #fff;
        border-radius: 16px;
      }
    }
    .benefits {
      padding-bottom: 7rem;
    }
  }
}
</style>
