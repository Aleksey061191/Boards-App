import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import columnReducer from './columnReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
});

export default rootReducer;
