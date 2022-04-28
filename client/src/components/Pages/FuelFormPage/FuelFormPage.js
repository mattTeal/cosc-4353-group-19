import React, { useEffect, useState } from 'react';
//import UserInfoContext from '../util/AuthContext/AuthContext.tsx';
import { useUserInfo } from '../util/AuthContext/AuthContext.tsx';
import NavBar from '../util/NavBar/NavBar';
import FuelForm from './util/FuelForm/FuelForm'
import QuoteTable from './util/QuoteTable/QuoteTable';
import getStorageValue from '../util/useLocalStorage/useLocalStorage'
import './FuelFormPage.css';

import { getQuotes, getUser } from '../../../api/quoteBackend'

function FuelFormPage() {
  
  //const { userInfo, setUserInfo } = useUserInfo();
  //console.log(userInfo); // this is the userID from the AuthContext

  /*const [User, setUser] = useState( 
    {
      addressLine1: "",
      addressLine2: "",
      city: "",
      firstName: "",
      lastName: "",
      stateCode: "",
      zipcode: "",
    } 
  );*/

  return (
      <div id="OuterDiv">
          <NavBar/>
          <div id="FuelFormPageContent">
            <div id='PositionModal'>
              <FuelForm id="GettingToModal"/>
            </div>
            <div id="TableFlexBox">
              <h2 id='TableTitle'>Quote History</h2> 
              <QuoteTable />
            </div>
          </div>
          <div>
              <footer id="copyright">
              <small>&copy; Copyright 2022, Fuel Form Page Group 19</small>
              </footer>
          </div>
      </div>
  );
}

export default FuelFormPage;
