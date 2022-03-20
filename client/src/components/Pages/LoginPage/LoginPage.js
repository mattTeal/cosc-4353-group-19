import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginPage.css'

function LoginPage() {
  //edit to have variables that hold the username and password
  const [err, setErr] = useState({ name:"", message: "" });
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState();

  const ErrorMessage = (name) =>
    name === err.name && (
    //<div className="error">{err.message}</div>
    <div dangerouslySetInnerHTML={{__html: err.message}} className="error"/>
  );

  const errs = {
    user: "invalid username",
    pass: "invalid password"
  };

  const submitHandler = (e) => {
    //event.preventDefault();

  //   var {user, pass} = document.forms[0];
  //   const data = tempLogin.find((users) => users.username === user.value);

  //   if(data) {
  //     if(data.password !== pass.value){
  //       setErr({name: "pass", message: errs.pass})
  //     }
  //     else{
  //       setSubmit(true);
  //     }
  //   }
  //   else {
  //     setErr({name: "user", message: errs.user});
  //   }
  // };

  // const tempLogin = [
  //   {
  //     username: "user1",
  //     password: "pass1"
  //   },
  //   {
  //     username: "user2",
  //     password: "pass2"
  //   }


  //];

    //const { username, password } = document.forms[0]; //<- returning innerHTML object ?
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const validRegex = /^\w+$/;

    if (!validRegex.test(username)) {
        e.preventDefault();
        setErr({ name: "username", message: errs.user })
        //console.log(err); // <- testing
        //console.log(`username: ${username}`); // <- testing
    }

    if (!validRegex.test(password)) {
        e.preventDefault();
        setErr({ name: "password", message: errs.pass })
        //console.log(err); // <- testing
        //console.log(`password: ${password}`); // <- testing
    }
    else { //attempting to add a fetch request to circumvent redirection
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", username);
      urlencoded.append("password", password);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        //redirect: 'follow'
      };
      
      fetch("http://localhost:8080/api/auth/login", requestOptions)
        .then(response => {
          if (!response.ok) {
            //e.preventDefault();
            return response.text().then(text => {
              //console.log(text); //<- testing
              throw new Error(text);
            })
          }
          else {
            setSubmit(true);
            //e.preventDefault();
            //console.log(response.text); //<- testing
            return response.text();
          }
        })
        .then(response => {
          setUser(response.json());
          console.log(user);
        })
        .catch(error => {
          //console.log('error', error);
          setErr({name: "Error", message: error});
        });
    }

    //setSubmit(true);
  }

  const showForm = (
    <>
      <div className="loginForm">
        {/* <form action="http://localhost:8080/api/auth/login" method="POST"> */}
        <form onSubmit={submitHandler} /*action="http://localhost:8080/api/auth/login" method="POST"*/>
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