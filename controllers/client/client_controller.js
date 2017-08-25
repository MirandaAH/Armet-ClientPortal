let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');

module.exports = function(app) {

//GET RELEVANT DETAILS (LOGIN), then render PROFILE
  app.get('/clientlogged', isAuthenticated, function(request, response) {
    db.Client.findOne({
      where: {
        id: request.user.id
      },
      include: [{model: db.Arch}]
    }).then(function(data) {
      console.log('LETS HAVE A LOOK AT THIS: ' + JSON.stringify(data));
      let hbsObject = {
        client: data
      };
      response.render('client-interface', hbsObject);
    }).catch(function(error) {
      response.json(error);
    });
  });

};
