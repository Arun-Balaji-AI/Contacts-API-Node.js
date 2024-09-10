const mongoose = require("mongoose");

const connectDataBase = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to database sucessfully", connect.connection.host, connect.connection.name);
    }
    catch (err) {
        console.log("Error Occured while connecting to database");
        console.log(err.message);
        process.exit(1);
    }
}


module.exports = connectDataBase;