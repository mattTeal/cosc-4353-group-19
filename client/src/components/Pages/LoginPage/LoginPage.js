import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginPage.css'
import { useUserInfo } from '../util/AuthContext/AuthContext.tsx';
import { loginUser } from '../../../api/loginBackend';

function LoginPage() {
  //edit to have variables that hold the username and password
  const [err, setErr] = useState({ name:"", message: "" });
  const [submit, setSubmit] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();

  const ErrorMessage = (name) =>
    name === err.name && (
    //<div className="error">{err.message}</div>
    <div dangerouslySetInnerHTML={{__html: err.message}} className="error"/>
  );

  const errs = {
    username: "invalid username",
    password: "invalid password"
  };

  const submitHandler = (e) => {
    //const { username, password } = document.forms[0]; //<- returning innerHTML object ?
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const validRegex = /^\w+$/;

    if (!validRegex.test(username)) {
        e.preventDefault();
        setErr({ name: "username", message: errs.username })
        //console.log(err); // <- testing
        //console.log(`username: ${username}`); // <- testing
    }

    if (!validRegex.test(password)) {
        e.preventDefault();
        setErr({ name: "password", message: errs.password })
        //console.log(err); // <- testing
        //console.log(`password: ${password}`); // <- testing
    }
    else { //attempting to add a fetch request to circumvent redirection  
      loginUser({username, password})
        .then(res => {
          setSubmit(true);
          localStorage.setItem('userID', res.userID);
          //console.log(userID); //<- testing
          setUserInfo({ userID: res.userID });
        })
        .catch(error => {
          setSubmit(false);
          console.log('error: ', error)
          setErr({name: "Error", message: error});
        });
    }

    //setSubmit(true);
  }

  const showForm = (
    <>
      <div className="loginForm">
        <form onSubmit={submitHandler} >
          <div className="signin">
            <h3>Sign In</h3>
          </div>
          <div className="login_container">
            {ErrorMessage("Error")}
            <label htmlFor="username" id="username">Username </label>
            <input type="text" id="username" name="username" required></input>
            {ErrorMessage("user")}
          </div>
          <div className="login_container"> 
            <label htmlFor="password" id="password">Password </label>
            <input type="password" id="password" name="password" required></input>
            {ErrorMessage("pass")}
          </div>
          <div className="butt_container">
            <input type="submit" className="submit_butt" value="Submit"></input>
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
            {submit ? <Navigate to="/fuel"/> : showForm}
          </div>
        </div>
      </div>
  );
}

export default LoginPage;