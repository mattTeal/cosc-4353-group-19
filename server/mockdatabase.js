exports.mockDB = {
    "quoteHistory": [
        /*timestamp: new Date().setMilliseconds(0), // <- don't know about this. might need make this like a template type instead of an object
        address: {
            addressLine1:"",
            addressLine2:"",
            city:"",
            stateCode:"",
            zipcode:""
        },
        //inState: (this.mockDB.quoteHistory == 'TX'), // <- waaah.
        gallons: 0,
        totalCost: 0 */
    ],
    "userProfileInfo": "" /*{
        firstName:"",
        lastName:"",
        addressLine1:"",
        addressLine2:"",
        city:"",
        stateCode:"",
        zipcode:""
    }*/
    ,
    "authInfo": [{
        userId: "",
        username: "",
        hash: "",
        salt: "",
        existingCustomer: true,
        profileCompleted: false
    }]
};