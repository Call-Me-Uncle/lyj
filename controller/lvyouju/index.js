const curriculum = require('./curriculum/index');
const question = require('./question');
const dmo = require('./dmo');
const certificate = require('./certificate');
const cm = require('./curriculum.js');

module.exports = {
  ...curriculum,
  ...question,
  ...dmo,
  ...certificate,
  ...cm,
};
