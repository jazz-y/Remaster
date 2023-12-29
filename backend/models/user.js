const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  def: {
    type: String,
    required: true,
  },
});

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


const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  flashcardSets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FlashcardSet',
    },
  ],
});

userSchema.methods.getFlashcardSets = async function () {
  console.log("hi");
  try {
    // Assuming you want to populate the 'flashcardSets' array
    await this.populate('flashcardSets');

    if (!this.flashcardSets || !Array.isArray(this.flashcardSets)) {
      throw new Error('FlashcardSets not populated correctly');
    }

    console.log(this.flashcardSets);

    return this.flashcardSets;
  } catch (error) {
    console.error('Error fetching flashcard sets:', error);
    throw error;
  }
};


const Flashcard = mongoose.model('Flashcard', flashcardSchema);

const FlashcardSet = mongoose.model('FlashcardSet', flashcardSetSchema);
const User = mongoose.model('User', userSchema);
console.log(User);

module.exports = { mongoose, User, Flashcard, FlashcardSet };

// gets flashcard names and ids
userSchema.static('getFlashcardSets', async function () {
  userSchema.method('getFlashcardSets', async function getFlashcardSets() {
    console.log("hi");
    try {
      const user = await this.findOne({ user: 'bob' }, 'flashcardSets').populate('_id setNames');

      if (!user.flashcardSets || !Array.isArray(user.flashcardSets)) {
        throw new Error('FlashcardSets not populated correctly');
      }
      console.log(user.flashcardSets);

      return user.flashcardSets;
    } catch (error) {
      console.error('Error fetching flashcard sets:', error);
      throw error;
    }
  });
}
);
