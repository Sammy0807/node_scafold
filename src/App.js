import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Cms from './component/cms';
import Register from './component/register';
import Login from './component/login';
import DashBoard from './component/dashboard';

class App extends Component{
  render(){
    return(<BrowserRouter>
      <Switch>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard" component={DashBoard}/>
        <Route path="/" component={Cms}/>
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>)
  }
}
export default App;
