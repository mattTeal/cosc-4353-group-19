
const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser')
const dotenv = require("dotenv");
const path = require("path");
const router = require("./routes");

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
const baseDir = process.cwd();
app.use(express.urlencoded( {extended: true} ));

app.use(express.json());
app.use("/api", router) 

app.get("/", (req, res) => {
    res.send("hello root")
});
// app.use(express.static(path.join(baseDir, 'build'), {
//     extensions: ['html', 'htm']
// }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(path.join(baseDir, 'build'))
});