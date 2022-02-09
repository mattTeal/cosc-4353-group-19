import React, { useState } from 'react';

function RegisterPage() {

  const [errmsg, seterrmsg] = useState({});
  const [submit, setsubmit] = useState(false);

  const showForm = (
    <div className="registerForm">
      <form>
        <div className="register_container">
          <label for="user">Username:</label>
          <input type="text" id="user" name="user" required></input>
        </div>
        
        <div className="register_container"> 
          <label for="pass">Password:</label>
          <input type="password" id="pass" name="pass" required></input>
        </div>

        <div className="register_container"> 
          <label for="confirmpass">Confirm Password:</label>
          <input type="password" id="confirmpass" name="confirmpass" required></input>
        </div>
        
        <div className="butt_container">
          <input type="submit" class="submit_butt" value="Submit"></input>
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