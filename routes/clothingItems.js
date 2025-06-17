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

router.post("/", authMiddleware, validateItemBody, createItem);
router.get("/", validateItemBody, getItems);
router.delete("/:itemId", authMiddleware, validateId, deleteItem);
router.put("/:itemId/likes", authMiddleware, validateId, likeItem);
router.delete("/:itemId/likes", authMiddleware, validateId, dislikeItem);

module.exports = router;
