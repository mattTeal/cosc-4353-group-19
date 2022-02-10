import React from 'react';
import './ProfilePage.css'

function ProfilePage() {

  var UserProfileInfo = {
    firstName:'',
    lastName:'',
    addressLine1:'',
    addressLine2:'',
    city:'',
    stateCode:'',
    zipcode:''
  }
  //var currProfInfoDisplay = document.getElementById('ProfileInfoDisplay');
  var editProfInfoDisplay = document.getElementById('ProfileInfoEditingDisplay');

  const editProfileInfo = () => {
    editProfInfoDisplay.style.display = "block";
  }

  var saveChanges = () => {
    //editProfInfoDisplay.style.display = "none";
  }

  return (
    <div>
      <h1>Profile</h1>

      <div className='ProfileContainer'>

        <div className='ProfileInfo' id='ProfileInfoDisplay'>

          <div className='FullNameDisplay'> {/*This div could be unnecessary*/}
            <span className='FirstNameDisplay'>{UserProfileInfo.firstName}</span>
            <span className='LastNameDisplay'>{UserProfileInfo.lastName}</span> {/*Fill these fields in with actual data later!*/}
          </div>

          <div className='UserAddressDisplayClass' id='UserAddressDisplayID'>
            <span className='Address1Display'>{UserProfileInfo.addressLine1}</span>
            <span className='Address2Display'>{UserProfileInfo.addressLine2}</span>
            <span className='CityDisplay'>{UserProfileInfo.city}</span>
            <span className='StateDisplay'>{UserProfileInfo.stateCode}</span>
            <span className='ZipcodeDisplay'>{UserProfileInfo.zipcode}</span>
          </div>

          <button onClick={editProfileInfo}>Edit Profile Information</button>

        </div>

        <div classname='ProfileInfoEditing' id='ProfileInfoEditingDisplay'>

          <form>
            
            <h2>Full Name</h2>
              <input type='text' id='firstNameForm' placeholder='eg. John' name='firstNameForm' maxLength={25} required></input> 
              <label for='firstNameForm'>First Name</label>
              <input type='text' id='lastNameForm' placeholder='eg. Doe' name='lastNameForm' maxLength={25} required></input>
              <label for='lastNameForm'>Last Name</label>
              <br />

            <h2>Address</h2>
              <input type='text' id='address1Form' name='address1Form' maxLength={100} required></input>
              <label for='address1Form'>Address Line 1</label>
              <input type='text' id='address2Form' name='address2Form' maxLength={100}></input>
              <label for='address2Form'>Address Line 2</label>
              <input type='text' id='cityForm' name='cityForm' maxLength={100} required></input>
              <label for='cityForm'>City</label>
              <input type='text' id='zipcodeForm' name='zipcodeForm' maxLength={9} minLength={5} required></input>
              <label for='zipcodeForm'>Zip Code</label>

            <button onClick={saveChanges()}>Save Changes</button>

          </form>

        </div>

      </div>
      <br />
    </div>
  );
}

export default ProfilePage;