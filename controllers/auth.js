var isAuthenticated = require('../config/middleware/isAuthenticated');
var passport = require('../config/passport');
var passport2 = require('../config/passport2');
var db = require('../models');

module.exports = function(app) {

//PAGE TO ENTER ARCHITECT DETAILS AFTER SIGN UP
  app.get('/archSigned', isAuthenticated, function(request, response) {
    var hbsObject = {
      user: request.user
    };
    response.render('arch-details', hbsObject);
  });

//PAGE TO ENTER CLIENT DETAILS AFTER SIGN UP
  app.get('/clientSigned', isAuthenticated, function(request, response) {
    db.ArchContact.findAll({}).then(function(data) {
      var hbsObject = {
        arch: data
      };
      response.render('client-details', hbsObject);
    })
  });

//LOG OUT (ALL USERS)
  app.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/');
  });

//AUTHENTICATE USERS **********

//ARCHITECT LOGIN AUTH - SEND TO PROFILE PAGE/USER DATA QUERY
  app.post('/api/archlogin', passport.authenticate('local'), function(request, response) { //Architect Login
    response.redirect('/archlogged');
  });

//CLIENT LOGIN AUTH - SEND TO PROFILE PAGE/USER DATA QUERY
  app.post('/api/clientlogin', passport2.authenticate('local2'), function(request, response) { //Client Login
    response.redirect('/clientlogged');
  });

//ARCHITECT SIGN UP AUTH - SEND TO ARCH USER QUERY(possibly unnecessary) AND CONTACT DETAILS PAGE
  app.post('/api/archSuRedir', passport.authenticate('local'), function(request, response) { //ARCH-SignUp Auth
    response.redirect('/archSigned');
  });

//CLIENT SIGN UP AUTH - SEND TO ARCH USER QUERY(Absolutely necessary) AND CONTACT DETAILS PAGE
  app.post('/api/clientSuRedir', passport2.authenticate('local2'), function(request, response) { //Client-SignUp Auth
    response.redirect('/clientSigned');
  });

//AFTER LOGIN, DETECT USER TYPE - SEND TO LOGIN AUTH
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

  app.post('/api/signup', function(request, response) { //Arch/Client Sign Up
    if (request.body.userType === 'architect') {
      db.Arch.create({
        email: request.body.email.trim(),
        password: request.body.password.trim()
      }).then(function() {
        response.redirect(307, '/api/archSuRedir');
      }).catch(function(error) {
        console.log(error);
        response.json(error);
      });
    } else if (request.body.userType === 'client') {
      db.Client.create({
        email: request.body.email,
        password: request.body.password
      }).then(function() {
        response.redirect(307, '/api/clientSuRedir');
      }).catch(function(error) {
        console.log(error);
        response.json(error);
      });
    } else {
      console.log('Error');
    }
  });

  app.post('/archDetails', isAuthenticated, function(request, response) { //Arch Contact Info
    //let phone = request.body.phone_number.replace(/[^0-9]+/g, '');
    db.ArchContact.create({
      first_name:  request.body.first_name.trim(),
      last_name:  request.body.last_name.trim(),
      middle_name:  request.body.middle_name.trim(),
      addr_number:  request.body.addr_number.trim(),
      addr_street:  request.body.addr_street.trim(),
      apt_number: request.body.apt_number.trim(),
      zip_code:  request.body.zip_code.trim(),
      city:  request.body.city.trim(),
      state:  request.body.state.trim(),
      phone_number:  request.body.phone_number.trim(),
      ArchId: request.user.id
    }).then(function() {
      response.redirect(307, '/api/archUser');
    }).catch(function(error) {
      console.log(error);
      response.json(error);
    });
  });

  app.post('/clientDetails', isAuthenticated, function(request, response) { //Arch Contact Info
    //let phone = request.body.phone_number.replace(/[^0-9]+/g, '');
    db.ClientContact.create({
      first_name:  request.body.first_name.trim(),
      last_name:  request.body.last_name.trim(),
      middle_name:  request.body.middle_name.trim(),
      addr_number:  request.body.addr_number.trim(),
      addr_street:  request.body.addr_street.trim(),
      apt_number: request.body.apt_number.trim(),
      zip_code:  request.body.zip_code.trim(),
      city:  request.body.city.trim(),
      state:  request.body.state.trim(),
      phone_number:  request.body.phone_number.trim(),
      ArchId: request.body.ArchId,
      ClientId: request.user.id
    }).then(function() {
      response.redirect(307, '/api/clientUser');
    }).catch(function(error) {
      console.log(error);
      response.json(error);
    });
  });

};
