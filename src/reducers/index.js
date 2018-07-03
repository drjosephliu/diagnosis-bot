import { combineReducers } from 'redux';
import symptomSuggestionsReducer from './symptomSuggestionsReducer';
import followUpReducer from './followUpReducer';

export default combineReducers({
  symptomSuggestions: symptomSuggestionsReducer,
  followUp: followUpReducer
});
