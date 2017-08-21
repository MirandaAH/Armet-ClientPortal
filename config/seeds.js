let db = require('../models/');

module.exports = function() {

  db.Arch.create({
    email: 'testArch1@gmail.com',
    password: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

  db.Arch.create({
    email: 'testArch2@gmail.com',
    password: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

  db.Arch.create({
    email: 'testArch3@gmail.com',
    password: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

  db.Client.create({
    email: 'testClient1@gmail.com',
    password: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

  db.Client.create({
    email: 'testClient2@gmail.com',
    password: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

  db.Client.create({
    email: 'testClient3@gmail.com',
    password: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

};
