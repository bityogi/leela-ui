
import { merge } from 'lodash';

import validateSchedule from './validateSchedule';

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length > 50) {
        errors.title = 'Max 50 characters allowed'
    }

    if (!values.location) {
        errors.location = 'Required'
    }

    if (!values.description) {
        errors.description = 'Required'
    } else if (values.description.length > 2000) (
        errors.description = 'Max 2000 characters allowed'
    )

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