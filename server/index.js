const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const router = require("./routes");

// something
dotenv.config();
const app = express();
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