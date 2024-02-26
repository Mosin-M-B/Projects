const Services =require("../models/services-model")
const services = async(req,res)=>{
    try {
        const response =await Services.find();
        if (!response) {
            res.status(404).json({message:"No service found"})
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`services:${error}`);
        next(error);
    }
};

module.exports=services