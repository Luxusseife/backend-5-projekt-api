// Inkluderar routes för besöksbetyg.
const express = require("express");
const router = express.Router();

// Importerar betygs-modellen.
const Score = require("../models/score");

// Hämtar alla besöksbetyg.
router.get("/", async (req, res) => {
    try {
        // Hämtar alla besöksbetyg.
        const scores = await Score.find();

        // Om inga betyg hittas...
        if (!scores || scores.length === 0) {
            return res.status(404).json({ error: "Inga besöksbetyg hittades." });
        // Om betyg hittas...
        } else {
            // Returnerar lyckat svar i konsollen.
            res.status(200).json({
                message: "Besöksbetygen har hämtats!",
                scores: scores
            });
        }
    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Skapar/lagrar ett nytt besöksbetyg.
router.post("/", async (req, res) => {
    try {
        const { score, name } = req.body;

        // Validerar inmatning av betyg och namn.
        if (!score || !name) {
            return res.status(400).json({ error: "Betyg och namn behöver anges." });
        }

        // Kontrollerar om betyget redan finns lagrat.
        const existingScore = await Score.findOne({ name });
        if (existingScore) {
            return res.status(400).json({ error: "Personen har redan betygsatt sin upplevelse." });
        } else {
            // Skapar en instans för besöksbetyg.
            const newScore = new Score({ score, name });
            await newScore.save();

            // Returnerar lyckat svar i konsollen.
            res.status(201).json({
                message: "Besöksbetyget lades till i databasen!",
                score: newScore
            });
        }
    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Raderar ett besöksbetyg.
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Kontrollerar om betyget finns och i så fall raderas det.
        const deletedScore = await Score.findByIdAndDelete(id);
        if (!deletedScore) {
            return res.status(404).json({ error: "Betyget hittades inte." });
        } else {
            // Returnerar lyckat svar i konsollen.
            res.status(200).json({
                message: "Betyget raderades!",
                score: deletedScore
            });
        }

    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Exporterar koden till server.js.
module.exports = router;