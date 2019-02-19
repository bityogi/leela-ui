import { change } from 'redux-form';
import store from 'store';

const normalizeStartDate = (value, previousValue, allValues) => {
    const newStartDate = new Date(value);
    
    store.dispatch(change('event', 'startDate', newStartDate));
    store.dispatch(change('event', 'startTime', newStartDate));
    
    return value;
}

const normalizeEndDate = (value, previousVallue, allValues) => {
    const newEndDate = new Date(value);
    store.dispatch(change('event', 'endDate', newEndDate));
    store.dispatch(change('event', 'endTime', newEndDate));
    return value;
}



export { 
    normalizeStartDate, 
    normalizeEndDate,
};