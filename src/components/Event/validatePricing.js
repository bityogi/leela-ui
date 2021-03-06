import { map, isEmpty } from 'lodash';

import validatePricingByDate from 'components/Event/Pricing/validatePricingByDate';

export default (values) => {
    console.log('values for validatePricing: ', values);
    const errors = {};

    if (!values.price) {
        errors.price = 'Required'
    }

    if (values.questions) {
        map(values.questions, (q) => {
            if (q.type === 'YesNo') {
                if (q.preReqPrice) {
                    if (!q.preReqPrice.amount) {
                        errors.preReqPrice = 'Invalid price for Pre-Req question';
                    } else if (q.preReqPrice.amount < 1) {
                        errors.preReqPrice.amount = 'Price should be positive integer value';
                    } //TODO: Add more validations based on event pricing
                    
                } else {
                    errors.preReqPrice = 'All pre-requisite questions which affect pricing should have a price';
                }
            }
        })
    }

    const datePricingErrors = validatePricingByDate(values.pricesByDate, { start: values.start });

    if (!isEmpty(datePricingErrors)) {
        errors.datePricingErrors = datePricingErrors;
    }

    return errors;
}