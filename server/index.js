var passport = require("passport");
require('./passport');

const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser')
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const router = require("./routes");
const morgan = require("morgan");
var cors = require("cors");

dotenv.config();
const app = express();

//Other configurations:
//Universal CORS
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 8080;
const baseDir = path.dirname(process.cwd());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'some secret',
  resave: false, 
  saveUninitialized: true,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 //1 day
  }
}));

app.use(morgan(':method :url :status'));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.use(express.static(path.join(baseDir, 'build'), {
    extensions: ['html', 'htm']
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(path.join(baseDir, 'client', 'build'))
});
