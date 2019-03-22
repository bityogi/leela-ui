import { map, isEmpty } from 'lodash';
import { 
    isAfter, 
    isBefore,
    parseISO,
} from 'date-fns';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default (sessions, allValues) => {
    const errors = {};
    
    if (sessions) {
        map(sessions, (session, index) => {
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
                const sessionStart = moment(session.start);
                const sessionEnd = moment(session.end);
                const eventStart = moment(allValues.start);
                const eventEnd = moment(allValues.end);

                if (sessionStart.isAfter(sessionEnd)) {
                    errors.start = 'Session start date should be before session end-date';
                } else {
                    if (sessionStart.isBefore(eventStart)) {
                        errors.startTime = 'A session start time cannot be before Event start time';  
                    }
                    if (sessionEnd.isAfter(eventEnd)) {
                        errors.endTime = 'A session end time cannot be after Event end time';
                    }

                    // Do further validations, if no validation errors so far
                    if (isEmpty(errors)) {
                        let duration = moment.duration(sessionEnd.diff(sessionStart)).asMinutes();
                        if (duration < 15) {
                            errors.endTime = 'Please allow at-least 15 minutes between session start and end time';
                        }
                    }
                    
                    // Only do the range validation, if other validations have passed
                    if (isEmpty(errors)) {
                        for (let i = 0; i < index; i++) {
                            const prevStart = sessions[i].start;
                            const prevEnd = sessions[i].end;
    
                            const prevRange = moment.range(prevStart, prevEnd);
                            const currentRange = moment.range(session.start, session.end);
                            if (currentRange.overlaps(prevRange)) {
                                errors.time = `The times are overlapping with session ${sessions[i].name}`;
                            }
                        }
                    }
                    
                        
                    
                }
            }
        })
    }

    const response = isEmpty(errors) ? null : errors;

    console.log('response from validateSession: ', response);
    return response;
}