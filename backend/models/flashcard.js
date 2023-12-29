const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    term:{
        type: String,
        required: true,
    },
    def:{
        type: String,
        required: true,
    },
  });
  
  const Flashcard = mongoose.model('Flashcard', flashcardSchema);
  
  module.exports = Flashcard;