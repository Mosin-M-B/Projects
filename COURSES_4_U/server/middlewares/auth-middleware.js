const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token not provided." });
    }

    // Assuming token is in the format "Bearer <jwtToken>", removing the "Bearer" prefix
    const jwtToken = token.replace("Bearer", "").trim();
    
    // Verifying the token
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    
    // Fetching user details while excluding the password
    const userData = await User.findOne({ email: decodedToken.email }).select({ password: 0 });

    // Storing token, user data, and user ID in the request object for further use
    req.token = token;
    req.user = userData;
    req.userID = userData._id;
    // Moving on to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
    next(error);
  }
};

module.exports = authMiddleware;

