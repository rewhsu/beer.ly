import React from 'react';
import App from '../App/App';
import Home from '../Home/Home';
import City from '../City/City';
import Brewery from '../Brewery/Brewery';
import Checkout from '../Checkout/Checkout';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import UserProfile from '../UserProfile/UserProfile.js'

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

module.exports = (
	<Router history={browserHistory}>
	  <Route path="/" component={App}>
	    <IndexRoute component={Home} />
	    <Route path="/login" component={LogIn} />
	    <Route path="/register" component={Register} />
	    <Route path="/checkout" component={Checkout} />
      <Route path="/profile" component={UserProfile}>
        <Route path="/profile/:username" component={UserProfile} />
      </Route>
      <Route path="/:city" component={City} />
      <Route path="/:city/:brewery" component={Brewery} />
	  </Route>
	</Router>
);
