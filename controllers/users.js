const http2 = require('node:http2');
const User = require('../models/user');

const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND;
const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const OK = http2.constants.HTTP_STATUS_OK;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new Error('Пользователь c указанным id не найден');
      else res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') res.status(BAD_REQUEST).send({ message: 'Невалидный id пользователя' });
      if (err.message === 'Not found') res.status(NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      if (err.message === 'Not found') res.status(NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      if (err.message === 'Not found') res.status(NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};
