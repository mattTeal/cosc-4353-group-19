const express = require("express");
const router = express.Router();
const {db} = require('../database');
const findUser = require('../valUsrPss').findUser;
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    //res.status(200).send(mockDB.quoteHistory);
    // get data from database
    if (!req.session.userID) {
        // query for userID from sessions table in MySQL
        if (req.sessionID) {
            db.query(
                `SELECT data FROM SESSIONS WHERE session_id = "?";`,
                req.sessionID,
                (err, rows) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        if (rows.length > 0) {
                            req.session.userID = rows[0].data.userID;
                        } else {
                            res.status(401).send(/*"Session not found/stored"*/ req.sessionID);
                        }
                    }
                }     
            )
        }
        else {
            res.status(403).send("You must be logged in to post a quote");
        }
    } else {
        db.query(
            `SELECT * FROM QUOTES WHERE UserID = "?";`,
            req.session.userID,
            (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(rows);
            }
        });    
    }
})

router.post('/', (req, res) => {
    // post to MySQL database with userID
    if (!req.session.userID) {
        // query for userID from sessions table in MySQL
        if (req.sessionID) {
            db.query(
                `SELECT data FROM SESSIONS WHERE session_id = "?";`,
                req.sessionID,
                (err, rows) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        if (rows.length > 0) {
                            req.session.userID = rows[0].data.userID;
                        } else {
                            res.status(401).send(/*"Session not found/stored"*/ req.sessionID);
                        }
                    }
                }     
            )
        }
        else {
            res.status(403).send("You must be logged in to post a quote");
        }
    }
    else {
        // form parameters
        const {gallons, date, addressData, inState} = req.body;

        //validate address data
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
            //console.log(gallons, date);
            //create Object to insert into database

            var addressString = addressData.addressLine1 + " " + addressData.addressLine2 + " " + addressData.city + ", " + addressData.stateCode + " " + addressData.zipcode;

            try {
                db.promise().query(`CALL quotePost(?, ?, ?, ?, ?)`, [gallons, date, addressString, inState, req.session.userID]);
                res.status(201).send({message: "Post completed with status code 201."});    
            } catch (error) {
                console.log(error)
            }
        }
    }
});

module.exports = router;