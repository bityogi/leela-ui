import { isEmpty, map } from 'lodash';
import { isAfter } from 'date-fns';
import { isBefore } from 'date-fns/esm';

export default (values) => {
    const errors = {};

    if (!values.start) {
        errors.start = 'Required'
    }

    if (!values.end) {
        errors.end = 'Required'
    }

    if (values.start && values.end) {
        const startDate = new Date(values.start);
        const endDate = new Date(values.end);

        if (isAfter(startDate, endDate)) {
            errors.end = 'Start Date/Time cannot be after End Date/Time';
        }
    }

    if (values.isRecurring === true) {
        if (!values.frequency) {
            errors.frequency = 'A frequency needs to be selected if its recurring';
        } else {
            if (!values.interval) {
                errors.interval = 'Interval is required';
            }
            if (!values.repeatUntil) {
                errors.repeatUntil = 'Repeat Until is required';
            } else {
                const repeatUntil = new Date(values.repeatUntil);
                const endDate = new Date(values.end);
                if (isBefore(repeatUntil, endDate)) {
                    errors.repeatUntil = 'Repeat Until value should be after the event end-date';
                }
            }

            if (values.frequency === 'Weekly') {
                if (isEmpty(values.weekDays)) {
                   errors.weekDays = 'Please select one or more week-days';
                }
            }

            if (values.frequency === 'Monthly') {
                if (values.monthDaySelectionType === 0) {
                    if (isEmpty(values.daysOfMonth)) {
                        errors.daysOfMonth = 'Must select at-least 1 day of the month';
                    }
                } else if (values.monthDaySelectionType === 1) {
                    if (!values.dayOfWeek_number) {
                        errors.dayOfWeek_number = 'Please select a number';
                    }
                    if (!values.dayOfWeek_day) {
                        errors.dayOfWeek_day = 'Please select a day of week';
                    }
                
                }
            }
        }
    }

    if (values.hasSessions === true) {
        if (!values.sessions || isEmpty(values.sessions)) {
            console.log('Event has been marked to have sessions but none were found')
            errors.sessions = 'Event has been marked to have sessions but none were found';

            if (!isEmpty(values.sessions)) {
                map(values.sessions, (session, index) => {
                    if (!session.name) {
                        console.log('A session name is required for session');
                        errors.sessions[index].name = 'Required'
                    }
                })
            }
        }
    }

    return errors;
}