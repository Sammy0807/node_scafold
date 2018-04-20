import React, { Component } from 'react';
import ApiManager from './ApiManager';
import superagent from 'superagent';
import {Redirect, Link} from 'react-router-dom';

class Register extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{
        firstname:'',
        lastname:'',
        username:'',
        email:'',
        password:''
      },
      error:[],
      success:''
    }
    this.firstname = this.firstname.bind(this);
    this.lastname = this.lastname.bind(this);
    this.username = this.username.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.password2 = this.password2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    ApiManager.post('/users/register', this.state.user, (err, response)=>{
            if(err){
          this.setState({ error: err.message })
          return
      }
      this.setState({
        success: 'Successfully Registered'
      })
    })

  }


firstname(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['firstname'] = event.target.value
    this.setState({
			user: updatedUser
		})
  }

  lastname(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['lastname'] = event.target.value
		this.setState({
			user: updatedUser
		})
  }
  username(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['username'] = event.target.value
		this.setState({
			user: updatedUser
		})
  }
  email(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['email'] = event.target.value
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
  password2(event){
    let updatedUser = Object.assign({}, this.state.user)
		updatedUser['password2'] = event.target.value
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
    <h4 className="offset-sm-6">Register Page</h4><br/>

    {this.state.error != '' ?
    this.state.error.map((msg,i)=>(
      <div className="offset-sm-5 alert alert-danger" key={i}>{msg.msg}</div>
    )) : this.state.success != ''? <div className="offset-sm-5 alert alert-success">{this.state.success}</div> : ''}
    {this.state.success != ''? <Redirect to='/Login'/>:''}


      <form className="offset-sm-5 alert alert-warning">
        <div className="form-group">
          <input type="text" className="form-text text-muted form-control" onChange={this.firstname} placeholder="First Name" required/>
        </div>
        <div className="form-group">
          <input type="text" className="form-text text-muted form-control" onChange={this.lastname} placeholder="Last Name" required/>
        </div>
        <div className="form-group">
          <input type="text" className="form-text text-muted form-control" onChange={this.username} placeholder="Username" required/>
        </div>
        <div className="form-group">
          <input type="email" className="form-text text-muted form-control" onChange={this.email} placeholder="Email address" required/>
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
export default Register;
