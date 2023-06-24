const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        
        const isConnected = await mongoose.connect(`${process.env.DB_URI}`);

        if(isConnected) {
            console.log("successfully connected to database");
        }

    } catch (error) {
        console.log("something went wrong while connecting to database");
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;