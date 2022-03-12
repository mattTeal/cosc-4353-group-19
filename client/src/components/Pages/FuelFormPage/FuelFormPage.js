import React, { useEffect, useState } from 'react';
import NavBar from '../util/NavBar/NavBar';
import FuelForm from './util/FuelForm/FuelForm'
import QuoteTable from './util/QuoteTable/QuoteTable';
import getStorageValue from '../util/useLocalStorage/useLocalStorage'
import './FuelFormPage.css';

import { getQuotes, getUser } from '../../../api/quoteBackend'

function FuelFormPage() {
  
  const [User, setUser] = useState( 
    {
      addressLine1: "",
      addressLine2: "",
      city: "",
      firstName: "",
      lastName: "",
      stateCode: "",
      zipcode: "",
    } 
  );

  const quoteData = getStorageValue("quote", {
      firstName:"",
      lastName:"",
      addressLine1:"",
      addressLine2:"",
      city:"",
      stateCode:"",
      zipcode:"",
      gallons: "", 
      pricePerGallon: "",
      date: "",
    }
  );

  useEffect(() => {
    getUser().then((result) => {
      setUser(result);
    })
  }, [])

  return (
    <div id="OuterDiv">
        <NavBar/>
        <div id="FuelFormPageContent">
          <FuelForm 
            addressLine1 = {User.addressLine1}
            addressLine2 = {User.addressLine2}
            city = {User.city}
            stateCode = {User.stateCode}
            zipcode = {User.zipcode}
          />
          <div id="TableFlexBox">
            <h2 id='TableTitle'>Quote History</h2> 
            {/* in the future, don't pass all these props. have table update upon changing. maybe?
            logic will change when we implement backend */}
            <QuoteTable 
              firstName = {User.firstName}
              lastName = {User.lastName}
              addressLine1 = {User.addressLine1}
              addressLine2 = {User.addressLine2}
              city = {User.city}
              stateCode = {User.stateCode}
              zipcode = {User.zipcode}
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
