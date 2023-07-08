const { celebrate, Joi } = require('celebrate');

module.exports.signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/),
  }),
});

module.exports.deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports.putLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports.deleteLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});
