
import { merge } from 'lodash';

import validateSchedule from './validateSchedule';

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    if (!values.location) {
        errors.location = 'Required'
    }

    if (!values.description) {
        errors.description = 'Required'
    }

    // if (values.eventImage) {
    //     if (values.eventImage.length === 0) {
    //         errors.eventImage = 'Required'
    //     }
    // }
    
    
    const scheduleValidationErrors = validateSchedule(values);

    merge(errors, scheduleValidationErrors);

    if (!values.price) {
        errors.price = 'Required'
    }

    // console.log('event validate errors: ', errors);

    return errors;
}

export default validate;