import { combineReducers } from 'redux';
import symptomSuggestionsReducer from './symptomSuggestionsReducer';

export default combineReducers({
  symptomSuggestions: symptomSuggestionsReducer
});
