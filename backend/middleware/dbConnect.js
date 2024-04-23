const mongoose = require('mongoose');
require('dotenv').config();

const dbLink = process.env.DB_CONNECTION;

// Connect to MongoDB using createConnection
mongoose.connect(dbLink)
  .then(() => {
    console.log("Connected to Mongo.");
  })
  .catch(err => {
    console.error("Unable to connect to Mongo. ", err);
  });

// Export the Mongoose instance
module.exports = mongoose;







// const mongoose = require('mongoose');
// // const Flashcard = require('../models/flashcard.js');
// // const FlashcardSet = require('../models/flashcardSet.js');
// // const User = require('../models/user.js');
// require('dotenv').config();
// const dbLink = process.env.DB_CONNECTION;
// // Connect to MongoDB using createConnection
// // const dbConnection = ;

// // Get the Mongoose connection instance from the created connection
// // const db = dbConnection;

// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // db.once('open', () => {
// //   console.log('Connected to MongoDB!');
// // });

// // Export the Mongoose instance and database connection
// module.exports = async () => { 
//   await mongoose.createConnection(dbLink)
//   .then(x => {
//     console.log("Connected to to Mongo.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to Mongo. ", err);
//   });
//   return mongoose;
// };


