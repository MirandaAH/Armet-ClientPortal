var path = require('path');
var isAuthenticated = require('../config/middleware/isAuthenticated');

var passport = require('../config/passport');
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

  app.get('/archlogged', isAuthenticated, function(request, response) { //LOGGED IN

    var hbsObject = {
      user: request.user
    };

    response.render('arch-interface', hbsObject);
  });

  app.get('/logout', function(request, response) { //LOG OUT
    request.logout();
    response.redirect('/');
  });

//api-routes
  app.post('/api/login', passport.authenticate('local'), function(request, response) {
    response.redirect('/archlogged');
  });

  app.post('/api/signup', function(request, response) {
    console.log(request.body.userType);

    if (request.body.userType === 'architect') {
      db.Arch.create({
        email: request.body.email,
        password: request.body.password
      }).then(function() {
        response.redirect(307, '/api/login');
      }).catch(function(error) {
        console.log(error);
        response.json(error);
      });
    } else if (request.body.userType === 'client') {

    } else {
      console.log('Error');
    }

  });


};
