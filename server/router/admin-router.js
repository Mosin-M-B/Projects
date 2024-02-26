const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const isAdminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, isAdminMiddleware, admincontroller.getAllUsers);
router
  .route("/users/:id")
  .get(authMiddleware, isAdminMiddleware, admincontroller.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, isAdminMiddleware, admincontroller.updateUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, isAdminMiddleware, admincontroller.deleteUser);
router
  .route("/contacts")
  .get(authMiddleware, isAdminMiddleware, admincontroller.getAllContacts);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, isAdminMiddleware, admincontroller.deleteContact);
router
  .route("/services")
  .get(authMiddleware, isAdminMiddleware, admincontroller.getAllServices);

module.exports = router;
