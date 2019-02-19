import { isAfter } from 'date-fns';

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

    if (values.eventImage) {
        if (values.eventImage.length === 0) {
            errors.eventImage = 'Required'
        }
    }
    
    if (!values.startDateTime) {
        errors.startDateTime = 'Required'
    }

    if (!values.endDateTime) {
        errors.endDateTime = 'Required'
    }

    if (values.startDateTime && values.endDateTime) {
        const startDate = new Date(values.startDateTime);
        const endDate = new Date(values.endDateTime);

        if (isAfter(startDate, endDate)) {
            errors.endDateTime = 'Start Date/Time cannot be after End Date/Time';
        }
    }

    return errors;
}

export default validate;