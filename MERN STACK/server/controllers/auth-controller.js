const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};
//*---------------
//register Logic
//*---------------
const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({  email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(500).json({ message: "Internal server error register" });
    next(error);
   
  }
};
//*---------------
//login Logic
//*---------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ message: "Invalid User, please register" });
    }
    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password)
    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      }); 
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login error" });

  }
}
//*---------------------------
//get user data Logic
//*---------------------------
const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    return res.status(200).json({ userData });
    console.log(userData);
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register,login, user };
