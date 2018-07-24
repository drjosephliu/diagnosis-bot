import {
  FETCH_FIRST_ROUND,
  FETCH_FIRST_FOLLOW_UP,
  FETCH_NEXT_FOLLOW_UP
} from '../actions/constants';

const INITIAL_STATE = {
  conv_id: null, conv_state: null,
  quest_id: null, question: null,
  result: null, specialties: null,
  first_round: null
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FIRST_ROUND:
      return {
        first_round: action.payload.diagnosis
      }
    case FETCH_FIRST_FOLLOW_UP:
      return {
        ...state,
        conv_id: action.payload.conversation_id,
        conv_state: action.payload.conversation_state,
        quest_id: action.payload.question_id,
        question: action.payload.question_desc
      }
    case FETCH_NEXT_FOLLOW_UP:
      return {
        ...state,
        conv_id: action.payload.conversation_id,
        conv_state: action.payload.conversation_state,
        quest_id: action.payload.question_id,
        question: action.payload.question_desc,
        result: action.payload.result,
        specialties: action.payload.specialties
      }
    default:
      return state;
  }
}
