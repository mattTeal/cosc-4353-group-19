import React, { useState } from 'react';
import './LoginPage.css'

function LoginPage() {

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
            <label>SignIn</label>
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
    <>
      <div className="login-form">
        <div className="title">
          <h1 id="login-header">LoginPage</h1>
          {submit ? <div>Signed in successfully!</div> : showForm}
        </div>
      </div>
    </>
  );
}

export default LoginPage;