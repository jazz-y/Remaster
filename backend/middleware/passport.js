const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User, Flashcard, FlashcardSet } = require('../models/user.js');
// const mongoose = dbConnect.mongoose;
// const User = dbConnect.db.models.User;

const bcrypt = require('bcrypt');

const fields = {
    username: 'username',
    password: 'password'
};

const verifyCallback = (username, password, cb) => {
        console.log("in verify callback");
        User.findOne({ username: username }, 'username _id password')
        .then((userFound) => {
            if (!userFound) {
                console.log("User not found");
                return cb(null, false, { message: "User not found." });
            }
    
            if (!password) {
                return cb(null, false, { message: "Please provide a password." });
            }

            bcrypt.compare(password, userFound.password)
            .then((valid) => {
                console.log("this is the result of the bcrypt");
                console.log(valid);
                if (valid) {
                    console.log("returning success");
                    return cb(null, userFound, { message: "Login Successful!" });
                } else {
                    return cb(null, false, { message: "Incorrect password." });
                }
            })
            .catch(error => {
                console.error("There was an error: ", error);
                return cb(error);
            });

        });
}

const local = new LocalStrategy(fields, verifyCallback);

passport.use(local);

passport.serializeUser(async function(user, cb) {
    process.nextTick(function (){
        console.log("serializing user");
        return cb(null, user.username);
    })
    
});

passport.deserializeUser(async function (username, cb) {
    console.log("deserializing user"); 
    User.findOne(username, function(err, user) {
        cb(err, user);
    });
});
