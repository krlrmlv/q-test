<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('support.bitrix.title') }}</h1>

      <p class="mb-32">
        {{ $t('support.bitrix.description') }}
      </p>

      <section class="mb-32 mb-lg-48">
        <h4 v-html="$t('installation.title')" />

        <div v-html="$t('installation.content')" />
      </section>

      <section class="mb-32 mb-lg-64">
        <h4 v-html="$t('guide.title')" />

        <div v-html="$t('guide.content')" />
      </section>
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'support.bitrix.title', active: true }],
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
::v-deep {
  span.text-primary {
    word-wrap: break-word;
  }
}
</style>

<i18n>
{
  "en": {
    "guide": {
      "content": "<p class='mb-8'>From the&nbsp;API we get separately:</p> <ul class='pl-16'> <li> Categories&nbsp;&ndash; <span class='text-primary'>categories.php</span> </li> <li> Products&nbsp;&ndash; <span class='text-primary'>products.php</span> </li> <li> Property values&nbsp;&ndash; <span class='text-primary'>products.php</span> </li> <li> Product stocks&nbsp;&ndash; <span class='text-primary'>remains.php</span> </li> <li> Prices&nbsp;&ndash; <span class='text-primary'>prices.php</span> </li> <li> Images&nbsp;&ndash; <span class='text-primary'>files.php</span> </li> <li> Full exchange&nbsp;&ndash; <span class='text-primary'>full.php</span> </li> </ul> <p class='mb-8'> For&nbsp;the&nbsp;exchange of&nbsp;each type of&nbsp;data, a&nbsp;separate script has been created in&nbsp;the&nbsp;directory <span class='text-primary'>bitrix/modules/ekf.exchange/admin/exchange/</span><br /> The&nbsp;exchange of&nbsp;goods contains information from&nbsp;several entities: </p> <ul class='pl-16'> <li>Information block item (name, external code, etc.)</li> <li>Catalog item (dimensions, weight)</li> <li>Several properties (series, multiplicity, etc.)</li> </ul> <p> At&nbsp;the&nbsp;beginning of&nbsp;each exchange, a&nbsp;finder is launched&nbsp;&ndash; an&nbsp;object that selects data from&nbsp;the&nbsp;database, saves the&nbsp;information to&nbsp;an&nbsp;array and&nbsp;then allows you to&nbsp;compare the&nbsp;site and&nbsp;API data without executing a&nbsp;separate request for&nbsp;each product and&nbsp;understand whether the&nbsp;data needs to&nbsp;be updated. </p> <p> There are several different finders: ProductRemainsFinder for&nbsp;leftovers, ProductsFinder for&nbsp;infoblock elements, etc. </p> <p> In&nbsp;order to&nbsp;understand whether the&nbsp;product picture has changed, just look at&nbsp;its name from&nbsp;the&nbsp;API. The&nbsp;name of&nbsp;the&nbsp;picture is&nbsp;a&nbsp;hash of&nbsp;the&nbsp;content. If the&nbsp;content has changed&nbsp;&ndash; the&nbsp;name has also changed. </p> <p> In&nbsp;order to&nbsp;understand whether the&nbsp;information about an&nbsp;infoblock element and&nbsp;its properties has changed, the&nbsp;hash is calculated (so as&nbsp;not to&nbsp;make a&nbsp;heavy selection of&nbsp;all products and&nbsp;not place them in&nbsp;an&nbsp;array) and&nbsp;is written to&nbsp;the&nbsp;infoblock property (created when the&nbsp;module was installed). EKF_HASH&nbsp;&ndash; hash of&nbsp;basic information, EKF_HASH_F&nbsp;&ndash; hash of&nbsp;files, EKF_HASH_P&nbsp;&ndash; hash of&nbsp;properties. When changing sections and&nbsp;products through the&nbsp;API, you must reset their hash (look <span class='text-primary'>bitrix/modules/ekf.exchange/lib/handler/</span>). </p> <p> Also, the&nbsp;EKF_UPDATED property is created for&nbsp;infoblock elements, so that after the&nbsp;exchange we can understand which goods have disappeared from&nbsp;the&nbsp;exchange and&nbsp;deactivate or&nbsp;delete them. </p> <p> For&nbsp;event documentation look <span class='text-primary'>bitrix/modules/ekf.exchange/lib/functions/events.php</span> </p> <p class='mb-32'>It is forbidden to&nbsp;make modifications to&nbsp;the&nbsp;module code, since it will not allow receiving updates. If you need some functionality, write to&nbsp;technical support, we will add events to&nbsp;the&nbsp;place you need in&nbsp;the&nbsp;module code.</p>",
      "title": "General scheme of&nbsp;the&nbsp;module"
    },
    "installation": {
      "content": "<p>Copy module to <span class='text-primary'>/bitrix/modules/</span> folder<br /> Go to&nbsp;Marketplace&nbsp;&mdash; Installed solutions <span class='text-primary'>(/bitrix/admin/partner_modules.php?lang=ru)</span> and&nbsp;install the&nbsp;solution &laquo;Exchange with&nbsp;ekfgroup.com (ekf.exchange)&raquo;<br /> Go to&nbsp;the&nbsp;module settings: Settings&nbsp;&mdash; Modules settings&nbsp;&mdash; Exchange with&nbsp;ekfgroup.com <span class='text-primary'>(/bitrix/admin/settings.php?lang=ru&amp;mid=ekf.exchange&amp;mid_menu=1)</span> </p> <p> The exchange is&nbsp;launched on&nbsp;the&nbsp;Services&nbsp;&mdash; EKFGroup Exchange page <span class='text-primary'>(/bitrix/admin/ekf_exchange.php)</span><br /> The&nbsp;recommended way to&nbsp;start the&nbsp;exchange is&nbsp;to&nbsp;run scripts via&nbsp;the&nbsp;console in&nbsp;the&nbsp;folder <span class='text-primary'>bitrix/modules/ekf.exchange/admin/exchange/products.php</span><br />Launching through the&nbsp;interface may fail, depending on&nbsp;your server settings.</p><p>The&nbsp;minimum PHP version required for&nbsp;the&nbsp;module to&nbsp;work is 7.1.</p>",
      "title": "Installing, configuring and&nbsp;launching the&nbsp;module"
    },
    "pageTitle": "1C-Bitrix integration module — EKF"
  },
  "ru": {
    "guide": {
      "content": "<p class='mb-8'>Из&nbsp;API отдельно получаем:</p> <ul class='pl-16'> <li> Разделы&nbsp;&ndash; <span class='text-primary'>categories.php</span> </li> <li> Товары&nbsp;&ndash; <span class='text-primary'>products.php</span> </li> <li> Значения свойств&nbsp;&ndash; <span class='text-primary'>products.php</span> </li> <li> Остатки&nbsp;&ndash; <span class='text-primary'>remains.php</span> </li> <li> Цены&nbsp;&ndash; <span class='text-primary'>prices.php</span> </li> <li> Изображения&nbsp;&ndash; <span class='text-primary'>files.php</span> </li> <li> Полный обмен&nbsp;&ndash; <span class='text-primary'>full.php</span> </li> </ul> <p class='mb-8'> Для&nbsp;обмена каждым типом данных создан отдельный скрипт в&nbsp;директории <span class='text-primary'>bitrix/modules/ekf.exchange/admin/exchange/</span><br /> При&nbsp;этом в&nbsp;обмене товарами в&nbsp;понимании битрикс содержится информация из&nbsp;нескольких сущностей: </p> <ul class='pl-16'> <li>Элемент инфоблока (название, внешний код и&nbsp;т.&nbsp;д.)</li> <li>Элемент каталога (размеры, вес)</li> <li>Несколько свойств (серия, кратность и&nbsp;т.&nbsp;д.)</li> </ul> <p> В&nbsp;начале каждого обмена запускается файндер&nbsp;&ndash; объект, который делает выборку данных из&nbsp;БД, сохраняет информацию в&nbsp;массив и&nbsp;затем позволяет без&nbsp;выполнения отдельного запроса на&nbsp;каждый товар сверить данные сайта и&nbsp;API и&nbsp;понять, нужно&nbsp;ли обновлять данные. </p> <p> Существует несколько разных фандеров: ProductRemainsFinder для&nbsp;остатков, ProductsFinder&nbsp;&nbsp; для&nbsp;элементов инфоблока итд. </p> <p> Для&nbsp;того, чтобы понять, изменилась&nbsp;ли картинка товара, достаточно посмотреть на&nbsp;ее название из&nbsp;API. Название картинки является хэшем содержимого. Поменялось содержимое&nbsp;&ndash; поменялось и&nbsp;название. </p> <p> Для&nbsp;того, чтобы понять, изменилась&nbsp;ли информация об&nbsp;элементе инфоблока и&nbsp;его свойствах, рассчитывается хэш (чтобы не&nbsp;делать тяжелую выборку всех товаров и&nbsp;не&nbsp;помещать их в&nbsp;массив) и&nbsp;записывается в&nbsp;свойство инфоблока (соозданное при&nbsp;установке модуля). EKF_HASH&nbsp;– хэш основной информации, EKF_HASH_F&nbsp;– хэш файлов, EKF_HASH_P&nbsp;– хеш свойств. При&nbsp;изменении разделов и&nbsp;товаров через API необходимо сбрасывать их хэш (см. <span class='text-primary'>bitrix/modules/ekf.exchange/lib/handler/</span>). </p> <p> Также для&nbsp;элементов инфоблока создается свойство EKF_UPDATED, чтобы после обмена мы могли понять, какие товары пропали из&nbsp;обмена и&nbsp;деактивировать либо удалить их. </p> <p> Для&nbsp;документации по&nbsp;событиям см. <span class='text-primary'>bitrix/modules/ekf.exchange/lib/functions/events.php</span> </p> <p class='mb-32'> Модификации в&nbsp;код модуля вносить запрещено, т.&nbsp;к. это не&nbsp;позволит получать обновления. Если нужен какой-то функционал, пишите в&nbsp;техподдержку, мы добавим события в&nbsp;нужное вам место в&nbsp;код модуля. </p>",
      "title": "Общая схема работы модуля"
    },
    "installation": {
      "content": "<p>Скопировать модуль в&nbsp;папку <span class='text-primary'>/bitrix/modules/</span><br /> Зайти в&nbsp;меню Marketplace&nbsp;&ndash; Установленные решения <span class='text-primary'>(/bitrix/admin/partner_modules.php?lang=ru)</span> и&nbsp;установить решение &laquo;Обмен с&nbsp;ekfgroup.com (ekf.exchange)&raquo;<br /> Зайти в&nbsp;настройки модуля: Настройки&nbsp;&ndash; Настройки модулей&nbsp;&ndash; Обмен с&nbsp;ekfgroup.com <span class='text-primary'>(/bitrix/admin/settings.php?lang=ru&amp;mid=ekf.exchange&amp;mid_menu=1)</span> </p> <p> Запуск обмена осуществляется на&nbsp;странице Сервисы&nbsp;&ndash; Обмен EKFGroup <span class='text-primary'>(/bitrix/admin/ekf_exchange.php)</span><br /> Рекомендуемым способом запуска обмена является запуск через консоль скриптов в&nbsp;папке <span class='text-primary'>bitrix/modules/ekf.exchange/admin/exchange/products.php</span><br /> Запуск через интерфейс, возможно, не&nbsp;сможет выполниться, это зависит от&nbsp;настроек вашего сервера. </p> <p> Минимальная версия PHP, необходимая для&nbsp;работы модуля,&nbsp;&ndash; 7.1. </p>",
      "title": "Установка, настройка и&nbsp;запуск модуля"
    },
    "pageTitle": "Модуль интеграции с 1С-Битрикс — EKF"
  }
}
</i18n>
