const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const authMiddleware = require("../middlewares/auth");
const { validateItemBody, validateId } = require("../middlewares/validation");

router.post("/", validateItemBody, authMiddleware, createItem);
router.get("/", validateItemBody, getItems);
router.delete("/:itemId", validateId, authMiddleware, deleteItem);
router.put("/:itemId/likes", validateId, authMiddleware, likeItem);
router.delete("/:itemId/likes", authMiddleware, dislikeItem);

module.exports = router;
