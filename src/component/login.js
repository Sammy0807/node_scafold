import React, { Component } from 'react';
import ApiManager from './ApiManager';
import superagent from 'superagent';
import {Redirect, Link} from 'react-router-dom';

class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{
        username:'',
        password:''
      },
      error:[],
      success:''
    }

    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    superagent
    .post('/users/login')
    .send(this.state.user)
    .set('Accept', 'appliation/json')
    .end((response) =>{
      console.log(response);
    })

  }


  username(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['username'] = event.target.value
		this.setState({
			user: updatedUser
		})
  }
  password(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['password'] = event.target.value
    this.setState({
			user: updatedUser
		})
  }

  render(){

    return(<div>
  <div className>
      <div className="offset-sm-6">

      </div><br/>

    <div className="col-md-9">
    <h4 className="offset-sm-6">Login Page</h4><br/>

    {this.state.error != '' ?
    <div className="offset-sm-5 alert alert-danger">{this.state.error}</div>
    : this.state.success != ''? <div className="offset-sm-5 alert alert-success">{this.state.success}</div> : ''}
    {this.state.success != ''? <Redirect to='/Login'/>:''}


      <form className="offset-sm-5 alert alert-warning">

        <div className="form-group">
          <input type="text" className="form-text text-muted form-control" onChange={this.username} placeholder="Username" required/>
        </div>
        <div className="form-group">
          <input type="password" className="form-text text-muted form-control" onChange={this.password} placeholder="Password" required/>
        </div>
        <div className="form-group">
          <button onClick={this.handleSubmit} className="btn btn-danger">Submit</button>
        </div>

      </form>
    </div>
  </div>
      </div>);
  }
}
export default Login;
