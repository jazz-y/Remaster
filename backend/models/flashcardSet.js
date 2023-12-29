const mongoose = require('mongoose');
const Flashcard = require('./flashcard.js'); // Import your Flashcard model

const flashcardSetSchema = new mongoose.Schema({
  setName: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flashcard',
    },
  ],
});

// Populate the cards array when retrieving a flashcardSet
flashcardSetSchema.pre('findOne', function (next) {
  this.populate('cards');
  next();
});

const FlashcardSet = mongoose.model('FlashcardSet', flashcardSetSchema);

module.exports = FlashcardSet;
