const mongoose = require('mongoose');
const URI =process.env.URI1;

const connectDB =async ()=>{
try {
    await mongoose.connect(URI);
    console.log("MongoDb connected...");
} catch (error) {
    console.error("database Connection faild.....")
    process.exit(0);
}
};

module.exports = connectDB;