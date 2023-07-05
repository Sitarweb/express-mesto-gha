const http2 = require('node:http2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND;
const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new Error('Not found');
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') res.status(BAD_REQUEST).send({ message: 'Невалидный id пользователя' });
      else if (err.message === 'Not found') res.status(NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new Error('Not found');
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      else if (err.message === 'Not found') res.status(NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new Error('Not found');
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      else if (err.message === 'Not found') res.status(NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send(token);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
