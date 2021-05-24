var express = require('express');

var app = express();

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
    const {email, password} = JSON.stringify(req.body);
    console.log(email, password);
    
    

    res.status(200).json({
        message: "Hello Login from app.js"
    });
});

module.exports = app;