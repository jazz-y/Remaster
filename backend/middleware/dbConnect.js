const mongoose = require('mongoose');
// const Flashcard = require('../models/flashcard.js');
// const FlashcardSet = require('../models/flashcardSet.js');
// const User = require('../models/user.js');
console.log(process.env.DB_CONNECTION);
// Connect to MongoDB using createConnection
const dbConnection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the Mongoose connection instance from the created connection
const db = dbConnection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Export the Mongoose instance and database connection
module.exports = { mongoose, db};
  // , User, Flashcard, FlashcardSet };
