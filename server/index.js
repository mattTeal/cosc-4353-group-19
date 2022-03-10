import passport from "passport";

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const router = require("./routes");

//import authRouter from './routes/authRoutes.js'


dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const baseDir = path.dirname(process.cwd());

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

app.use(passport.initialize());
app.use(passport.session)

app.use(express.static(path.join(baseDir, 'build'), {
    extensions: ['html', 'htm']
}));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(path.join(baseDir, 'client', 'build'))
});


export default app;