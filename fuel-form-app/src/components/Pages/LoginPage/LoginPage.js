import React, { useState } from 'react';
import { FuelFormPage } from '..';
import './LoginPage.css'

function LoginPage() {

  //edit to have variables that hold the username and password

  const [errmsg, seterrmsg] = useState({});
  const [submit, setsubmit] = useState(false);

  const ErrorMessage = (name) =>
    name === errmsg.name && (
    <div className="error">{errmsg.message}</div>
  );

  const submitHandler = (event) => {
    event.preventDefault();

    var {user, pass} = document.forms[0];
    const data = tempLogin.find((users) => users.username === user.value);

    if(data){
      if(data.password !== pass.value){
        seterrmsg({name: "pass", message: errs.pass})
      }
      else{
        setsubmit(true);
      }
    }
    else{
      seterrmsg({name: "user", message: errs.user});
    }
  };


  const tempLogin = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errs = {
    user: "invalid username",
    pass: "invalid password"
  };


    const showForm = (
    <>
      <div className="loginForm">
        <form onSubmit={submitHandler}>
          <div className="signin">
            <h3>Sign In</h3>
          </div>

          <div className="login_container">
            <label for="user" id="username">Username </label>
            <input type="text" id="user" name="user" required></input>
            {ErrorMessage("user")}
          </div>
          
          <div className="login_container"> 
            <label for="pass" id="password">Password </label>
            <input type="password" id="pass" name="pass" required></input>
            {ErrorMessage("pass")}
          </div>
          
          <div className="butt_container">
            <input type="submit" class="submit_butt" value="Submit"></input>
          </div>
          
          <div>
            <a href="/register" id="linkToReg">New here? Sign Up!</a>
          </div>
        </form>

        
      </div>

      <div>
          <footer id="copyright">
            <small>&copy; Copyright 2022, Fuel Form Page Group 19</small>
          </footer>
        </div>
    </>
    );
      

  return (
    <div>
      {/* <NavBar/> */}
      <div className="login-form">
        <div className="title">
          {/* <h1 id="login-header">LoginPage</h1> */}
          {submit ? <FuelFormPage/> : showForm}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;