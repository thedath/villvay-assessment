import { combineReducers } from 'redux';
import classifiedReducer from './classifiedReducer';

// outer most reducer
const rootReducer = combineReducers({
  classified: classifiedReducer,
})

export default rootReducer;
