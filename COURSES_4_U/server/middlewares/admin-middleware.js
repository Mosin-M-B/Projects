const User = require('../models/user-model')
const Admin = require("./auth-middleware")
const isAdminMiddleware = async (req, res, next) => {
    try {
      console.log(req.user);
      const adminRole = req.user.isAdmin;
      if (!adminRole) {
        res.status(403).json({message:"Access denied! User Is Not an Admin."})
      }
      // res.status(200).json({message:req.user.isAdmin})
      next()
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = isAdminMiddleware;


