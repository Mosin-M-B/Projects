const mongoose = require('mongoose');
const URI =process.env.URI1;

const connectDB =async ()=>{
try {
    await mongoose.connect(URI);
    console.log("MongoDb connected...");
} catch (error) {
    console.error("database Connection faild.....")
    
}
};

module.exports = connectDB;