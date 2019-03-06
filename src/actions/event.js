import { submit } from 'redux-form';

import {
    FETCH_START,
    FETCH_END,
    SUBMIT_EVENT,
    SUBMIT_EVENT_SUCCESS,

} from './types';

export const submitEvent = (values) => {
    return dispatch => {
        console.log('sumbit event started. values: ', values);
        dispatch({
            type: FETCH_START
        });
        dispatch({
            type: SUBMIT_EVENT
        });
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('mocking sumbission of event to server ...');
                dispatch(submit('event'));
                
                dispatch({
                    type: FETCH_END
                })
                
                resolve();
            }, 3000);
        })
        
    }
} 