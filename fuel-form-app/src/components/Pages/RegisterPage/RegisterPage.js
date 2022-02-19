import React, { useEffect, useState } from 'react';
import NavBar from '../util/NavBar/NavBar'
import './RegisterPage.css'

function RegisterPage() {

  // edit to validate matching passwords and hold the variables

    const [errmsg, seterrmsg] = useState({});
    const [submit, setsubmit] = useState(false);
    const [vals, setVals] = useState({
      user: '',
      pass: '',
      confirmpass: ''
    });

    const changeHandler = (e) => {
      const {name, value} = e.target
      setVals({
        ...vals,
        [name]: value
      })
    };

    const submitHandler = (e) => {
      e.preventDefault();
      seterrmsg(ValiditePass());
      setsubmit(true);
    }

    useEffect(
      () => {
        if(Object.keys(errmsg).length === 0 && submit) {
          // TO-DO
        }
      }, [errmsg, submit]
    );

  function ValiditePass(){

    if(vals.confirmpass !== vals.pass){
      errmsg.confirmpass = 'Passwords do not match'
    }

    return errmsg;
  }

  const showForm = (

    <>
    <div className="registerForm">
      <form onSubmit={submitHandler}>

      <div className="signup">
            <h3>Sign Up</h3>
          </div>

        <div className="register_container">
          <label for="user" id="username">Username </label>
          <input type="text" id="user" name="user" required 
            value={vals.user} 
            onChange={changeHandler}></input>
        </div>
        
        <div className="register_container"> 
          <label for="pass" id="password">Password </label>
          <input type="password" id="pass" name="pass" required 
            value={vals.pass} 
            onChange={changeHandler}></input>
        </div>

        <div className="register_container"> 
          <label for="confirmpass" id="confirmpassword">Confirm Password </label>
          <input type="password" id="confirmpass" name="confirmpass" required 
            value={vals.confirmpass} 
            onChange={changeHandler}></input>
            {errmsg.confirmpass && <p>{errmsg.confirmpass}</p>}
        </div>
        
        <div className="butt_container">
          <input type="submit" class="submit_butt" value="Complete Sign Up"></input>
        </div>
        <div>
          <a href="/" id="linkToReg">Already have an account? Login</a>
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
        {!submit ? showForm : <div>Signed Up successfully!</div>}
      </div>
  );
}

export default RegisterPage;