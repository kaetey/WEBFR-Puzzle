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
            message: "Willkommen zurück "+email,
            token: credentials.token
        });
    }
    else{
        res.status(404).json({
            error: "Der Username oder das Passwort ist falsch!"
        });
    }
});

app.post("/authentication", (req, res) => {
    const {authorization} = req.headers;
    const checkAuth = db.isAuthenticated(authorization);
    console.log(checkAuth);

    if(checkAuth == true){
        res.status(200).json({
            message: "User autorisiert",
        });
    }
    else{
        res.status(401).json({
            message: "User nicht autorisiert",
        });
    }
});

app.post("/signup", (req, res) =>{
    
    let token = db.signup(req.body.email, req.body.password);
    console.log(token);
    if(token != ""){
        res.status(200).json({
            message: "User successfully registered!",
            token: token
        });
    }else{
        res.status(400).json({});
    }
});

app.get("/highscore", (req, res) => {
    let list = db.getHighscores();
    //console.log(list);

    res.status(200).json(list);
});

app.post("/highscore", (req, res) => {
    const {highscore} = req.body;
    const {authorization} = req.headers;
    let user = db.getAuthUser(authorization).username;

    
    /*const {authorization} = req.headers;
    const checkAuth = db.isAuthenticated(authorization);

    if(checkAuth == true){
        let cred = db.getAuthUser(authorization);
        db.addHighscore(cred.username, highscore);
        //console.log(highscore);
        res.status(200).json({
            message: "Highscore wurde erfolgreich gespeichert",
        });
    }
    else{
        res.status(401).json({
            message: "Kein User eingeloggt",
        });
    }*/
});

module.exports = app;