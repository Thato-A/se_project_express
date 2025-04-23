const ClothingItem = require("../models/clothingItems");
const { DEFAULT_ERROR, INVALID_DATA_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Item creation unsuccesful", err });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Item creation unsuccesful", err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find().then((item) => {
    res
      .status(200)
      .send(item)
      .catch((err) => {
        console.error(err);
        res.status(DEFAULT_ERROR).send({ message: "Item not found", err });
      });
  });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => {
      res
        .status(200)
        .send({ data: item })
        .catch((err) => {
          console.error(err);
          res
            .status(DEFAULT_ERROR)
            .send({ message: "Update unsuccessful", err });
        });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res
        .status(204)
        .send({})
        .catch((err) => {
          console.error(err);
          res
            .status(DEFAULT_ERROR)
            .send({ message: "Item delete unsuccessful", err });
        });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((itemId) => {
      res
        .status(201)
        .send(itemId)
        .catch((err) => {
          console.error(err);
          res
            .status(DEFAULT_ERROR)
            .send({ message: "Item was not liked", err });
        });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() => {
      res
        .status(204)
        .send({})
        .catch((err) => {
          console.error(err);
          res
            .status(DEFAULT_ERROR)
            .send({ message: "dislike was unsuccessful", err });
        });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
