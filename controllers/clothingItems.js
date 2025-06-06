const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");
const ClothingItem = require("../models/clothingItems");
const statusCodes = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return next(new BadRequestError("Input is incorrect"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find()
    .then((items) => {
      res.status(statusCodes.OK).send(items);
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(new ForbiddenError("You cannot delete this item"));
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(statusCodes.OK).send({ message: "Successfully deleted" })
        );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Input is incorrect"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Input was not found"));
      }
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((itemId) => {
      res.status(statusCodes.CREATED).send(itemId);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Input is incorrect"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Input was not found"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(statusCodes.OK).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Input is incorrect"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Input was not found"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
