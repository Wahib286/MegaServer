const mongoose = require("mongoose");

require('dotenv').config();

exports.dbconnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB connected successfully")})
    .catch((err)=>{
        console.log("failed Db connection");
        console.error(err);
        process.exit(1);
    });
}