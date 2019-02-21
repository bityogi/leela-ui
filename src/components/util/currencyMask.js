import { createNumberMask } from 'redux-form-input-masks';

export default (prefix = 'US$ ', decimalPlaces = 2, locale = 'en-US') => createNumberMask({
    prefix,
    decimalPlaces,
    locale,
})