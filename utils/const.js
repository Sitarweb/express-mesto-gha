const http2 = require('node:http2');

const CREATED = http2.constants.HTTP_STATUS_CREATED;
const regular = /https?:\/\/(www\.)?[\w\d-]+\.[\w\d-.~:/?#[\]@!$&'()*+,;=]+#?/;

module.exports = { CREATED, regular };
