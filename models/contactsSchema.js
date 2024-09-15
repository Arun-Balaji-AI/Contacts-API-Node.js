const mongoose = require("mongoose");

const contact_schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    },
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