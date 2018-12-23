import {
  
  
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import moment from 'moment';

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import {createNewEvent} from '../../app/common/util/helpers';

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

export const createEvent = event => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createEvent.id}_${user.uid}`,{
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      })
      toastr.success("Success!", "Event has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    if(event.date !== getState().firestore.ordered.events[0].date){
      event.date = moment(event.date).toDate();
    }
    try {
      await firestore.update(`events/${event.id}`, event)
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => 
 async(dispatch, getState, {getFirestore}) => {
   const firestore = getFirestore();
   const message = cancelled ? 'Are you sure you want to cancel the event?'
   : 'this will reactivate the event - are you sure?';
   try {
      toastr.confirm(message, {
        onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
      });
      
   } catch(error){
     console.log(error);
   }
 }

export const deleteEvent = eventId => {
    return async dispatch => {
        try {
          dispatch({
            type: DELETE_EVENT,
            payload: {
              eventId
            }
          });
          toastr.info("Success!", "Event has been DELETE");
        } catch (error) {
          toastr.error("Oops", "Something went wrong");
        }
      };
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
