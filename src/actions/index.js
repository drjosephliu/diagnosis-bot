import axios from 'axios';
import * as constants from './constants';

const BASE_URL = 'http://localhost:5000';

// Fetch autocomplete suggestions from redis DB
export const fetchSuggestions = (term) => async dispatch => {
  const res = await axios.get(`${BASE_URL}/api/symptoms?query=${term}`);

  dispatch({
    type: constants.FETCH_SUGGESTIONS,
    payload: res.data
  });

}
