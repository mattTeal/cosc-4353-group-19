import React, { useEffect, useState } from 'react'
import './FuelForm.css'
import { useUserInfo } from '../../../util/AuthContext/AuthContext.tsx'
//import getStorageValue from '../../../util/useLocalStorage/useLocalStorage'
import AddressData from '../AddressData/AddressData'
import { createQuote, getUser, getQuotes } from '../../../../../api/quoteBackend'
import {Modal} from '../../util/modal'
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    width: 100%;
    margin-top: -85px;
    &:hover .butt {
        cursor: pointer;
        transform: scale(1.1) perspective(1px);
    }
    justify-content: right;
`;

const Button = styled.div`
    background-color: #ff4500;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    border: none;
    margin-bottom: 2em;
    border-radius: 2em;
    padding: 0.5em 1em;
    width: unset;
    cursor: pointer;
`;


function FuelForm(props) {

    const { userInfo } = useUserInfo();

    const [details, setDetails] = useState(
        {
          gallons: 0,
          date: '',  
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateCode: "",
          zipcode: "",
          fullName: "",
          rateHistory: false, //default value
          suggestedPrice: 0,
          total: 0
        }
    );
      
    const [quoteHidden, setQuoteHidden] = useState(true);

    const [userAddress, setUserAddress] = useState(true);

    const [showModal, setShowModal] = useState(false);
    
    const openModal = () =>{
        setShowModal(prev => !prev)
    }

    useEffect(() => {
        console.log("useEffect ran");
        setQuoteHidden(true);
        var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");

        getUser(key).then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
                //console.log("inside useEffect; getUser data: ", data);
                setDetails(
                    {
                        ...details,
                        addressLine1: data[0].AddressLine1,
                        addressLine2: data[0].AddressLine2 || "",
                        city: data[0].City,
                        stateCode: data[0].StateCode,
                        zipcode: data[0].ZipCode,
                        fullName: data[0].FullName
                    }
                ); 
                console.log("inside useEffect; setDetails: ", details);
              //console.log(data)// query causes supplemental data to be returned. at index 0 is the data we want.
            }
        });
    }, [userInfo.userID]);

    useEffect(() => { // to run when details is updated
        console.log("details has been updated as per details UseEffect: ", details);
    }, [details]);

    useEffect(() => { //to initally update rateHistory
        var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");
        getQuotes(key).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else {
                setDetails((prevDetails) => (
                    {
                        ...prevDetails,
                        rateHistory: (data[0].length > 0),
                    }
                ));
                console.log("inside useEffect part 2; setDetails: ", details);
            }
        })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        setQuoteHidden(quoteHidden => !quoteHidden);
        //console.log(details);
        //assign RateHistoryFactor root
        var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");

        getQuotes(key).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else {
                setDetails(
                    {
                        ...details,
                        rateHistory: (data[0].length > 0),
                    }
                );
                console.log("inside submitHandler; setDetails: ", details);
            }
        }) 

        var createQuoteParams = {
            fullName: details.fullName,
            gallons: details.gallons,
            date: details.date,
            addressData: {

                addressLine1: details.addressLine1,
                addressLine2: details.addressLine2 || "",
                city: details.city,
                stateCode: details.stateCode,
                zipcode: details.zipcode,
                fullName: details.fullName

            },
            inState: userAddress ? (details.stateCode === 'TX') : (props.stateCode === 'TX'),
            userID: userInfo.userID ? userInfo.userID : localStorage.getItem('userID'),
            hasRateHistory: details.rateHistory
        }
        console.log(createQuoteParams);
        //console.log("Instate boolean comparing " + details.stateCode + " to 'TX' : " + (details.stateCode === 'TX') + " and userAddress: " + userAddress);

        createQuote(createQuoteParams).then(
            console.log("New quote created.")
        )

        getQuotes(key).then(data => {
            if(data.error) {
                console.log(data.error)
            }
            else if (data[0][0].Address === false) {
                console.log("Quote database is empty.");
            }
            else{
                //console.log(data);
                setDetails(details => (
                    {
                        ...details,
                        suggestedPrice: data[0][0].SuggestedPrice,
                        total: data[0][0].Total
                    }
                ));
                //console.log("inside submitHandler part 2; setDetails: ", details);
                //console.log("After assignment to details.suggestedPrice: " + details.suggestedPrice + ", when it should be " + data[0][0].SuggestedPrice);
            }
        })

    }

    const handleAddress = () => {
        setUserAddress(!userAddress)
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
                    <div className='addrcheckbox'>
                        <label htmlFor='useraddress' className="addrLabel">Use address linked to account
                        <input type="checkbox" id='useraddress' className="useraddress" onClick={() => handleAddress()} defaultChecked/></label>
                    </div>
                    {/* <input type="checkbox" id='useraddress' classname="useraddress" onClick={() => handleAddress()} defaultChecked/>
                    <label htmlFor='useraddress' classname="addrLabel">Use address linked to account</label> */}
                    <label>Shipping Address</label>
                    {!userAddress ?
                        <div> 
                            <label htmlFor='address1Form'>Address Line 1</label>
                            <input 
                            type='text' 
                            id='address1Form' 
                            name='address1Form' 
                            maxLength={100} 
                            onChange={e => setDetails({...details, addressLine1: e.target.value})} 
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
                        <AddressData /> 
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
                
                {quoteHidden ? null :
                    <div className='Prices-Display'>
                        <div className="SPrice-Display">
                            <label>Suggested Price:</label>
                            <p><b>${details.suggestedPrice}</b></p>
                        </div>
                        <div className="TPrice-Display">
                            <label>Total Price:</label>
                            <p><b>${details.total}</b></p>
                        </div> 
                    </div>
                }
                
                <div className='submitButtons'>
                    <div className="form-group">
                        <input type="submit" value="Get Quote"></input>
                    </div>

                    <Container style={{width: '100%'}} className='Container'>
                        <Button className='butt' onClick={openModal}>
                            Save Quote
                        </Button>
                        <Modal showModal={showModal} setShowModal={setShowModal} userID = {userInfo.userID ? userInfo.userID : localStorage.getItem("userID")} suggestedPrice = {details.suggestedPrice} total = {details.total} />
                    </Container>
                </div>
                
            </div>
        </form>
    )
}

export default FuelForm