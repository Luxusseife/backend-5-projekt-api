// Inkluderar Mongoose.
const mongoose = require('mongoose');

// Sätter struktur för olika glass-sorter.
const icecreamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

// Inkluderar schemat i databasen.
const Icecream = mongoose.model('Icecream', icecreamSchema);
// Exporterar koden till icecreamRoutes.js.
module.exports = Icecream;