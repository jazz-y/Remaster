const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSetSchema = new mongoose.Schema({
    setName: { type: String, },
    questions: [
        {
            questionText: { type: String, require: true },
            options: [
                {
                    answerText: { type: String, require: true },
                    isCorrect: { type: Boolean, default: true, },
                },
            ],
        },
    ],
});

const quizSet = mongoose.model('quizSet', quizSetSchema);

module.exports = quizSet;