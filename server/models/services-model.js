const {Schema , model ,Mongoose } = require("mongoose")

const serviceSchema = new Schema({
    service: {type : String, required : true},  //service name
    description :{ type :String , required : true},   //description of the service
    price:{type : String, required : true},
    provider:{type:String,required : true}          //price for one hour.

});
const  Service= new  model('Service',serviceSchema)
module.exports=Service;
// http://localhost:5173/service