const express = require("express");
const app = express();
const session = require("express-session");
const config = require("config");

//Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("app.session_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//Form
app.use(express.urlencoded({extended:true}));

//View
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

//Static Folder
app.use("/static", express.static(config.get("app.static_folder")));

//Share
app.use(require("../apps/middlewares/share"));

//Cart 
app.use(require("../apps/middlewares/cart"));

//Router
app.use(require(config.get("app.router")));
module.exports = app;

