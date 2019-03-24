import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    // LOGOUT,

} from './types';
import {
    showNotification
} from './admin';

import { history } from 'store';

import { client } from 'util/axiosClient';

export const login = ({ username, password }) => {
    return dispatch => {
        dispatch({
            type: LOGIN,
        })

        client
            .post('/login', {
                username,
                password
            })
            .then(res => {
                console.log('response from login POST: ', res);
                dispatch({
                    type: LOGIN_SUCCESS
                });
                dispatch(showNotification('Logged In', 'info'));
                history.push('/');
            })
            .catch(err => {
                console.log('error from login POST:', err);
                dispatch({
                    type: LOGIN_FAILURE
                })
                dispatch(showNotification('Error logging in', 'error'));
            })
    }
}