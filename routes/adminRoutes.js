// Inkluderar routes för admin.
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importerar admin-modellen.
const Admin = require("../models/admin");

// Skapar/registrerar en ny admin.
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validerar inmatning av användarnamn och lösenord.
        if (!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

        // Kontrollerar om admin-kontot redan finns.
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: "Denna admin är redan registrerad." });
        }

        // Skapar en ny admin-instans.
        const admin = new Admin({ username, password });
        await admin.save();

        // Returnerar lyckat svar i konsollen.
        res.status(201).json({ 
            message: "Adminkontot är registrerat!",
            newAdmin: username 
        });

    // Felmeddelande vid serverfel inkl. detaljer.
} catch (error) {
    res.status(500).json({ error: "Serverfel...", details: error.message });
}
});

// Loggar in admin-personal.
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validerar inmatning av användarnamn och lösenord.
        if (!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

        // Kontrollerar om admin-kontot redan finns.
        const admin = await Admin.findOne({ username });
        if(!admin) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        }

        // Kontrollerar lösenord.
        const isPasswordMatch = await admin.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        } else {
            // Skapar JWT-nyckel.
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            // Skapar svarsinfo.
            const response = {
                message: "Lyckad inloggning",
                admin: username,
                token: token
            }
            // Skickar svar och token till klienten.
            res.status(200).json({ response, token });
        }

    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel...", details: error.message });
    }
});

// Exporterar koden till server.js.
module.exports = router;