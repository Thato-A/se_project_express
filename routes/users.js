const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

// start with /users
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, validateUserUpdate, updateUser);

module.exports = router;
