// Inkluderar routes för glass.
const express = require("express");
const router = express.Router();

// Importerar glass-modellen.
const Icecream = require("../models/icecream");

// Skapar/lagrar en ny glass.
router.post("/icecreams", async (req, res) => {
    try {
        const { name, category, description } = req.body;

        // Validerar inmatning av namn, kategori och beskrivning.
        if (!name || !category || !description) {
            return res.status(400).json({ error: "Namn, kategori och beskrivning behöver anges." });
        }

        // Kontrollerar om glassen redan finns lagrad.
        const existingIcecream = await Icecream.findOne({ name });
        if (existingIcecream) {
            return res.status(400).json({ error: "Denna glass är redan lagrad i databasen." });
        } else {
            // Skapar en ny glass-instans.
            const newIcecream = new Icecream({ name, category, description });
            await newIcecream.save();

            // Returnerar lyckat svar i konsollen.
            res.status(201).json({
                message: "Glassen lades till i databasen!",
                icecream: newIcecream
            });
        }
    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Raderar en glass.
router.delete("/icecreams/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Kontrollerar om glassen finns och i så fall raderas den.
        const deletedIcecream = await Icecream.findByIdAndDelete(id);
        if (!deletedIcecream) {
            return res.status(404).json({ error: "Glassen hittades inte." });
        } else {
            // Returnerar lyckat svar i konsollen.
            res.status(200).json({
                message: "Glassen raderades!",
                icecream: deletedIcecream.name
            });
        }

    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Exporterar koden till server.js.
module.exports = router;