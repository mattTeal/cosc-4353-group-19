const express = require("express");
const router = express.Router();
const {db} = require('../database');
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    const userID = req.query.userID;
    //fetch profile data from database
    db.query(
        `CALL profileGet("${userID}");`,
        (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(rows[0]);
            }
        }
    )
});

router.post('/', (req, res) => {
    console.log(req.body)
    // copying input data 
    const addressData = { 
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        addressLine1: req.body.addressLine1 || "",
        addressLine2: req.body.addressLine2 || "",
        city: req.body.city || "",
        stateCode: req.body.state || "",
        zipcode: req.body.zipcode || "", //<- for error checking
        userID: req.body.key || ""
    }

    //input validation
    const regexName = /^[a-zA-Z]+$/;
    const regexStreet = /\b\d{1,6} +.{2,25}\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|blvd|plaza|parkway|pl|place|pkwy)[.,]?(.{0,25} +\b\d{5}\b)?/ig;
    const regexCityGrid = /(\b( +)?\d{1,6} +(north|east|south|west|n|e|s|w)[,.]?){2}(.{0,25} +\b\d{5}\b)?\b/ig;
    const regexAptSuite = /((#|APT|BSMT|BLDG|DEPT|FL|FRNT|HNGR|KEY|LBBY|LOT|LOWR|OFC|PH|PIER|REAR|RM|SIDE|SLIP|SPC|STOP|STE|TRLR|UNIT|UPPR|\,)[\w]*)\n/gi;
    const regexZipcode = /^\d{5}(-\d{4})?$/;
    const regexCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    
    if (addressData.userID === "") {
        res.status(403).send("You must be logged in to post a quote");
    }
    else if (!regexName.test(addressData.firstName) || !regexName.test(addressData.lastName))
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
        //create user object in MySQL database
        db.query(`CALL profilePost(?, ?, ?, ?, ?, ?, ?, ?);`, [addressData.firstName, addressData.lastName, addressData.addressLine1, addressData.addressLine2, addressData.city, addressData.stateCode, addressData.zipcode, addressData.userID], 
        (err, rows) => {
            if (err) {  
                res.status(500).send(err);
            } else {
                res.status(200).send(rows[0]);
            }
        });

        //mockDB["authInfo"].profileCompleted = true;
    }
})

// router.put('/:id', (req, res) => {

// })

module.exports = router;