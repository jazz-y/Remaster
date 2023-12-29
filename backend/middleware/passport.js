const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { mongoose, db, User, Flashcard, FlashcardSet } = require('../middleware/dbConnect');
// const mongoose = dbConnect.mongoose;
// const User = dbConnect.db.models.User;

const bcrypt = require('bcrypt');

const fields = {
    username: 'username',
    password: 'password'
};

const verifyCallback = (username, password, cb) => {

        User.findOne({ username: username }, 'username _id password')
        .then((userFound) => {
            if (!userFound) {
                console.log("User not found");
                return cb(null, false, { message: "User not found." });
            }
    
            if (!password) {
                return cb(null, false, { message: "Please provide a password." });
            }

            const valid = bcrypt.compare(password, userFound.password);
            console.log(valid);
            if (!valid) {
                return cb(null, false, { message: "Incorrect password." });
            }

            return cb(null, userFound, { message: "Login Successful!" });
        });
}

const strategy = new LocalStrategy(fields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, cb) => {
    console.log("in serializeUser:" + user);
    console.log(user._id);
    cb(null, user._id); // Assuming `user._id` is the unique identifier for the user
});

passport.deserializeUser(async (id, cb) => {
    try {
        console.log(req.session);
        console.log("in deserializeUser method");
        // console.log(req.session.store.get(id) + "getting the session");
        const userFound = await User.findById(id).exec();
        
        if (!userFound) {
            return cb(null, false, { message: "User not found." });
        }

        return cb(null, userFound._id);
    } catch (err) {
        console.error(err);
        return cb(err);
    }
});
