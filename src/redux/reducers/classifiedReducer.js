import {
  CLASSIFIED_SET_LIST,
  CLASSIFIED_SET_ERROR,
  CLASSIFIED_SET_PROCESSING,
  CLASSIFIED_RESET_STATE,
} from "../actions/classifiedActions";

const initialState = {
  list: [],
  errorMessage: "",
  processing: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASSIFIED_SET_LIST:
      return { ...state, list: action.payload, processing: false };
    case CLASSIFIED_SET_ERROR:
      return { ...state, errorMessage: action.payload, processing: false };
    case CLASSIFIED_SET_PROCESSING:
      return { ...state, processing: true };
    case CLASSIFIED_RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default postReducer;
