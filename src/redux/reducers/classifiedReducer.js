import {
  CLASSIFIED_SET_LIST,
  CLASSIFIED_SET_ERROR,
  CLASSIFIED_SET_PROCESSING,
  CLASSIFIED_RESET_STATE,
} from "../actions/classifiedActions";

// initial state of the reducer
// list to hold all the classified list from 
// local storage, errorMessage to store any
// AsynStorage errors or exception messages and,
// processign for letting UIs know that some
// time consuming iperation is goin on so that
// UIs can show a progress bar in such cases
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
