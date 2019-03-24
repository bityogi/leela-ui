import { submit, getFormValues } from 'redux-form';
import { isEmpty } from 'lodash';

import {
    FETCH_START,
    FETCH_END,
    SUBMIT_EVENT,
} from './types';

import {
    showNotification
} from './admin';

import {
    MEDIATYPE
} from 'util/enums';

export const submitEvent = (values) => {
    return (dispatch, getState) => {

        const eventValues = getFormValues('event')(getState());
        console.log('ACTION: received form-values: ', eventValues);
        
        dispatch(submit('event'));
        const eventData = normalizeEventData(eventValues);
        console.log('submitting event with data: ', eventData);        
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

                dispatch(showNotification('Event successfully created', 'success'));
                
                resolve();
            }, 3000);
        })
        
    }
} 

function normalizeEventData(data) {
    let eventData =  {
        name: data.title,
        description: data.description,
        locationId: data.location,
        start: data.start,
        end: data.end,
        media: [],
        eventPrice: {
            amount: data.price
        }
    };

    if (!isEmpty(data.eventImage)) {
        eventData.media.push({
            mediaType: MEDIATYPE.EVENT_IMAGE,
            path: data.EventImage.NewFileName
        })
    }
    if (!isEmpty(data.altImage)) {
        eventData.media.push({
            mediaType: MEDIATYPE.ALTERNATE_EVENT_IMAGE,
            path: data.altImage.NewFileName
        })
    }

    if (data.hasSessions) {
        eventData.sessions = data.sessions;
    }

    if (data.questions.length > 0) {
        eventData.questions = data.questions
    }

    if (data.pricesByDate && data.pricesByDate.length > 0) {
        eventData.pricesByDate = data.pricesByDate;
    }

    return eventData;
    
}