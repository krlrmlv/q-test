/** Product statuses */
export const CUSTOM_STATUSES = ['Заказная', 'Custom']
export const OUT_OF_PRODUCTION_STATUSES = ['Снята с производства']
export const REGULAR_STATUSES = ['Регулярная', 'Regular']
export const WITHDRAWN_STATUSES = ['Выводимая из ассортимента', 'Withdrawn']

/** Product analogs analogType */
export const ANALOG_TYPES = {
  accessories: 'Комплектующие',
  additionalProduct: 'Дополнительный товар',
  competitorAnalog: 'Аналог конкурента',
  ekfAnalog: 'Аналог EKF',
  illiquidAnalog: 'Неликвидный аналог',
  recommendation: 'Рекомендация',
  relatedProduct: 'Сопутствующий товар',
}

/** Analogs functional used only if analogType === ANALOG_TYPES.ekfAnalog */
export const ANALOGS_FUNCTIONAL_TYPES = {
  direct: 'Прямой',
  functional: 'Функциональный',
  replacement: 'На замену',
}

/** Used for custom styles due to the large size of the product card
 * if functionalType is ANALOGS_FUNCTIONAL_TYPES.replacement */
export const SWIPER_WITH_REPLACMENT_ANALOG_CLASS =
  'analogs-with-replacement-swiper'
