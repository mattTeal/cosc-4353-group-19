import React from "react";

function AddressData(props) {
    
    const userData = {
        addressLine1: props.addressLine1,
        addressLine2: props.addressLine2,
        city: props.city,
        stateCode: props.stateCode,
        zipcode: props.zipcode
    }

    return (
        <div className='UserAddressDisplayClass' id='UserAddressDisplayID'>
            <span className='Address1Display'>{userData.addressLine1} </span> <br></br>
            {userData.addressLine2 === "" ? null 
            : 
                <div>
                <span className='Address2Display'>{userData.addressLine2}</span> 
                <br></br> 
                </div>
            }
            <span className='CityDisplay'>{userData.city}, </span>
            <span className='StateDisplay'>{userData.stateCode} </span>
            <span className='ZipcodeDisplay'>{userData.zipcode}</span>
        </div>
    )
}

export default AddressData
