// Inkluderar Mongoose.
const mongoose = require('mongoose');

// Sätter struktur för olika glass-sorter med ett schema.
const icecreamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// Inkluderar schemat i databasen.
const Icecream = mongoose.model('Icecream', icecreamSchema);
// Exporterar koden till icecreamRoutes.js.
module.exports = Icecream;