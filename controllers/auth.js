const isAuthenticated = require('../config/middleware/isAuthenticated');
const passport = require('../config/passport');
const db = require('../models');

module.exports = function(app) {

//SUBMIT LOGIN CREDS
  app.post('/api/login', function(request, response) {
    db.User.findOne({
      where: {
        email: request.body.email,
        password: request.body.password
      }
    })
    .then((data) => {
      console.log('THIS IS THE USER DATA ' + data);
      response.redirect(307, '/auth/login');
    })
    .catch((error) => {
      console.log(error);
    });
  });

//AUTH Strategy
  app.post('/auth/login', passport.authenticate('local'), function(request, response) {
    response.redirect('/completeLogin');
  });

//Send to Appropriate user page
  app.get('/completeLogin', isAuthenticated, function(request, response) {

    if (request.user) {
//ARCH PAGE RENDER
      if (request.user.kind === 'arch') {
        Promise.all([db.User.findAll({
          where: {
            assoc: request.user.id,
            kind: 'client'
          },
          include: [{model: db.Contact}]
        }),
        db.Contact.findOne({
          where: {
            UserId: request.user.id
          }
        })
      ])
        .then((data) => {
          console.log('CHECK ALL THIS OUT!!! ' + JSON.stringify(data));
          let hbsObject = {
            arch: data[0],
            contact: data[1]
          };
          response.render('arch-interface', hbsObject);
        }).catch((error) => {
          console.log(error);
        });
//CLIENT PAGE RENDER
      } else if (request.user.kind === 'client') {
        Promise.all([
          db.User.findOne({
            where: {
              id: request.user.id,
              kind: request.user.kind
            }
          }),
          db.Contact.findOne({
            where: {
              UserId: request.user.id
            }
          })
        ])
        .then((data) => {
          console.log(JSON.stringify(data));
          let hbsObject = {
            client: data[0],
            contact: data[1]
          };
          response.render('client-interface', hbsObject);
        }).catch((error) => {
          console.log(error);
        });
//ADMIN PAGE RENDER
      } else if (request.user.kind === 'admin') {
        db.User.findOne({
          where: {
            id: request.user.id,
            kind: request.user.kind
          }
        }).then((data) => {
          console.log(JSON.stringify(data));
          let hbsObject = {
            arch: data
          };
          response.render('admin-interface', hbsObject);
        }).catch((error) => {
          console.log(error);
        });
      }
//WHAT DID YOU DO????
    } else {
      response.render('wdyd');
    }
  });

  app.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/');
  });

};
