const express = require("express");
const router = express.Router();
let { mockDB } = require("../mockdatabase");

/*form parameters:
    firstName:"firstNameForm",
    lastName:"",
    addressLine1:"",
    addressLine2:"",
    city:"",
    stateCode:"",
    zipcode:""
*/

router.get('/', (req, res) => {
    //res.send(mockDB["quoteHistory"][0]); 
});

router.post('/', (req, res) => {
    // copying input data 
    const addressData = { 
        firstName: req.body.firstNameForm,
        lastName: req.body.lastNameForm,
        addressLine1: req.body.address1Form,
        addressLine2: req.body.address2Form || "",
        city: req.body.cityForm,
        stateCode: req.body.stateForm,
        zipcode: req.body.zipcodeForm
    }

    //input validation

    //response
    res.send(200);
})

// router.put('/:id', (req, res) => {

// })

module.exports = router;