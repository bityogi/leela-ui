import {
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from 'actions/types';

const defaultState = {
    duration: 4000, //default to 4 seconds
    message: '',
    type: 'info', // one of 'success', 'warning', 'error', 'info'
};

export default (previousState = defaultState, { type, payload }) => {
    switch (type) {
        case SHOW_NOTIFICATION:
            const state = {
                message: payload.message, type: payload.type, duration: payload.duration || 4000
            }
            return state;
        case HIDE_NOTIFICATION:
            return { ...previousState, message: '' };
        default:
            return previousState;
    }
};
