/** in memory db */
const passwordHash = require('password-hash');
var randomToken = require('random-token');

var db = {
    
    users: [
        { username: "test@test.at", password: passwordHash.generate("12345678"), adress: "teststreet 1", city: "test", postcode: 1},
        { username: "linus@kernel.org", password: passwordHash.generate("abcdefg"), adress: "linus 2", city: "test", postcode: 2},
        { username: "steve@apple.com", password: passwordHash.generate("123456"), adress: "steve", city: "test", postcode: 3 },
        { username: "bill@microsoft.com", password: passwordHash.generate("987654"), adress: "bill", city: "micro", postcode: 4 }
    ],
    
    tokens: [],
    
    highscores: [ 
        { username: "test@test.at", score: 20 },
        { username: "linus@kernel.org", score: 1900 },
        { username: "bill@microsoft.com", score: 400 },
        { username: "a@a.org", score: 10 },
        { username: "b@b.org", score: 80 },
        { username: "c@c.org", score: 30 },
        { username: "d@d.org", score: 40 },
        { username: "e@e.org", score: 50 },
        { username: "f@f.org", score: 60 },
        { username: "g@g.org", score: 70 },
        { username: "h@h.org", score: 600 }
    ],

    signup: function(username, password, adress, city, postcode) {
        let user = this.users.find(u => u.username === username);
        if (user !== undefined) {
            return false;
        }

        this.users.push({ username: username, password: passwordHash.generate(password), adress: adress, city: city, postcode: postcode});
        //console.log(this.users);
        return true;
    },

    login: function(username, password) {
        let user = this.users.find(u => u.username === username);
        if (user != undefined && passwordHash.verify(password, user.password)) {        
            let credentials = {
                token: randomToken(64),
                username: user.username
            }
    
            this.tokens.push(credentials);
            return credentials;
        } 

        return null;    
    },

    deleteToken(authToken)  {
        this.tokens = this.tokens.filter(e => e.token != authToken);
    },

    isAuthenticated: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken) != undefined;
    },

    getAuthUser: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken);
    },

    getUser: function (userToken) {
        return this.users.find(u => u.username === userToken.username);
    },

    getHighscores: function() {
        return (this.highscores.sort(function(a,b) { return b.score - a.score })).slice(0, 10);
    },

    addHighscore: function(username, score) {
        index = this.highscores.findIndex(highscore => highscore.username === username && highscore.score < score);
        //console.log(index)
        if(index !== -1){console.log(this.highscores[index]);this.highscores[index].score = score; } 
        else this.highscores.push({ username: username, score: score });
    }
}

module.exports = db;