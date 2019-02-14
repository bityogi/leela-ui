import { change } from 'redux-form';
import store from 'store';

const normalizeStartDate = (value, previousValue, allValues) => {
    const newStartDate = new Date(value).setTime(new Date(allValues.startTime).getTime());
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    console.log('currentStartDate: ', value);
    console.log('newStartDate: ', newStartDate);
    store.dispatch(change('event', 'startDate', newStartDate));
    return value;
}

export { normalizeStartDate };