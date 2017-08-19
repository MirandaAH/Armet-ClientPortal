var path = require('path');
var isAuthenticated = require('../config/middleware/isAuthenticated');

var passport = require('../config/passport');
var db = require('../models');

module.exports = function(app) {

//html-routes

  app.get('/', function(request, response) {
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('index');
  });

  app.get('/login', function(request, response) {
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('login');
  });

  app.get('/signup', function(request, response) {
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('signup');
  });

  app.get('/logged', isAuthenticated, function(request, response) { //?????
    console.log('I am: ' + request.user.email);

    var hbsObject = {
      user: request.user
    };

    response.render('logged', hbsObject);
  });

  app.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/');
  });

//api-routes
  app.post('/api/login', passport.authenticate('local'), function(request, response) {
    response.redirect('/logged'); //?????
  });

  app.post('/api/signup', function(request, response) { //?????
    db.User.create({
      email: request.body.email,
      password: request.body.password
    }).then(function() {
      response.redirect(307, '/api/login');
    }).catch(function(error) {
      console.log(error);
      response.json(error);
    });
  });


};
