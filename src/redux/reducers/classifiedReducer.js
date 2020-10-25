import {
  POST_SET_POST_LIST,
  POST_SET_ERROR,
  POST_SET_PROCESSING,
  POST_MOVE,
  POST_TRAVEL_THROUGH_TIME,
} from "../actions/postActions";

const initialState = {
  list: [],
  errorMessage: "",
  processing: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SET_POST_LIST:
      return { ...state, list: action.payload, processing: false };
    
    default:
      return state;
  }
};

export default postReducer;
