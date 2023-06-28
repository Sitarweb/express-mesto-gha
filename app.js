const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6499d362ebe21dfbef3a253b',
  };

  next();
});

app.use(bodyParser.json());
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
  await app.listen(PORT);
}

connect();
