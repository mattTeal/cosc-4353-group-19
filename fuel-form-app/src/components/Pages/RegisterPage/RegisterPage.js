import React, { useState } from 'react';
import './RegisterPage.css'

function RegisterPage() {

  const [errmsg, seterrmsg] = useState({});
  const [submit, setsubmit] = useState(false);

  const showForm = (
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
  );

  return (

      <div className="register-form">
        <div className="title">
          <h1 id="register-header">RegisterPage</h1>
          {submit ? <div>Register</div> : showForm}
        </div>
      </div>
  );
}

export default RegisterPage;