/*
This file is responsible for routing through the application and responsible for making changes in database
*/ 

const express = require("express");
const error_handler = require("../middleware/errorHandler");
const contactsSchema = require("../models/contactsSchema");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.use(validateToken);
router.route("/").get(async (req, res) => {
    try {
        const user_id = req.user_id;
        const contact = await contactsSchema.find({ user_id : req.user.user_id });
        if (!contact) {
            res.status(404);
            throw new Error("No Contacts Available to show");
        }
        res.status(200).json({ message: "Found Data Successfully", data: contact });
    }
    catch(err) {
        error_handler(err, req, res);
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await contactsSchema.findById(id);

        if (!contact) {
            res.status(404);
            throw new Error("Contact Not Found");
        }

        res.status(200).json({ message: "Contact Found", data: contact });
    }
    catch (err) {
        error_handler(err, req, res);
    }
});

router.route("/").post(async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        console.log(req.user);
        const contact = await contactsSchema.create({
            user_id: req.user.user_id , name , email , phone
        });
        console.log(contact);
        res.status(201).json({ message: "Contact Created" , data : contact});
    }
    catch (err) {
        error_handler(err, req, res);
    }
});

router.route("/:id").put(async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await contactsSchema.findById(id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        if (contact.user_id.toString() != req.user.user_id) {
            res.status(403);
            throw new Error("Unauthorized Access");
        }
        const body = req.body;
        await contactsSchema.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({ message: "Contact details updated successfully" });

    }
    catch (err) {
        error_handler(err, req, res);
    }
});

router.route("/:id").delete(async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const contact = await contactsSchema.findById(id);
        
        if (!contact) {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        if (contact.user_id.toString() != req.user.user_id) {
            res.status(403);
            throw new Error("Unauthorized Access");
        }
        await contactsSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Contact deleted successfully", data: contact });

    }
    catch (err) {
        error_handler(err, req, res);
    }
});

module.exports = router;