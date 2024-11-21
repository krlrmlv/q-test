import {
  ANALOG_TYPES,
  ANALOGS_FUNCTIONAL_TYPES,
} from '~/components/constants/product'

export const checkIsEkfAnalog = (analog) =>
  analog?.analogType === ANALOG_TYPES.ekfAnalog

export const checkIsReplacementEkfAnalog = (analog) =>
  checkIsEkfAnalog(analog) &&
  analog.functionalType === ANALOGS_FUNCTIONAL_TYPES.replacement
