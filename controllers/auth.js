var path = require('path');
var isAuthenticated = require('../config/middleware/isAuthenticated');

var passport = require('../config/passport');
var passport2 = require('../config/passport2');
var db = require('../models');

module.exports = function(app) {

//html-routes

  app.get('/', function(request, response) { //HOME
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('index');
  });

  app.get('/login', function(request, response) { //LOGIN PAGE
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('login');
  });

  app.get('/signup', function(request, response) { //SIGN UP PAGE
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('signup');
  });

  app.get('/archlogged', isAuthenticated, function(request, response) { //ARCH LOGGED IN
    var hbsObject = {
      user: request.user
    };
    response.render('arch-interface', hbsObject);
  });

  app.get('/clientlogged', isAuthenticated, function(request, response) { //CLIENT LOGGED IN
    var hbsObject = {
      user: request.user
    };
    response.render('client-interface', hbsObject);
  });

  app.get('/logout', function(request, response) { //LOG OUT
    request.logout();
    response.redirect('/');
  });

//api-routes
  app.post('/api/archlogin', passport.authenticate('local'), function(request, response) { //Architect Login
    response.redirect('/archlogged');
  });

  app.post('/api/clientlogin', passport2.authenticate('local2'), function(request, response) { //Client Login
    response.redirect('/clientlogged');
  });

  app.post('/api/login', function(request, response) {

    if (request.body.userType === 'client') {
      db.Client.findAll({
        where: {
          email: request.body.email,
          password: request.body.password
        }
      }).then(function() {
        response.redirect(307, '/api/clientlogin');
      }).catch(function(error) {
        console.log('ERROR: ' + error);
        response.json(error);
      });
    } else if (request.body.userType === 'architect') {
      db.Arch.findAll({
        where: {
          email: request.body.email,
          password: request.body.password
        }
      }).then(function() {
        response.redirect(307, '/api/archlogin');
      }).catch(function(error) {
        console.log('ERROR: ' + error);
        response.json(error);
      });
    }
  });

  app.post('/api/signup', function(request, response) { //Create New Arch or New Client
    if (request.body.userType === 'architect') {
      db.Arch.create({
        email: request.body.email,
        password: request.body.password
      }).then(function() {
        response.redirect(307, '/api/archlogin');
      }).catch(function(error) {
        console.log(error);
        response.json(error);
      });
    } else if (request.body.userType === 'client') {
      db.Client.create({
        email: request.body.email,
        password: request.body.password
      }).then(function() {
        response.redirect(307, '/api/clientlogin');
      }).catch(function(error) {
        console.log(error);
        response.json(error);
      });
    } else {
      console.log('Error');
    }
  });


};
