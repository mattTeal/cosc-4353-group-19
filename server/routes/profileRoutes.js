const express = require("express");
const router = express.Router();
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    res.status(200).send(mockDB.userProfileInfo);
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

    //create user object
    mockDB["userProfileInfo"] = JSON.stringify(addressData);

    //response
    res.status(200).send("Post completed with status code 200.");
})

// router.put('/:id', (req, res) => {

// })

module.exports = router;