import { combineReducers } from 'redux';
import classifiedReducer from './classifiedReducer';

const rootReducer = combineReducers({
  classified: classifiedReducer,
})

export default rootReducer;
