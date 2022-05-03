import React, { useEffect, useState } from 'react';
import NavBar from '../util/NavBar/NavBar'
//import StateDropDown from '../FuelFormPage/util/FuelForm/StateDropDown/StateDropDown';
import AddressData from '../FuelFormPage/util/AddressData/AddressData';
import { useUserInfo } from '../util/AuthContext/AuthContext.tsx';
//import fetchData from '../util/FrontEndFunctions/apiRequests';
import './ProfilePage.css'
import { editUser } from '../../../api/profileBackend';

function ProfilePage() {

  const { userInfo } = useUserInfo();

  const [User, setUser] = useState(
    {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateCode: "",
      zipcode: "",
      key: ""
    }
  );

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (userInfo.userID === "") {
      console.log("User not logged in!");
    }
    //profile still needs detect when a user has not completed their profile first

    /*const url = "http://localhost:8080/api/profile/";

    fetch(url, {
      method:"GET",
      redirect:"follow",
      credentials: "same-origin"
    })
      .then((response) => {
        if (!response.ok)
          return response.text().then(text => { throw new Error(text)} )
        else 
          return response.json();
      })
      .then((data) => {
        console.log(data); 
        setUser(() => {
          return {
            firstName: data.FirstName,
            lastName: data.LastName,
            addressLine1: data.AddressLine1,
            addressLine2: data.AddressLine2 || "",
            city: data.City,
            stateCode: data.StateCode,
            zipcode: data.Zipcode
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setHidden(false);
      });*/

  },[hidden]);

  //const [hidden, setHidden] = useState(); // this boolean will be replaced by user authenticated or profileComplete

  let profileEditHandler = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(User));
    var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");
    setUser({...User, key: key})
    
    editUser(User)
      .then(result => {
        console.log(result);
        setHidden(hidden => !hidden);
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <div>
      <NavBar />
      <div className='ProfileContainer'>
        <h1>Profile</h1>
        {hidden ? 
        <div className='ProfileInfo' id='ProfileInfoDisplay'>
          <AddressData />
          <button 
            onClick={() => {setHidden(hidden => !hidden);}}>Edit Profile Information
          </button>
        </div>

        :

        <div className='ProfileInfoEditing' id='ProfileInfoEditingDisplay'>
          <form onSubmit={profileEditHandler} /*action="http://localhost:8080/api/profile" method="POST" */>
            <button
              onClick={() => {
                if ((User.firstName === " " || User.firstName === "") && hidden === false) //replace with a "profile made" boolean
                  alert("Please submit valid profile information!");
                else {
                  setHidden(hidden => !hidden);
                }
              }}>
              Cancel Editing Profile Information
            </button>

            <h2>Full Name</h2>
              <input type='text' id='firstNameForm' placeholder='eg. John' name='firstNameForm' maxLength={25} onChange={e => setUser({...User, firstName: e.target.value})} value = {User.firstName} required></input>
              <label htmlFor='firstNameForm'>First Name</label>
              <input type='text' id='lastNameForm' placeholder='eg. Doe' name='lastNameForm' maxLength={25} onChange={e => setUser({...User, lastName: e.target.value})} value = {User.lastName} required></input>
              <label htmlFor='lastNameForm'>Last Name</label>
              <br />

            <h2>Address</h2>
              <input 
                type='text' 
                id='address1Form' 
                name='address1Form' 
                maxLength={100} 
                onChange={e => setUser({...User, addressLine1: e.target.value})} 
                value = {User.addressLine1} 
                required>
              </input>
              <label htmlFor='address1Form'>Address Line 1</label>
              
              <input 
                type='text' 
                id='address2Form' 
                name='address2Form' 
                maxLength={100} 
                onChange={e => setUser({...User, addressLine2: e.target.value})} 
                value = {User.addressLine2}>
              </input>
              <label htmlFor='address2Form'>Address Line 2</label>
              
              <input 
                type='text' 
                id='cityForm' 
                name='cityForm' 
                maxLength={100} 
                onChange={e => setUser({...User, city: e.target.value})} 
                value = {User.city}
                required>  
              </input>
              <label htmlFor='cityForm'>City</label>
              
              <select 
              value={User.stateCode} name="stateForm"
              onChange={e => setUser({...User, stateCode: e.target.value})}>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AR">AR</option>	
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>	
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>	
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>	
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>			
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>	
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </select>
              <label htmlFor='stateForm'>State</label>

              <input inputMode='numeric'
                type='number' 
                id='zipcodeForm' 
                name='zipcodeForm' 
                maxLength={9} 
                minLength={5} 
                onChange={e => setUser({...User, zipcode: e.target.value})} value = {User.zipcode}
                required>
              </input>
              <label htmlFor='zipcodeForm'>Zip Code</label>

            <button type="submit">Save Changes</button>
          </form>
        </div> }
      </div>
      <br />
      <div>
        <footer id="copyright">
          <small>&copy; Copyright 2022, Fuel Form Page Group 19</small>
        </footer>
      </div>
    </div>
  );
}

export default ProfilePage;