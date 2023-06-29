const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, пожалуйста, повторите попытку позже',
});

app.use((req, res, next) => {
  req.user = {
    _id: '6499d362ebe21dfbef3a253b',
  };

  next();
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
  await app.listen(PORT);
}

connect();
