import React from 'react';
import App from '../App/App';
import Home from '../Home/Home';
import City from '../City/City';
import Brewery from '../Brewery/Brewery';
import Checkout from '../Checkout/Checkout';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// var x = false;

// function requireAuth(nextState, replace) {
	
// 	// console.log('window.location.assign.href', window.location.href);
// 	console.log('nextState.location.pathname', nextState.location.pathname);

// 	if (x) {
// 		browserHistory.push(nextState.location.pathname);
// 		return true;
// 	} else {
// 		window.location = 'https://untappd.com/oauth/authenticate/?client_id=E2C117BA34FA82AFB0FAB4CC38E9EF40993DF5E4&response_type=code&redirect_url=https://localhost:8008/oauth2/callback&code=COD';
// 		x = true;
// 		return false;

// 	}

// }

module.exports = (
	<Router history={browserHistory}>
	  <Route path="/" component={App}>
	    <IndexRoute component={Home} />
	    <Route path="/login" component={LogIn} />
	    <Route path="/register" component={Register} />
	    <Route path="/checkout" component={Checkout} />
	    <Route path="/:city" component={City} />
	    <Route path="/:city/:brewery" component={Brewery} />
	  </Route>
	</Router>
);
