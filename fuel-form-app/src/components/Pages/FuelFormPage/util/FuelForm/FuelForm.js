import React, { useState } from 'react'
import './FuelForm.css'
import StateDropDown from './StateDropDown/StateDropDown'

function FuelForm() {
    const [details, setDetails] = useState({gallons: "", state: "", date: ""})

    const submitHandler = e => {
        e.preventDefault();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Find out how much you can save</h2>
                <div className="form-group">
                    <label>Gallons requested</label>
                    <input type="text" name="gallons" id="gallons" onChange={
                        e => setDetails({...details, gallons: e.target.value})} value={details.gallons}/>
                </div>
                <div className="form-group">
                    <label>State</label>
                    <StateDropDown/>
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