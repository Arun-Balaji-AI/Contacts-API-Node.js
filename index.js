/*
This is the server file that manages all the resources used in this application
*/


const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const contactRouter = require("./routes/contactRoutes");
const connectDB = require("./config/databaseConnector");
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/api/contacts", contactRouter);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});