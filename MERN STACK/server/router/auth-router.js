const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const {signupSchema,loginSchema} = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware")

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to thapa technical Mern Series Updated");
// });

router.route("/").get(authcontrollers.home);

// app.get("/register", (req, res) => {
//   res.status(200).json({ msg: "registration successful" });
// });
router.route("/register").post(validate(signupSchema),authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);
module.exports = router;