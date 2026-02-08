const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        console.log("Tip: Verify your IP is whitelisted in MongoDB Atlas Network Access settings");
    }
};

module.exports = connectDB;
