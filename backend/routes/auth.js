var express = require('express');
var authRouter = express.Router();
var session = require('express-session');
require('../middleware/passport.js');
var passport = require('passport');
var bcrypt = require('bcrypt');
var { mongoose} = require('../middleware/dbConnect.js');
var {User, Flashcard, FlashcardSet } = require('../models/user.js');
// verifying login
// done is the callback, formatted as cb(err, user, info)
console.log("in auth.js");

// Routing ///////////////////////////////////////////////////////////////////////////////////////////
authRouter.post('/login', 
  passport.authenticate("local", {session: true}), 
  function (req, res) {
    try {
      var verify = req.isAuthenticated();
      // var verify = true;
      
      if (req.user){
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({ message: "User authenticated!", username: req.user.username, isAuthenticated: true });
      } else {
        return res.status(401).json({ message: "Authentication failed" , isAuthenticated: false });
      }

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// later implement passport authentification
// client sending in name (string), cards (array of cards)
authRouter.post('/createSet', async (req, res) => {
  console.log("in /createSet");
  try {
    const verify = true; // for now
    if (!verify) {
      return res.status(401).json({ message: "Authentication failed", isAuthenticated: false });
    }

    let insertCards = [];

    for (let i = 0; i < req.body.cards.length; i++) {
      const card = new Flashcard({
        term: req.body.cards[i].term,
        def: req.body.cards[i].def
      });

      await card.save(); // Save each individual card
      insertCards.push(card);
    }
    var insertSet = await new FlashcardSet({
      setName: req.body.name,
      cards: insertCards
    });
    insertSet.save();

    let updatedUser = await User.findOne(
      { username: 'student' }).populate('flashcardSets');
    updatedUser = await User.findOne({ username: 'student' });
    //console.log(updatedUser);
    updatedUser.flashcardSets.push(insertSet);
    updatedUser.save();

    console.log("updated user is: " + updatedUser);

    res.json({ message: "Insertion Done!", isAuthenticated: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error in /create" });
  }
});

authRouter.post('/deleteSet', async (req, res) => {
  try {

    const verify = true; // for now
    if (!verify) { res.status(501).json({ message: "Auth failed", isAuthenticated: false }); }
    let deleting = await FlashcardSet.findById(req.body.id); // in the future: should be req.body.id
    console.log(deleting);
    await FlashcardSet.deleteOne({ _id: process.env.DELETE_SET });

    res.json({ message: "Deleted set", isAuthenticated: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error in deleting" });
  }
});

authRouter.post('/editSet', async (req, res) => {
  try {
    console.log(req.user);
    const verify = true; // for now

    if (!verify) { 
      return res.status(401).json({ message: "Auth failed", isAuthenticated: false });
    }

    const editSet = await FlashcardSet.findById(process.env.OTHER_FLASHCARD_SET);

    if (!editSet) {
      return res.status(404).json({ message: "Set not found", isAuthenticated: false });
    }

    // Create an array to store new cards
    const newCards = [];

    // Iterate over the cards in the request body and create new Flashcard instances
    for (let i = 0; i < req.body.cards.length; i++) {
      const card = new Flashcard({
        def: req.body.cards[i].def,
        term: req.body.cards[i].term
      });

      newCards.push(card);
    }

    // Create a new FlashcardSet with the updated information
    const newSet = new FlashcardSet({
      setName: req.body.name,
      cards: newCards
    });

    // Save each card individually
    for (let i = 0; i < newCards.length; i++) {
      await newCards[i].save();
    }
    console.log(req.body.name + req.body.cards + "passed in stuff for edit");
    // Replace the existing set with the new set in the database
    const updatedSet = await FlashcardSet.findOneAndUpdate(
      { _id: editSet._id },
      { $set: { setName: newSet.setName, cards: newCards } },
      { new: true }
    );
    res.json({ message: "Set updated successfully", isAuthenticated: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error in editing set" });
  }
});



authRouter.get('/index', async (req, res) => {
  try {
    var verify = true;
    // var verify = req.isAuthenticated();
    console.log(verify);
    console.log("in /index get");

    if (!verify) {
      console.log("in /index");
      return res.status(401).json({ message: "Authentication failed", isAuthenticated: false });
    }


    var curUser = await User.findOne({ username: 'student' });

    console.log(curUser);
    // if (!curUser) {
    //   return res.status(401).json({ message: "User not found", isAuthenticated: false });
    // }
    if (curUser.flashcardSets == null || curUser.flashcardSets.length == 0) {
       res.json({username: curUser.username, flashcardSets: null, isAuthenticated: true}); 
      } else {
        const flashcardSets = await curUser.getFlashcardSets();
        console.log(flashcardSets);
        console.log("above are the flashcard sets");
    
        res.json({ username: curUser.username, flashcardSets: flashcardSets, isAuthenticated: true });
      }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", isAuthenticated: false });
  }
});

// gets a set
authRouter.get('/set', async (req, res, cb) => {
  // passport.authenticate('local', (err, user, info) => {
  try {
    const verify = true; // for now
    const returnSet = await FlashcardSet.findById(process.env.FLASHCARD_SET_ID).exec(); 
    returnCards = [];
    for (let i = 0; i < returnSet.cards.length; i++) {
      const card = await Flashcard.findById(returnSet.cards[i]);
      returnCards.push(card);
    }
    console.log(returnCards);
    if (!verify) { res.status(401).json({ message: "Authentification failed: ", isAuthenticated: false }); }
    res.json({ message: "set retrieved", set: returnCards });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error in /set", isAuthenticated: false });
  }
});

authRouter.post('/logout', function (req, res, cb) {
  req.logout(function (err) {
    if (err) { return cb(err); }
    res.redirect('/');
  });
});

authRouter.post('/signup', async function (req, res) {
  try {
    console.log("in auth.js signup promise");
    //console.log(User);
    const existingUser = await User.findOne({ username: req.body.username }).exec();

    if (existingUser) {
      return res.json({ message: "Username is taken." });
    }

    if (!req.body.username) {
      return res.json({ message: "Please enter a username" });
    }

    if (!req.body.email) {
      return res.json({ message: "Please enter an email." });
    }

    if (!req.body.password) {
      return res.json({ message: "Please enter a password." });
    }
    // + turns string into 
    const saltRounds = +process.env.SALT_ROUNDS;

    const hash = await bcrypt.hash(req.body.password, saltRounds);

    // make a new user object
    const userInsert = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: hash,
      flashcardSets: [],
    });
    // save new user to db
    await userInsert.save();
    // 
    var newUser = {username: req.body.username };
    req.login(newUser, function(err) {
      if (err){
        return res.status(500).json({message: "There was an error logging you in to your new account."});
      }
    });

    console.log("User created successfully:", userInsert);
    res.json({ message: "User created successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during signup." });
  }
});

module.exports = authRouter;