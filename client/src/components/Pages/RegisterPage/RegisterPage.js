import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { createUser } from '../../../api/register/registerBackend';
import { useUserInfo } from '../util/AuthContext/AuthContext.tsx';
import './RegisterPage.css'

function RegisterPage() {
  const [errmsg, seterrmsg] = useState({ name:"", message: "" });
  const [submit, setsubmit] = useState(false);
  const [vals, setVals] = useState({
    username: '',
    password: '',
    confirmpass: ''
  });

  const { userInfo, setUserInfo } = useUserInfo();

  const [passwordValid, setPasswordValid] = useState(false);

  const changeHandler = (e) => {
    const {name, value} = e.target
    setVals({
      ...vals,
      [name]: value
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setsubmit(passwordValid);
    seterrmsg(ValiditePass());

    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmpass = e.target.confirmpass.value;
      
    createUser({username, password, confirmpass}
      ).then(res => {
        localStorage.setItem('userID', res.userID);
        //console.log(userID); //<- testing
        setUserInfo({ userID: res.userID });
      })
      .catch(error => {
        console.log('error', error);
        //seterrmsg({name: "Error", message: error});
      });
  }

  useEffect(
    () => {
      if(Object.keys(errmsg).length === 0 && submit) {
        setPasswordValid(true);
      }
    }, [errmsg, submit]
  );

  function ValiditePass(){

    if(vals.confirmpass !== vals.password){
      setPasswordValid(false);
      errmsg.confirmpass = 'Passwords do not match'
    }
    setPasswordValid(true);
    return errmsg;
  }

  const showForm = (
    <>
      <div className="registerForm">
        <form onSubmit={submitHandler}/*action="http://localhost:8080/api/auth/register" method="POST"*/>
          <div className="signup">
            <label>Sign Up</label>
          </div>
          <div className="register_container">
            <label htmlFor="user" id="username">Username </label>
            <input type="text" id="user" name="username" required 
              value={vals.username} 
              onChange={changeHandler}></input>
          </div>
          <div className="register_container"> 
            <label htmlFor="pass" id="password">Password </label>
            <input type="password" id="pass" name="password" required 
              value={vals.password} 
              onChange={changeHandler}></input>
          </div>
          <div className="register_container"> 
            <label htmlFor="confirmpass" id="confirmpassword">Confirm Password </label>
            <input type="password" id="confirmpass" name="confirmpass" required 
              value={vals.confirmpass} 
              onChange={changeHandler}></input>
              {errmsg.confirmpass && <p>{errmsg.confirmpass}</p>}
          </div>
          <div className="butt_container">
            <input type="submit" className="submit_butt" value="Complete Sign Up"></input>
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
        {!submit ? showForm : <Navigate to ="/profile"/>}
      </div>
  );
}

export default RegisterPage;