const express = require("express");
const router = express.Router();
const db = require('../database');
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    //fetch profile data from database


});

router.post('/', (req, res) => {
    // copying input data 
    const addressData = { 
        firstName: req.body.firstNameForm.trim() || "",
        lastName: req.body.lastNameForm.trim() || "",
        addressLine1: req.body.address1Form.trim() || "",
        addressLine2: req.body.address2Form.trim() || "",
        city: req.body.cityForm.trim() || "",
        stateCode: req.body.stateForm.trim() || "",
        zipcode: req.body.zipcodeForm.trim() || "" //<- for error checking
    }

    //input validation
    const regexName = /^[a-zA-Z]+$/;
    const regexStreet = /\b\d{1,6} +.{2,25}\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|blvd|plaza|parkway|pl|place|pkwy)[.,]?(.{0,25} +\b\d{5}\b)?/ig;
    const regexCityGrid = /(\b( +)?\d{1,6} +(north|east|south|west|n|e|s|w)[,.]?){2}(.{0,25} +\b\d{5}\b)?\b/ig;
    const regexAptSuite = /((#|APT|BSMT|BLDG|DEPT|FL|FRNT|HNGR|KEY|LBBY|LOT|LOWR|OFC|PH|PIER|REAR|RM|SIDE|SLIP|SPC|STOP|STE|TRLR|UNIT|UPPR|\,)[\w]*)\n/gi;
    const regexZipcode = /^\d{5}(-\d{4})?$/;
    const regexCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

    if (!regexName.test(addressData.firstName) || !regexName.test(addressData.lastName))
        //res.status(400).send("First or last name contains invalid characters.");
        res.status(400).send(`First or last name contains invalid characters.`);
    else if (!regexStreet.test(addressData.addressLine1) && !regexCityGrid.test(addressData.addressLine1)) 
        res.status(400).send("Address line 1 invalid. Please try again with valid input.");
    else if (addressData.addressLine2 !== "" && !regexAptSuite.test(addressData.addressLine2))
        res.status(400).send("Address line 2 invalid. Please try again with valid input.");
    else if (!regexCity.test(addressData.city))
        res.status(400).send("City field is invalid. Please try again with valid input.");
    else if (!regexZipcode.test(addressData.zipcode))
        res.status(400).send("Zip code is invalid. Please try again with valid input.");
    else {
        //create user object
        mockDB["userProfileInfo"] = JSON.stringify(addressData);
        mockDB["authInfo"].profileCompleted = true;
        //response
        res.status(200).send("Post completed with status code 200.");
    }
})

// router.put('/:id', (req, res) => {

// })

module.exports = router;