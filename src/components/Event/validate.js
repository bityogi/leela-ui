import { isAfter } from 'date-fns';
import { isEmpty } from 'lodash';
import { isBefore } from 'date-fns/esm';

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

    if (values.recurring === true) {
        if (!values.frequency) {
            errors.frequency = 'A frequency needs to be selected if its recurring';
        } else {
            if (!values.interval) {
                console.log('invalid because no interval value')
                errors.interval = 'Interval is required';
            }

            if (!values.repeatUntil) {
                errors.repeatUntil = 'Repeat Until is required';
            } else {
                const repeatUntil = new Date(values.repeatUntil);
                const endDate = new Date(values.endDateTime);
                if (isBefore(repeatUntil, endDate)) {
                    console.log('Repeat Until value should be after the event end-date');
                    errors.repeatUntil = 'Repeat Until value should be after the event end-date';
                }
            }

            if (values.frequency === 'Weekly') {
                if (isEmpty(values.weekDays)) {
                    console.log('invalid because no week-days have been selected for Weekly recurrence');
                    errors.weekDays = 'Please select one or more week-days';
                }
            }

            if (values.frequency === 'Monthly') {
                if (values.monthDaySelectionType === 0) {
                    if (isEmpty(values.daysOfMonth)) {
                        console.log('Must select at-least 1 day of the month');
                        errors.daysOfMonth = 'Must select at-least 1 day of the month';
                    }
                } else if (values.monthDaySelectionType === 1) {
                    if (isEmpty(values.dayOfWeek_number)) {
                        console.error('Please select a number');
                        errors.dayOfWeek_number = 'Please select a number';
                    }
                    if (isEmpty(values.dayOfWeek_day)) {
                        console.error('Please select a day of week');
                        errors.dayOfWeek_day = 'Please select a day of week';
                    }
                
                }
            }
        }
    }

    if (!values.price) {
        errors.price = 'Required'
    }

    

    return errors;
}

export default validate;