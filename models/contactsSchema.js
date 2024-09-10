const mongoose = require("mongoose");

const contact_schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Add contact name"]
    },
    email: {
        type: String,
        required: [true, "Add contact email"]
    },
    phone: {
        type: String,
        required: [true, "Add phone number"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contacts", contact_schema);