// Inkluderar Express, Cors, Mongoose och Dotenv.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

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
const adminRoutes = require('./routes/adminRoutes');
const icecreamRoutes = require('./routes/icecreamRoutes');

// Routes.
app.use("/api", adminRoutes);
app.use("/api", icecreamRoutes);

// Startar applikation.
app.listen(port, () => {
    console.log("Servern körs på port: " + port + ".");
});