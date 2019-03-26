/* eslint-disable no-throw-literal */
import {
    FETCH_START,
    FETCH_END,
    FETCH_CANCEL,
} from './types';

import {
    showNotification
} from './admin';

import { client } from 'util/axiosClient';

export const addLocation = (values) => {
    return dispatch => {
        dispatch({
            type: FETCH_START
        })

        return client.post('/location', values)
            .then(res => {
                console.log('response from location POST: ', res);
                dispatch({
                    type: FETCH_END
                });
                dispatch(showNotification('Location created', 'success'));
            })
            .catch(err => {
                console.log('error from location POST: ', err);
                dispatch({
                    type: FETCH_CANCEL
                });
                dispatch(showNotification('Error occured while creating location', 'error'));
            })
    }
}

