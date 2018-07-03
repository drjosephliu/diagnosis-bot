import axios from 'axios';
import * as constants from './constants';

const BASE_URL = 'http://localhost:5000';
const DIAGNOSIS_API = 'http://ai-stage.finddoc.com:8080';

// Fetch autocomplete suggestions from redis DB
export const fetchSuggestions = term => async dispatch => {
  const res = await axios.get(`${BASE_URL}/api/symptoms?query=${term}`);

  dispatch({
    type: constants.FETCH_SUGGESTIONS,
    payload: res.data
  });
}

export const clearSuggestions = () => {
  return {
    type: constants.CLEAR_SUGGESTIONS,
    payload: []
  }
}

export const submitSymptoms = symptoms => async dispatch => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:8080/${DIAGNOSIS_API}/diagnosis/first-round`,
    headers: {
      'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk5MTkyMjgsImlhdCI6MTUyOTkxNzQyOCwibmJmIjoxNTI5OTE3NDI4LCJpZGVudGl0eSI6Mn0.2iMMMELOrYl_ouVS7ZO-7DIecVNbPtnDxG9lCV9yZDU'
    },
    data: {
      symptom_list: symptoms
    }
  })
  console.log(res.data);

  dispatch(fetchFirstFollowUp(res.data.conversation_id))
}

export const fetchFirstFollowUp = conv_id => async dispatch => {
  const res = await axios.post(`http://localhost:8080/${DIAGNOSIS_API}/conversation/${conv_id}`);

  dispatch({
    type: constants.FETCH_FIRST_FOLLOW_UP,
    payload: res.data
  });
}
