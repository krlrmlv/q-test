<template>
  <div class="card card-library">
    <div class="card-body pb-0">
      <b-img-lazy
        :src="library.image"
        :alt="$t(`${library.key}.title`)"
        height="44"
      />
    </div>

    <div class="card-body pt-24">
      <DropdownFullscreen
        v-if="library.files && library.files.length"
        :text="$t('support.libraries.downloadLibraries')"
        variant="gray-200"
      >
        <li
          v-for="file in library.files"
          :key="`${library.key}-${file.key}`"
          role="presentation"
        >
          <component
            :is="file.external ? 'SeoLink' : 'BLink'"
            :href="file.href"
            :to="file.to"
            :target="file.external ? '_blank' : '_self'"
            class="dropdown-item dropdown-item-icon"
            @click="minboxEvent"
            download
          >
            <svg-icon :name="`file/${file.type}-24`" width="24" height="24" />
            <span>
              {{ $t(`${library.key}.${file.key}`) }}
              <span v-if="file.size && file.type" class="text-muted">
                ({{ file.type.toUpperCase() }}, {{ $humanFileSize(file.size) }})
              </span>
            </span>
          </component>
        </li>

        <li v-if="library.fileAll" role="presentation">
          <component
            :is="library.fileAll.external ? 'SeoLink' : 'BLink'"
            :href="library.fileAll.href"
            :target="library.fileAll.external ? '_blank' : '_self'"
            class="dropdown-item dropdown-item-all"
            @click="minboxEvent"
            download
          >
            <span>
              {{ $t('downloadAll') }}
              <span
                v-if="library.fileAll.size && library.fileAll.type"
                class="text-muted"
              >
                ({{ library.fileAll.type.toUpperCase() }},
                {{ $humanFileSize(library.fileAll.size) }})
              </span>
            </span>
          </component>
        </li>
      </DropdownFullscreen>

      <component
        :is="library.external ? 'SeoLink' : 'BButton'"
        v-else
        :href="library.href"
        :target="library.external ? '_blank' : null"
        :to="localePath(library.to)"
        :class="library.external ? 'btn' : null"
        class="btn-gray-200"
        @click="minboxEvent"
      >
        <span>
          {{ $t(`${library.key}.linkText`) }}
          <span v-if="library.type" class="text-nowrap text-uppercase">
            &nbsp;({{ library.type
            }}<span v-if="library.size"
              >, {{ $humanFileSize(library.size) }}</span
            >)
          </span>
        </span>
      </component>
    </div>
  </div>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: { BImgLazy },
  props: {
    library: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    async minboxEvent() {
      await sendToMindbox('EKFGroup.DownloadLibraries', {
        customerAction: {
          customFields: {
            librarySection: this.library?.title,
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-library {
  height: 100%;
  transition: $transition-base;
  transition-property: box-shadow;

  &:hover {
    box-shadow: $box-shadow;
  }

  .card-body {
    padding: 2.5rem;
  }

  ::v-deep {
    .dropdown-item-all {
      display: flex;
      align-items: center;
      min-height: calc(24px + 1rem);
      padding-left: 0.5rem;
      color: $primary;

      &::before {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        margin-right: 0.5rem;
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .card-library {
    box-shadow: $box-shadow-sm;
  }
}
</style>

<i18n>
{
  "en": {
    "autocad": {
      "autoSpec": "Automatic BOM generation without kitting",
      "autoSpecKits": "Automatic BOM generation with assembly by kits",
      "autoSpecManual": "Instructions for automatic BOM generation",
      "dynamicTrayBlocks": "Dynamic tray blocks",
      "electricalBase": "EKF base for AutoCAD Electrical",
      "installation": "Installation guide",
      "lightBase": "Element base for lighting",
      "lightningProtectionBase3d": "Lightning protection 3D plans base",
      "lightningProtectionBaseKupol": "Lightning protection Kupol plans base",
      "lightningRods": "Lightning rods",
      "planBase": "Element base for creating plans",
      "schemeBase": "Element base for creating circuits",
      "title": "Autocad",
      "typicalSchemes": "Typical schemes",
      "userGuide": "User guide – EKF"
    },
    "downloadAll": "Download all",
    "eplan": {
      "linkText": "Download archive",
      "title": "EPLAN"
    },
    "mb": "MB",
    "models": {
      "linkText": "Go to 3D-models",
      "title": "3D-models"
    },
    "nanocad": {
      "automation": "nanoCAD Electro: Automation equipment",
      "boards": "nanoCAD Electro: Boards and housings",
      "distribution": "nanoCAD Electro: Power distribution equipment",
      "installation": "nanoCAD Electro: Electrical installation equipment",
      "measuring": "nanoCAD Electro: Measuring equipment",
      "opsBase": "nanoCAD OPS: EKF data base",
      "sksBase": "nanoCAD SKS: EKF data base",
      "sksTrays": "nanoCAD SKS: Metal trays",
      "title": "nanoCAD",
      "trays": "nanoCAD Electro: Metal trays",
      "wiring": "nanoCAD Electro: Wiring accessories"
    },
    "revit": {
      "mo-tesla": "Модульное оборудование (плагин TeslaBIM) v16.1, Revit 2019/2024",
      "mo-el": "Модульное оборудование (плагин Elprodject) v1.0",
      "tesla-bim": "Силовое оборудование (плагин TeslaBIM)",
      "plugin-ekf": "Системы прокладки кабеля (плагин EKF)",
      "cabel-sys": "Системы прокладки кабеля",
      "corpus": "Щиты корпуса и комплектующие",
      "corpus-tesla-bim": "Щиты корпуса и комплектующие (плагин TeslaBIM)",
      "eui": "Электроустановочные изделия",
      "light": "Светотехника",
      "count": "Измерительная аппаратура",
      "molni": "Молниезащита (плагин EKF)"
    }
  },
  "ru": {
    "autocad": {
      "autoSpec": "Автоматическое создание спецификации без компоновки по комплектам",
      "autoSpecKits": "Автоматическое создание спецификации с компоновкой по комплектам",
      "autoSpecManual": "Инструкция по автоматическому созданию спецификации",
      "dynamicTrayBlocks": "Динамические блоки лотков",
      "electricalBase": "База EKF для AutoCAD Electrical",
      "installation": "Инструкция по установке EKF для AutoCAD Electrical",
      "lightBase": "Элементная база светильников",
      "lightningProtectionBase3d": "База для планов МЗ 3D молниезащита",
      "lightningProtectionBaseKupol": "База для планов EKF МЗ Купол",
      "lightningRods": "Молниеприемники",
      "planBase": "Элементная база для создания планов",
      "schemeBase": "Элементная база для создания схем",
      "title": "Autocad",
      "typicalSchemes": "Типовые схемы",
      "userGuide": "Руководство пользователя – EKF"
    },
    "downloadAll": "Скачать всё",
    "eplan": {
      "linkText": "Скачать архив",
      "title": "EPLAN"
    },
    "mb": "МБ",
    "models": {
      "linkText": "Перейти к 3D-моделям",
      "title": "3D-модели"
    },
    "nanocad": {
      "mo-2": "Модульное оборудование v2.0",
      "so-2": "Силовое оборудование v2.0",
      "kip-2": "Автоматиация и КИП v2.0",
      "spk-2": "Системы прокладки кабеля v2.0",
      "corpusa-2": "Щиты корпуса и комплектующие v2.0",
      "eui-2": "Электроустановочные изделия v2.0",
      "sveto-2": "Светотехника v2.0",
      "ia-2": "Измерительная аппаратура v2.0",
      "molni-2": "Молниезащита v2.0",
      "osn-2": "Оборудование среднего напряжения v2.0",
      "to-2": "Телекоммуникационное оборудование v2.0",
      "bzd-2": "Бытовые звонки и домофоны 2.0",
      "pido": "Программы и дополнительное оборудование"
    },
    "revit": {
      "mo-tesla": "Модульное оборудование (плагин TeslaBIM) v16.1, Revit 2019/2024",
      "mo-el": "Модульное оборудование (плагин Elprodject) v1.0",
      "tesla-bim": "Силовое оборудование (плагин TeslaBIM) v16.1, Revit 2019/2024",
      "sil-3d": "Силовое оборудование (3D) v2.0",
      "plugin-ekf": "Системы прокладки кабеля (плагин EKF) v1.0",
      "cabel-sys": "Системы прокладки кабеля v2.0",
      "corpus": "Щиты корпуса и комплектующие v2.0",
      "corpus-tesla-bim": "Щиты корпуса и комплектующие (плагин TeslaBIM) v16.1, Revit 2019/2024",
      "eui": "Электроустановочные изделия v2.0",
      "light": "Светотехника v2.0",
      "count": "Измерительная аппаратура v2.0",
      "molni": "Молниезащита (плагин EKF) v1.0"
    }
  }
}
</i18n>
