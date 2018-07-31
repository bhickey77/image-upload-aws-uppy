import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import partner from './partnerReducer';
import post from './postReducer';

const store = combineReducers({
  user,
  login,
  partner,
  post
});

export default store;
