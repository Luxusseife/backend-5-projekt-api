// Inkluderar Mongoose.
const mongoose = require('mongoose');

// Sätter struktur för betygen med ett schema.
const scoreSchema = new mongoose.Schema({
    // Betyg kan minst vara 1 och högst vara 5.
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
    },
    // Standard är dagens datum och anges ej i begäran.
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    // Namn är unikt och undviker lagring av duplicerade betyg.
    name: {
        type: String,
        required: true,
        unique: true
    },
});

// Inkluderar schemat i databasen.
const Score = mongoose.model('Score', scoreSchema);
// Exporterar koden till reviewRoutes.js.
module.exports = Score;