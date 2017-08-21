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
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

module.exports = function (app){
  app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function(field, file) {

  fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    res.end('success');
  });

  form.parse(req);
  });
}
