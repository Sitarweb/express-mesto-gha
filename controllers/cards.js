const http2 = require('node:http2');
const Card = require('../models/card');

const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND;
const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const OK = http2.constants.HTTP_STATUS_OK;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(BAD_REQUEST).send({ message: 'Переданы невалидные данные' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') res.status(BAD_REQUEST).send({ message: 'Невалидный id карточки' });
      if (err.message === 'Card not found') res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') res.status(BAD_REQUEST).send({ message: 'Невалидный id карточки' });
      if (err.message === 'Card not found') res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') res.status(BAD_REQUEST).send({ message: 'Невалидный id карточки' });
      if (err.message === 'Card not found') res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};
