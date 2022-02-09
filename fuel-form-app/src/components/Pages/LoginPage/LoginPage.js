import React, { useState } from 'react';

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
          <div className="login_container">
            <label for="user">Username</label>
            <input type="text" id="user" name="user" required></input>
          </div>
          
          <div className="login_container"> 
            <label for="pass">Password</label>
            <input type="password" id="pass" name="pass" required></input>
          </div>
          
          <div className="butt_container">
            <input type="submit" class="submit_butt" value="Submit"></input>
          </div>
          
          
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