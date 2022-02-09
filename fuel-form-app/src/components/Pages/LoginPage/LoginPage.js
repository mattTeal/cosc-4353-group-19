import React, { useState } from 'react';
import './LoginPage.css'

function LoginPage() {

  const [errmsg, seterrmsg] = useState({});
  const [submit, setsubmit] = useState(false);


  // const tempLogin = [
  //   {
  //     username: "user1",
  //     password: "pass1"
  //   },
  //   {
  //     username: "user2",
  //     password: "pass2"
  //   }
  // ];

  // const errs = {
  //   user: "invalid username",
  //   pass: "invalid password"
  // };


    const showForm = (
      <div className="loginForm">
        <form>
          <div className="signin">
            <label>SignIn</label>
          </div>

          <div className="login_container">
<<<<<<< Updated upstream
            <label for="user">Username:</label>
=======
            <label for="user" id="username">Username </label>
>>>>>>> Stashed changes
            <input type="text" id="user" name="user" required></input>
          </div>
          
          <div className="login_container"> 
<<<<<<< Updated upstream
            <label for="pass">Password:</label>
=======
            <label for="pass" id="password">Password </label>
>>>>>>> Stashed changes
            <input type="password" id="pass" name="pass" required></input>
          </div>
          
          <div className="butt_container">
            <input type="submit" class="submit_butt" value="Submit"></input>
          </div>
<<<<<<< Updated upstream
          <div>
            <a href="/register">New here? Sign-up!</a>
          </div>
=======
          
          <div>
            <a href="/register" id="linkToReg">New here? Sign Up!</a>
          </div>
          
>>>>>>> Stashed changes
        </form>
      </div>
    );
      

  return (
    <>
      <div className="login-form">
        <div className="title">
          <h1 id="login-header">LoginPage</h1>
          {submit ? <div>SignIn</div> : showForm}
        </div>
      </div>
    </>
  );
}

export default LoginPage;