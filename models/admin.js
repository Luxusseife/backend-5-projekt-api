// Inkluderar Mongoose och Bcrypt.
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Sätter struktur för adminuppgifter med ett schema.
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

// Hashar lösenord.
adminSchema.pre("save", async function (next) {
    try {
        // Krypterar lösenordet om det är en ny instans eller om lösenordet ändrats.
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            // Ersätter det okrypterade lösenordet med det hashade lösenordet.
            this.password = hashedPassword;
        }
        
        // Asynkron funktion är klar, går vidare till nästa middleware.
        next();
    // Felmeddelande.
    } catch (error) {
        next(error);
    }
});

// Registrerar en admin.
adminSchema.statics.register = async function (username, password) {
    try {
        // Skapar en ny admin-instans med valt användarnamn och lösenord.
        const admin = new this({ username, password });
        // Sparar instansen i databasen med hashat lösenord.
        await admin.save();
        return admin;
    // Felmeddelande.
    } catch (error) {
        throw error;
    }
};

// Jämför hashade lösenord vid inloggning.
adminSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    // Felmeddelande.
    } catch (error) {
        throw error;
    }
};

// Loggar in en admin-personal.
adminSchema.statics.login = async function (username, password) {
    try {
        const admin = await this.findOne({ username });

        // Kontrollerar admin-användarnamn.
        if (!admin) {
            throw new Error("Felaktigt användarnamn eller lösenord");
        }

        // Kontrollerar om lösenord matchar.
        const isPasswordMatch = await admin.comparePassword(password);
        if (!isPasswordMatch) {
            throw new Error("Felaktigt användarnamn eller lösenord");
        }

        // Om både användarnamn och lösenord korrekt...
        return admin;

    // Felmeddelande.
    } catch (error) {
        throw error;
    }
}

// Inkluderar schemat i databasen.
const Admin = mongoose.model("Admin", adminSchema);
// Exporterar koden till adminRoutes.js.
module.exports = Admin;