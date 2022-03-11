const express = require("express");
const router = express.Router();
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    res.status(200).send(mockDB.userProfileInfo);
});

router.post('/', (req, res) => {
    // copying input data 
    const addressData = { 
        firstName: req.body.firstNameForm || " ",
        lastName: req.body.lastNameForm || " ",
        addressLine1: req.body.address1Form || " ",
        addressLine2: req.body.address2Form || "",
        city: req.body.cityForm || " ",
        stateCode: req.body.stateForm || " ",
        zipcode: req.body.zipcodeForm || " " //<- for error checking
    }

    //input validation
    const regexName = /^[a-zA-Z]+$/;
    const regexStreet = /\b\d{1,6} +.{2,25}\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|blvd|plaza|parkway|pkwy)[.,]?(.{0,25} +\b\d{5}\b)?/ig;

    if (!regexName.test(addressData.firstName) || !regexName.test(addressData.lastName))
        //res.status(400).send("First or last name contains invalid characters.");
        res.status(400).send(`First (${req.body.firstNameForm}) or last name (${addressData.lastName}) contains invalid characters.`);
    else if (!regexStreet.test(addressData.addressLine1)) 
        res.status(400).send("Address line 1 invalid. Please try again with valid input.")
    


    //create user object
    mockDB["userProfileInfo"] = JSON.stringify(addressData);

    //response
    res.status(200).send("Post completed with status code 200.");
})

// router.put('/:id', (req, res) => {

// })

module.exports = router;