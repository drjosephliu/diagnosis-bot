import {
  FETCH_FIRST_FOLLOW_UP
} from '../actions/constants';

export default function(state = { conv_id: null, quest_id: null, question: null }, action) {
  switch (action.type) {
    case FETCH_FIRST_FOLLOW_UP:
      return {
        conv_id: action.payload.conversation_id,
        quest_id: action.payload.question_id,
        question: action.payload.question_desc
      }
    default:
      return state;
  }
}
