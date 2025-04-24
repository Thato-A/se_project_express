const User = require("../models/user");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "user creation unsuccesful", err });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "user creation unsuccesful", err });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR)
          .send({ message: "Incorrect user Id", err });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Incorrect user Id", err });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Incorrect user Id", err });
    });
};

module.exports = { getUsers, createUser, getUser };
