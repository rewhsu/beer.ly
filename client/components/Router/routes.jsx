import React from 'react';
import App from '../App/App';
import LogIn from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';
import City from '../City/City';
import Brewery from '../Brewery/Brewery';
import axios from 'axios';
import {browserHistory} from 'react-router';
import Checkout from '../Checkout/Checkout';

import { Route, IndexRoute } from 'react-router';


module.exports = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/login" component={LogIn}/>
    <Route path="/register" component={Register} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/:city" component={City} />
    <Route path="/:city/:brewery" component={Brewery}/>
  </Route>
);
























