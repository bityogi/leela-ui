import { submit, getFormValues } from 'redux-form';
import { isEmpty } from 'lodash';
import { client } from 'util/axiosClient';

import {
    FETCH_START,
    FETCH_END,
    SUBMIT_EVENT,
    FETCH_CANCEL,
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
        
        
        const eventData = normalizeEventData(eventValues);
        console.log('submitting event with data: ', eventData);        
        dispatch({
            type: FETCH_START
        });
        dispatch({
            type: SUBMIT_EVENT
        });

        return client.post('/event/add', eventData)
                .then(res => {
                    console.log('response from event POST: ', res);
                    dispatch(submit('event'));
                    dispatch({
                        type: FETCH_END
                    });
                    dispatch(showNotification('Event created', 'success'));
                })
                .catch(err => {
                    console.error('error from event POST:', err);
                    dispatch({
                        type: FETCH_CANCEL
                    });
                    dispatch(showNotification('Error occured while creating event', 'error'));
                });
      
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
            path: data.eventImage.NewFileName
        })
    }
    if (!isEmpty(data.altImage)) {
        eventData.media.push({
            mediaType: MEDIATYPE.ALTERNATE_EVENT_IMAGE,
            path: data.altImage.NewFileName
        })
    }

    if (data.isRecurring === true) {
        eventData.recurrence = { 
            frequencyType: data.frequency.toLowerCase(), //TODO: Use enums for frequency
            interval: data.interval,
            repeatUntil: data.repeatUntil
        }

        if (data.frequency === 'Weekly') {
            eventData.recurrence.weekDays = data.weekDays;
        }

        if (data.frequency === 'Monthly') {
            eventData.recurrence.monthlyRecurrenceType = data.monthDaySelectionType; //TODO: Use enums for monthDaySelectionType
            if (data.monthDaySelectionType === 0) {
                eventData.recurrence.monthDays = data.daysOfMonth;
            } else if (data.monthDaySelectionType === 1) {
                eventData.recurrence.number = data.dayOfWeek_number;
                eventData.recurrence.dayOfWeek = data.dayOfWeek_day; 
            }
            
        }
    }

    if (data.hasSessions === true) {
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