let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');

module.exports = function(app) {

//GET RELEVANT DETAILS (LOGIN), then render PROFILE
  app.get('/archlogged', isAuthenticated, function(request, response) {
    db.Arch.findOne({
      where: {
        id: request.user.id
      },
      include: [
        {model: db.ArchContact},
        {model: db.Client}
      ]
    }).then(function(data) {
      console.log('LETS HAVE A LOOK AT THIS: ' + JSON.stringify(data));
      let hbsObject = {
        arch: data
      };
      response.render('arch-interface', hbsObject);
    }).catch(function(error) {
      response.json(error);
    });
  });

//GET RELEVANT DETAILS (POST-SIGN UP), then render PROFILE
  app.post('/api/archUser', isAuthenticated, function(request, response) {
    db.Arch.findOne({
      where: {
        id: request.user.id
      },
      include: [
        {model: db.ArchContact},
        {model: db.Client}
      ]
    }).then(function(data) {
      console.log('LETS HAVE A LOOK AT THIS: ' + JSON.stringify(data));
      let hbsObject = {
        arch: data
      };
      response.render('arch-interface', hbsObject);
    }).catch(function(error) {
      response.json(error);
    });
  });
};
