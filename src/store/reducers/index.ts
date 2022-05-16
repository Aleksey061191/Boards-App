import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
});

export default rootReducer;
