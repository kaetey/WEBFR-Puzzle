var express = require('express');

var app = express();
const db = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //* ... alle (jede domain, jede app darf auf unsere api zugreifen)
    res.setHeader("Access-Control-Allow-Credentials", "true"); //alle cookies usw. dürfen mitgeschickt werden
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS, PUT, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    //console.log(email);
    //console.log(password);
    
    let credentials = db.login(email, password);
    //console.log(credentials);
    
    if(credentials != undefined){
        res.status(200).json({
            message: "Welcome back "+email,
            token: credentials.token
        });
    }
    else{
        res.status(404).json({
            error: "User or password is wrong!"
        });
    }
});

app.post("/authentication", (req, res) => {
    const {authorization} = req.headers;
    const checkAuth = db.isAuthenticated(authorization);
    console.log(checkAuth);

    if(checkAuth == true){
        res.status(200).json({
            message: "User autorized",
        });
    }
    else{
        res.status(401).json({
            message: "User not autorized",
        });
    }
});

app.post("/signup", (req, res) =>{
    const {email, password, adress, city, postcode} = req.body;
    let check = db.signup(email, password, adress, city, postcode);
    if(check == true){
        let user = db.login(email, password);
        res.status(200).json({
            message: "User successfully registered!",
            user
        });
    }else{
        res.status(400).json({
            error: "User already exists!",
        });
    }
});

app.post("/profile", (req, res) => {

    const {authorization} = req.headers;
    let userToken = db.getAuthUser(authorization);
    let user = db.getUser(userToken);
    console.log(user);

    res.status(200).json(user);
});

app.get("/highscore", (req, res) => {
    let list = db.getHighscores();
    //console.log(list);

    res.status(200).json(list);
});

app.post("/highscore", (req, res) => {
    const {highscore} = req.body;
    const {authorization} = req.headers;
    let user = db.getAuthUser(authorization);
    if (user != undefined){
        db.addHighscore(user.username, highscore);
        res.status(200).json({
            message: "Highscore was successfully saved!",
        });
    }else{
        res.status(401).json({
            message: "No user is logged in!",
        });
    }
});

app.post("/logout", (req, res) => {
    const {authorization} = req.headers;
    const checkAuth = db.isAuthenticated(authorization);

    if(checkAuth == true){
        db.deleteToken(authorization);

        res.status(200).json({
            message: "User successfully logged out!",
        });
    }
    else{
        res.status(404).json({
            message: "User couldn't log out!",
        });
    }
});

module.exports = app;