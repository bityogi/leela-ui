import { map, isEmpty } from 'lodash';
import { 
    isAfter, 
} from 'date-fns';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default (values, allValues, props) => {
    const errors = {};
    
    if (values) {
        map(values, (v, index) => {
            console.log('price-by-date values are : ', v);
            if (!v.from) {
                errors.from = 'Required'
            }

            if (!v.till) {
                errors.start = 'Required'
            }

            if (!v.price) {
                errors.price = 'Required'
            }

            //Only do further validations, if all required values are there.
            if (isEmpty(errors)) {
                if (isAfter(v.from, v.end)) {
                    errors.from ='From-date should be before By-date';
                } else {
                    if (isAfter(v.from, allValues.start)) {
                        errors.dates = 'From-date cannot be after Event start time';    
                    }
                    if (isAfter(v.till, allValues.start)) {
                        errors.till = 'By-date time cannot be after Event start time';
                    }
                    // Only do the range validation, if other validations have passed
                    if (isEmpty(errors)) {
                        for (let i = 0; i < index; i++) {
                            const prevStart = values[i].from;
                            const prevEnd = values[i].till;
    
                            const prevRange = moment.range(prevStart, prevEnd);
                            const currentRange = moment.range(v.from, v.till);
                            if (currentRange.overlaps(prevRange)) {
                                errors['date-ranges'] =`The times are overlapping with price-by-date ${i + 1}`;
                            }
                        }
                    }
                    
                        
                    
                }
            }
        })
    }

  

    const response = isEmpty(errors) ? null : errors;

    return response;
}