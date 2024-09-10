/*
This file is responsible for routing through the application and responsible for making changes in database
*/ 

const express = require("express");
const error_handler = require("../errorHandler");
const contactsSchema = require("../models/contactsSchema");
const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const contact = await contactsSchema.find();
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
        const contact = await contactsSchema.create({
            name , email , phone
        });
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
        console.log("Contact found");
        await contactsSchema.findByIdAndDelete(id);
        console.log("Contact Deleted");
        res.status(200).json({ message: "Contact deleted successfully", data: contact });

    }
    catch (err) {
        error_handler(err, req, res);
    }
});

module.exports = router;