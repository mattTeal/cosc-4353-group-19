import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthProvider'
import './LoginPage.css'

function LoginPage() {

  //edit to have variables that hold the username and password
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errmsg, seterrmsg] = useState('');
  const [submit, setsubmit] = useState(false);

  const ErrorMessage = (name) =>
    name === errmsg.name && (
    <div className="error">{errmsg.message}</div>
  );

  const submitHandler = (e) => {
    e.preventDefault();

    var {user, pass} = document.forms[0];
    const data = tempLogin.find((users) => users.username === user.value);
    setUser('');
    setPwd('');

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
            <input ref={userRef}type="text" id="user" name="user" required
            onChange={(e) => setUser(e.target.value)} value={user}/>
            {ErrorMessage("user")}
          </div>
          
          <div className="login_container"> 
            <label for="pass" id="password">Password </label>
            <input ref={userRef} type="password" id="pass" name="pass" required
            onChange={(e) => setPwd(e.target.value)} value={pwd}/>
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
          <h1 id="login-header">LoginPage</h1>
          {submit ? <div>S  igned in successfully!</div> : showForm}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;