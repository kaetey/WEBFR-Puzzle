/** in memory db */
const passwordHash = require('password-hash');

var db = {
    users: [
        { username: "test@test.at", password: passwordHash.generate("12345678") },
    ],

    highscores: [
        { username: "test@test.at", score: 1600 },
    ],

}