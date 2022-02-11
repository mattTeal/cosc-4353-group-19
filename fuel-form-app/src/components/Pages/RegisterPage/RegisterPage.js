import React, { useState } from 'react';
import './RegisterPage.css'

function RegisterPage() {

  // edit to validate matching passwords and hold the variables

  const [errmsg, seterrmsg] = useState({});
  const [submit, setsubmit] = useState(false);

  // const ErrorMessage = (name) =>
  //   name === errmsg.name && (
  //   <div className="error">{errmsg.message}</div>
  // );

  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   var {user, pass} = document.forms[0];
  //   const data = tempLogin.find((users) => users.username === user.value);

  //   if(data){
  //     if(data.password !== pass.value){
  //       seterrmsg({name: "pass", message: errs.pass})
  //     }
  //     else{
  //       setsubmit(true);
  //     }
  //   }
  //   else{
  //     seterrmsg({name: "user", message: errs.user});
  //   }
  // };


  // const errs = {
  //   user: "invalid username",
  //   pass: "invalid password"
  // };


  const showForm = (

    <>
    <div className="registerForm">
      <form>

      <div className="signup">
            <label>Sign Up</label>
          </div>

        <div className="register_container">
          <label for="user" id="username">Username </label>
          <input type="text" id="user" name="user" required></input>
        </div>
        
        <div className="register_container"> 
          <label for="pass" id="password">Password </label>
          <input type="password" id="pass" name="pass" required></input>
        </div>

        <div className="register_container"> 
          <label for="confirmpass" id="confirmpassword">Confirm Password </label>
          <input type="password" id="confirmpass" name="confirmpass" required></input>
        </div>
        
        <div className="butt_container">
          <input type="submit" class="submit_butt" value="Complete Profile"></input>
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

      <div className="register-form">
        <div className="title">
          <h1 id="register-header">RegisterPage</h1>
          {submit ? <div>Successfully created!</div> : showForm}
        </div>
      </div>
  );
}

export default RegisterPage;