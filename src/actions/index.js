import axios from 'axios';
import * as constants from './constants';

const DIAGNOSIS_API = 'http://ai-stage.finddoc.com:8080';

// Fetch autocomplete suggestions
export const fetchSuggestions = term => async dispatch => {
  const res = await axios.get(`${DIAGNOSIS_API}/autocomplete/${term}`);

  dispatch({
    type: constants.FETCH_SUGGESTIONS,
    payload: res.data.data
  });
}

// Clear suggestions
export const clearSuggestions = () => {
  return {
    type: constants.CLEAR_SUGGESTIONS,
    payload: []
  }
}

// Submit symptoms to AI API engine
export const submitSymptoms = (age, gender, pregnancy, symptomsIds, history) => async dispatch => {
  const res = await axios({
    method: 'post',
    url: `${DIAGNOSIS_API}/diagnosis`,
    headers: {
      'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk5MTkyMjgsImlhdCI6MTUyOTkxNzQyOCwibmJmIjoxNTI5OTE3NDI4LCJpZGVudGl0eSI6Mn0.2iMMMELOrYl_ouVS7ZO-7DIecVNbPtnDxG9lCV9yZDU'
    },
    data: {
      symptom_list: symptomsIds,
      gender,
      age,
      pregnancy
    }
  });

  history.push('/followup');
  dispatch(fetchFirstFollowUp(res.data.conversation_id));
  dispatch({
    type: constants.FETCH_FIRST_ROUND,
    payload: res.data
  });
}

// First the first follow up question
export const fetchFirstFollowUp = conv_id => async dispatch => {
  const res = await axios.post(`${DIAGNOSIS_API}/conversation/${conv_id}`);

  dispatch({
    type: constants.FETCH_FIRST_FOLLOW_UP,
    payload: res.data
  });
}


// First any subsequent follow up questions or final results
export const fetchNextFollowUp = (conv_id, quest_id, bool) => async dispatch => {
  const numBool = bool === "true" ? "1" : "0";

  const res = await axios({
    method: 'post',
    url: `${DIAGNOSIS_API}/conversation/${conv_id}`,
    headers: {
      'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk5MTkyMjgsImlhdCI6MTUyOTkxNzQyOCwibmJmIjoxNTI5OTE3NDI4LCJpZGVudGl0eSI6Mn0.2iMMMELOrYl_ouVS7ZO-7DIecVNbPtnDxG9lCV9yZDU'
    },
    data: {
      user_answer: [ quest_id, numBool, bool ]
    }
  });

  dispatch({
    type: constants.FETCH_NEXT_FOLLOW_UP,
    payload: res.data
  });
}

// Submit feedback
export const submitFeedback = (conv_id, rate, comment) => async dispatch => {
  const res = await axios({
    method: 'post',
    url: `${DIAGNOSIS_API}/review/${conv_id}`,
    data: {
      rate: rate,
      comment: comment
    }
  });

  dispatch({
    type: constants.SUBMIT_FEEDBACK
  });
}
