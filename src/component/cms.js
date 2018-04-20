import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Cms extends Component{
  render(){
    return(<div className="alert alert-success">
    welcom to react Start up page <br/>
    <Link to='/register' className="alert">Register</Link>
    <Link to='/login' className="alert">Login</Link>
    </div>)
  }
}
