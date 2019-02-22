import { map, isEmpty } from 'lodash';
import { 
    isAfter, 
    isBefore,
} from 'date-fns';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default (sessions, allValues, props) => {
    console.log('validateSession -- value: ', sessions);
    console.log('validateSession -- allValues: ', allValues);
    const errors = {};
    const messages = [];

    if (sessions) {
        map(sessions, (session, index) => {
            console.log('Session values are : ', session);
            if (!session.name) {
                errors.name = 'Required'
            }

            if (!session.start) {
                errors.start = 'Required'
            }

            if (!session.end) {
                errors.end = 'Required'
            }

            //Only do further validations, if all required values are there.
            if (isEmpty(errors)) {
                if (isAfter(session.start, session.end)) {
                    messages.push('Session start date should be before session end-date');
                } else {
                    if (isBefore(session.start, allValues.start)) {
                        messages.push('A session start time cannot be before Event start time');    
                    }
                    if (isAfter(session.end, allValues.end)) {
                        messages.push('A session end time cannot be after Event end time');
                    }
                    // Only do the range validation, if other validations have passed
                    if (isEmpty(messages)) {
                        for (let i = 0; i < index; i++) {
                            const prevStart = sessions[i].start;
                            const prevEnd = sessions[i].end;
    
                            const prevRange = moment.range(prevStart, prevEnd);
                            const currentRange = moment.range(session.start, session.end);
                            if (currentRange.overlaps(prevRange)) {
                                messages.push(`The times are overlapping with session ${sessions[i].name}`);
                            }
                        }
                    }
                    
                        
                    
                }
            }
        })
    }

    if (!isEmpty(messages)) {
        errors.messages = messages;
    }

    const response = isEmpty(errors) ? null : errors;

    console.log('response from validateSession: ', response);
    return response;
}