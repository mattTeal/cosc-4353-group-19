import React, { useState } from 'react';
import NavBar from '../util/NavBar/NavBar';
import './RegisterPage.css'

function RegisterPage() {

  // edit to validate matching passwords and hold the variables

  const [errmsg, seterrmsg] = useState({});
  const [submit, setsubmit] = useState(false);
  


  const showForm = (

    <>
    <div className="registerForm">
       <form /*onSubmit={this.passwordChecker}*/>

      <div className="signup">
            <label>Sign Up</label>
          </div>

        <div className="register_container">
          <label for="user" id="username">Username </label>
          <input type="text" id="user" name="user" required></input>
        </div>
        
        <div className="register_container"> 
          <label for="pass" id="password">Password </label>
          <input type="password" id="pass" name="pass" required /*value={this.useState.input.pass}
                  onChange={this.submit}*/></input>
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
        <NavBar/>
        <div className="title">
          {/* <h1 id="register-header">RegisterPage</h1> */}
          {submit ? <div>Successfully created!</div> : showForm}
        </div>
      </div>
  );
}

export default RegisterPage;