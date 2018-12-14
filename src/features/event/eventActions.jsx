import {CREATE_EVENT, UPDATE_EVENT, DELETE_EVNET} from './eventConstants';

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event
        }
    }
}

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event
        }
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVNET,
        payload: {
            eventId
        }
    }
}