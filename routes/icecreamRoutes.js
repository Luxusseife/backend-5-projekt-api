// Inkluderar routes för glass.
const express = require("express");
const router = express.Router();

// Importerar glass-modellen.
const Icecream = require("../models/icecream");

// Hämtar hela menyn med glassar.
router.get("/", async (req, res) => {
    try {
        // Hämtar alla glassar.
        const icecreams = await Icecream.find();

        // Om inga glassar hittas...
        if (!icecreams || icecreams.length === 0) {
            return res.status(404).json({ error: "Inga glassar hittades." });
            // Om glassar hittas...
        } else {
            // Returnerar lyckat svar i konsollen.
            res.status(200).json({
                message: "Menyn har hämtats!",
                menu: icecreams
            });
        }
    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Hämtar en specifik glass baserat på ID.
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Hämtar en specifik glass med unikt ID.
        const icecream = await Icecream.findById(id);

        // Om glassen inte hittas...
        if (!icecream) {
            return res.status(404).json({ error: "Glassen hittades inte." });
        // Om glassen hittas...
        } else {
            // Returnerar lyckat svar i konsollen.
            res.status(200).json({
                message: "Glassen har hämtats!",
                icecream: icecream
            });
        }

    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Skapar/lagrar en ny glass.
router.post("/", async (req, res) => {
    try {
        const { name, category, description, price } = req.body;

        // Validerar inmatning av namn, kategori, beskrivning och pris.
        if (!name || !category || !description || !price) {
            return res.status(400).json({ error: "Namn, kategori, beskrivning och pris behöver anges." });
        }

        // Kontrollerar om glassen redan finns lagrad.
        const existingIcecream = await Icecream.findOne({ name });
        if (existingIcecream) {
            return res.status(400).json({ error: "Denna glass är redan lagrad i databasen." });
        } else {
            // Skapar en ny glass-instans.
            const newIcecream = new Icecream({ name, category, description, price });
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

// Uppdaterar en glass.
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, price } = req.body;

        // Validerar inmatning av namn, kategori och beskrivning.
        if (!name || !category || !description || !price) {
            return res.status(400).json({ error: "Namn, kategori, beskrivning och pris behöver anges." });
        }

        // Kontrollerar om glassen finns och i så fall uppdateras den.
        const updatedIcecream = await Icecream.findByIdAndUpdate(id, { name, category, description, price }, { new: true });
        if (!updatedIcecream) {
            return res.status(404).json({ error: "Glassen hittades inte." });
        } else {
            // Returnerar uppdaterad glass.
            res.status(200).json({
                message: "Glassen har uppdaterats!",
                icecream: updatedIcecream
            });
        }
    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Raderar en glass.
router.delete("/:id", async (req, res) => {
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