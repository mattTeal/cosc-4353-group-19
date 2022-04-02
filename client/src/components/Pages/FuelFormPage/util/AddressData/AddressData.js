import React, { useEffect, useState } from "react";
import { getUser } from '../../../../../api/quoteBackend.js'
import { useUserInfo } from '../../../util/AuthContext/AuthContext.tsx';

function AddressData(props) {

    const { userInfo } = useUserInfo();

    const [addressData, setAddressData] = useState({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateCode: "",
        zipcode: ""
    });

    useEffect(() => {
        var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");

        getUser(key).then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
              setAddressData(
                {
                    addressLine1: data[0].AddressLine1,
                    addressLine2: data[0].AddressLine2 || "",
                    city: data[0].City,
                    stateCode: data[0].StateCode,
                    zipcode: data[0].ZipCode,
                    fullName: data[0].FullName
                }
              ); // query causes supplemental data to be returned. at index 0 is the data we want.
              //console.log(data[0]);
              //console.log(addressData);
            }
        });

    }, []);

    return (

        <div className='UserAddressDisplayClass' id='UserAddressDisplayID'>
            <span className='FullNameDisplay'>{addressData.fullName} </span> <br></br>
            <span className='Address1Display'>{addressData.addressLine1} </span> <br></br>
            {addressData.addressLine2 === "" ? null 
            : 
                <div>
                <span className='Address2Display'>{addressData.addressLine2}</span> 
                <br></br> 
                </div>
            }
            <span className='CityDisplay'>{addressData.city}, </span>
            <span className='StateDisplay'>{addressData.stateCode} </span>
            <span className='ZipcodeDisplay'>{addressData.zipcode}</span>
        </div>
    )
}

export default AddressData
