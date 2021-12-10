const express = require('express');
const session = require("express-session")
const flash = require("connect-flash");
const app = express();
const mongoose = require('mongoose');
const use  = require('passport');


const dbURI =  "mongodb://localhost:27017/RegistrationDb";
mongoose.connect(dbURI);
const connection = mongoose.connection
connection.on("error", (error)=> console.log(error));
connection.once("open",() => console.log(" Database connected successfully"))

const registrationSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2:{
        type: String,
        required: true

    },
    gender:{
        type: String,
        required: true
    }
});
const Users= mongoose.model("Userreg",registrationSchema);

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: "it's a registration form",
    saveUninitialized: true,
    resave: false
}))

app.use(flash());

app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg");
    next();
})




app.get("/", (req, res)=>{
    res.render("index");
});
app.get("/login", (req,res)=>{
    res.render("login");
})


app.post("/",(req,res) => {
    const fullName = req.body.fullName;
    const userName = req.body.userName;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const password2 = req.body.password2;
    const gender = req.body.gender;
     
    // const {fullName,userName,email,phone,password,password2,gender} = req.body;
    console.log(fullName,userName, email,phone,password,password2,gender);
    const newUser = new Users({
    //   fullName,
    //   userName,
    //   email,
    //   phone,
    //   password,
    //   password2,
    //   gender
    fullName: fullName,
      userName: userName,
      email: email,
      phone: phone,
      password: password,
      password2: password2,
      gender: gender

 });
     newUser.save();
     req.flash("success_msg","You data has just being submitted");
     res.redirect("/login");
     
})


app.listen(10, ()=>{console.log('Server is runing on port 10');
});