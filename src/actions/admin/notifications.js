import {
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from 'actions/types';

export const showNotification = (message, type = 'info', duration = 4000) => ({
    type: SHOW_NOTIFICATION,
    payload: { message, type, duration },
  });
  
  export const hideNotification = () => ({
    type: HIDE_NOTIFICATION,
  });