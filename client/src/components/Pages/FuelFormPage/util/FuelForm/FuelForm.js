import React, { useState } from 'react'
import './FuelForm.css'
//import getStorageValue from '../../../util/useLocalStorage/useLocalStorage'
import AddressData from '../AddressData/AddressData'
import { createQuote } from '../../../../../api/quoteBackend'

function FuelForm(props) {
    const [details, setDetails] = useState(
        {
          gallons: 0,
          date: '',  
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateCode: "",
          zipcode: ""
        }
      );
    const userData = {
        gallons: details.gallons,
        date: details.date,
        addressLine1: props.addressLine1,
        addressLine2: props.addressLine2,
        city: props.city,
        stateCode: props.stateCode,
        zipcode: props.zipcode,
    }
    const [userAddress, setUserAddress] = useState(true);
    const [loading, setLoading] = useState('false')

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(details);
        createQuote(details).then(
            setLoading(false),
            console.log("New quote created.")
        )
    }

    const initialState = {
          gallons: details.gallons,
          date: details.date,
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateCode: "AL",
          zipcode: ""
      };

    const handleAddress = () => {
        setUserAddress(!userAddress)
        if(!userAddress)
            setDetails(initialState);
        else
            setDetails(userData);
        console.log(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Find out how much you can save!</h2>
                <div className="form-group">
                    <label>Gallons requested</label>
                    <input type="number" minLength={0} name="gallons" id="gallons" required onChange={
                        e => setDetails({...details, gallons: e.target.value})} value={details.gallons}/>
                </div>
                <div className="form-group">
                    <input type='checkbox' id='useraddress' onClick={() => handleAddress()}/>
                    <label for='useraddress'>Use address linked to account</label>
                    <label>Shipping Address</label>
                    {!userAddress ?
                        <div> 
                            <label htmlFor='address1Form'>Address Line 1</label>
                            <input 
                            type='text' 
                            id='address1Form' 
                            name='address1Form' 
                            maxLength={100} 
                            onChange={e => setDetails({...details, addressLine2: e.target.value})} 
                            value = {details.addressLine1} 
                            required>
                            </input>                   
                            <label htmlFor='address2Form'>Address Line 2</label>
                            <input 
                            type='text' 
                            id='address2Form' 
                            name='address2Form' 
                            maxLength={100} 
                            onChange={e => setDetails({...details, addressLine2: e.target.value})} 
                            value = {details.addressLine2}>
                            </input>
                            <label htmlFor='cityForm'>City</label>
                            <input 
                            type='text' 
                            id='cityForm' 
                            name='cityForm' 
                            maxLength={100} 
                            onChange={e => setDetails({...details, city: e.target.value})} 
                            value = {details.city}
                            required>  
                            </input>
                            <label htmlFor='stateForm'>State</label>
                            <select 
                            value={details.stateCode} name="stateForm"
                            onChange={e => setDetails({...details, stateCode: e.target.value})}>
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
                            <label htmlFor='zipcodeForm'>Zip Code</label>  
                            <input inputMode='numeric'
                            type='number' 
                            id='zipcodeForm' 
                            name='zipcodeForm' 
                            maxLength={9} 
                            minLength={5} 
                            onChange={e => setDetails({...details, zipcode: e.target.value})} value = {details.zipcode}
                            required>
                            </input>
                        </div> 
                        : 
                        <AddressData 
                            addressLine1 = {userData.addressLine1}
                            addressLine2 = {userData.addressLine2}
                            city = {userData.city}
                            stateCode = {userData.stateCode}
                            zipcode = {userData.zipcode}
                        /> 
                    }
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
    )
}

export default FuelForm