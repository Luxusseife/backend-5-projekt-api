// Inkluderar Express, Cors, Mongoose, Dotenv och jsonwebtoken.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Initialiserar Express.
const app = express();

// Väljer port.
const port = process.env.PORT || 3131;

// Middleware. Aktiverar Cors samt hantering och parsning av JSON-data.
app.use(cors());
app.use(express.json());

// Ansluter till MongoDB-databasen.
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE)
// Lyckad anslutning.
.then(() => { 
    console.log("Ansluten till databasen!");
})
// Fel vid anslutning.
.catch((error) => {
    console.error("Fel vid anslutning till databasen...");
});

// Importerar routes.
const adminRoutes = require("./routes/adminRoutes");
const icecreamRoutes = require("./routes/icecreamRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

// Routes.
app.use("/admin", adminRoutes);
app.use("/icecreams", icecreamRoutes);
app.use("/scores", scoreRoutes);

// Route för skyddad resurs.
app.get("/admin/protected", authenticateToken, (req, res) => {
    res.json({ message: "Åtkomst till admingränssnitt!" });
});

// Validerar token för åtkomst till skyddat admingränssnitt.
function authenticateToken(req, res, next) {
    // Hämtar authorization-header.
    const authHeader = req.headers["authorization"];
    // Om headern finns, extraheras token från den.
    const token = authHeader && authHeader.split(" ")[1];

    // Kontrollerar om en giltig token finns.
    if(token == null) return res.status(401).json({ message: "Ingen behörighet för skyddat admingränssnitt - token saknas" });

    // Kontrollerar JWT.
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
        if(err) return res.status(403).json({ message: "Ogiltig JWT" });

        req.admin = admin;
        next();
    });
}

// Startar applikation.
app.listen(port, () => {
    console.log("Servern körs på port: " + port + ".");
});