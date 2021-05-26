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
    console.log(email);
    console.log(password);
    
    let credentials = db.login(email, password);
    console.log(credentials);
    
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


module.exports = app;