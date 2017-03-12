import  React from 'react';
import { Route, IndexRoute} from  'react-router';
import App from './App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import AuthHandler from './components/common/AuthHandler';
import NoMatch from './components/common/NoMatch';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="auth/:result" component={AuthHandler}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);