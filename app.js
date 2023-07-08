const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signup, signin } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, пожалуйста, повторите попытку позже',
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.post('/signin', signin, login);
app.post('/signup', signup, createUser);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('/', auth, (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
  await app.listen(PORT);
}

connect();
