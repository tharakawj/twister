import {combineReducers} from 'redux';
import auth from './authReducer';
import tweets from './tweetsReducer';

const rootReducer = combineReducers({
  auth,
  tweets
});

export default rootReducer;