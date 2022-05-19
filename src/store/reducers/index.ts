import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import columnReducer from './columnReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  columns: columnReducer
});

export default rootReducer;
