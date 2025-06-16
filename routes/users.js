const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const { validateId } = require("../middlewares/validation");

// start with /users
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", validateId, authMiddleware, updateUser);

module.exports = router;
