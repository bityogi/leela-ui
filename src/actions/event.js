import { submit, getFormValues } from 'redux-form';

import {
    FETCH_START,
    FETCH_END,
    SUBMIT_EVENT,
    SUBMIT_EVENT_SUCCESS,

} from './types';

export const submitEvent = (values) => {
    return (dispatch, getState) => {

        const eventValues = getFormValues('event')(getState());
        console.log('ACTION: submitEvent -- with values: ', eventValues);
        dispatch(submit('event'));
                
        dispatch({
            type: FETCH_START
        });
        dispatch({
            type: SUBMIT_EVENT
        });
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('mocking sumbission of event to server ...');
                
                dispatch({
                    type: FETCH_END
                })
                
                resolve();
            }, 3000);
        })
        
    }
} 