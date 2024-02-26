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


// const jwt = require("jsonwebtoken");
// const User = require("../models/user-model");

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized. Token not provided." });
//     }

//     // Remove "Bearer" prefix from token
//     const jwtToken = token.replace("Bearer", "").trim();

//     // Verify the token
//     const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

//     // Fetch user details while excluding the password
//     const userData = await User.findOne({ email: decodedToken.email}).select("-password");
//     // console.log("Admin Middleware:",userData);
//     // If user not found, return Unauthorized
//     if (!userData) {
//       return res.status(401).json({ message: "Unauthorized. User not found." });
//     }

//     // Store token, user data, and user ID in the request object for further use
//     req.token = token;
//     req.user = userData;
//     req.userID = userData._id;
//     // Move on to the next middleware or route handler
//     next();
    
//     // console.log("Mosin Balsing...............////////////:",userData.isAdmin);
//   } catch (error) {
    
//     return res.status(401).json({ message: "Unauthorized. Invalid token." });
//   }
// };

// module.exports = authMiddleware;
