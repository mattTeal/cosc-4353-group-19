import React, { useState } from 'react'
import './FuelForm.css'
import getStorageValue from '../../../util/useLocalStorage/useLocalStorage'
import AddressData from './AddressData/AddressData'

function FuelForm() {

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

    const [details, setDetails] = useState({gallons: "", state: userData.stateCode, date: ""})

    const submitHandler = e => {
        e.preventDefault();
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Find out how much you can save!</h2>
                <div className="form-group">
                    <label>Gallons requested</label>
                    <input type="text" name="gallons" id="gallons" onChange={
                        e => setDetails({...details, gallons: e.target.value})} value={details.gallons}/>
                </div>
                <div className="form-group">
                    <label>Shipping Address</label>
                    <AddressData 
                        addressLine1 = {userData.addressLine1}
                        addressLine2 = {userData.addressLine2}
                        city = {userData.city}
                        stateCode = {userData.stateCode}
                        zipcode = {userData.zipcode}
                    />
                    <div>
                        <br></br>
                        {details.state === "TX" ? "You qualify for in-state rates!" : "You do not qualify for in-state rates."}
                    </div>
                </div>
                <div className="form-group">
                    <label>Date of Purchase</label>
                    <input type="date" id="date" name="date" onLoad="getDate()"
                            max="2099-12-31"
                            onChange={
                                e => setDetails({...details, date: e.target.value})} value={details.date}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Find Cost"></input>
                </div>
            </div>
        </form>

        <div>
            <footer id="copyright">
            <small>&copy; Copyright 2022, Fuel Form Page Group 19</small>
            </footer>
         </div>
        </>
    )
}

export default FuelForm