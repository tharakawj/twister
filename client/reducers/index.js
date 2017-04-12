import {combineReducers} from 'redux';
import app from './appReducer';
import auth from './authReducer';
import tweets from './tweetsReducer';

const rootReducer = combineReducers({
  app,
  auth,
  tweets
});

export default rootReducer;