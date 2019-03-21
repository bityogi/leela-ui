import { isEmpty, map } from 'lodash';
import { isAfter, parseISO, isBefore } from 'date-fns';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import validateSession from 'components/Event/Schedule/Sessions/validateSession';
import validate from './validate';
import session from './Schedule/Sessions/session';

const moment = extendMoment(Moment);

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
        } else if (!isEmpty(values.sessions)) {
            
            const sessionErrors = validateSession(values.sessions, values);

            if (!isEmpty(sessionErrors)) {
                errors.sessionErrors = sessionErrors;
            }
           
        }
    }

    return errors;
}