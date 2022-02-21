import React from 'react';
import NavBar from '../util/NavBar/NavBar';
import FuelForm from './util/FuelForm/FuelForm'
import QuoteTable from './util/QuoteTable/QuoteTable';
import getStorageValue from '../util/useLocalStorage/useLocalStorage'
import './FuelFormPage.css';

function FuelFormPage() {

  const userData = getStorageValue("user", {
    firstName:"",
    lastName:"",
    addressLine1:"",
    addressLine2:"",
    city:"",
    stateCode:"",
    zipcode:""
    } 
  );

  const quoteData = getStorageValue("quote", {
      gallons: "", 
      state: "", //might not actually use this value but need it for retrieve to not throw an error
      date: ""
    }
  );

  return (
    <div id="OuterDiv">
        <NavBar/>

        <div id="FuelFormPageContent">
          <FuelForm 
            addressLine1 = {userData.addressLine1}
            addressLine2 = {userData.addressLine2}
            city = {userData.city}
            stateCode = {userData.stateCode}
            zipcode = {userData.zipcode}
          />
          <div id="TableFlexBox">
            <h2 id='TableTitle'>Quote History</h2> 
            {/* in the future, don't pass all these props. have table update upon changing. maybe?
            logic will change when we implement backend */}
            <QuoteTable 
              firstName = {userData.firstName}
              lastName = {userData.lastName}
              addressLine1 = {userData.addressLine1}
              addressLine2 = {userData.addressLine2}
              city = {userData.city}
              stateCode = {userData.stateCode}
              zipcode = {userData.zipcode}
              gallons = {quoteData.gallons}
              date = {quoteData.date}
            />
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
