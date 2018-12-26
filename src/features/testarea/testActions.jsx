import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from "./testConstants";
import firebase from '../../app/config/firebase';

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

export const startCounterAction = () => {
    return {
      type: COUNTER_ACTION_STARTED
    };
  };
  

  export const finishCounterAction = () => {
    return {
      type: COUNTER_ACTION_FINISHED
    };
  };
  

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const delayMileSeconds = 1000;

export const incrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction())
        await delay(delayMileSeconds);
        dispatch({type: INCREMENT_COUNTER})
        dispatch(finishCounterAction())
    }
}

export const decrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction())
        await delay(delayMileSeconds);
        dispatch({type: DECREMENT_COUNTER})
        dispatch(finishCounterAction())
    }
}

export const testPermission = () => 
  async(dispatch, getState) => {
    const firestore = firebase.firestore();
    try {
      let userDocRed = await firestore.collection('users').doc('sCXWY2t7mkcXZS9VcnmGz51jnMk2');
      userDocRed.update({
        displayName: 'testing'
      })
    } catch(err){
      console.log(err);
    }
  }
