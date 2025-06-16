const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-err");
const {
  validateAuthentication,
  validateUserBody,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

router.use(() => {
  throw new NotFoundError("Router not found");
});

module.exports = router;
