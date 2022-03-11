exports.mockDB = {
    "quoteHistory": {
        quoteId: "",
        timestamp: "", // <- don't know about this. might need make this like a template type instead of an object
        stateCode:"",
        //inState: (this.mockDB.quoteHistory == 'TX'), // <- waaah.
        gallons: 0,
        totalCost: 0 
    },
    "userProfileInfo": {
        firstName:"",
        lastName:"",
        addressLine1:"",
        addressLine2:"",
        city:"",
        stateCode: "AL", //lol
        zipcode:""
    },
    "authInfo": {
        username: "",
        password: "",
        existingCustomer: true,
        profileCompleted: false,
    }
};



