let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


module.exports = function(app) {

//GET RELEVANT DETAILS (LOGIN), then render PROFILE
  app.get('/archlogged', isAuthenticated, function(request, response) {
    db.Arch.findOne({
      where: {
        id: request.user.id
      },
      include: [
        {model: db.ArchContact},
        {model: db.Client,
          include: [{model: db.ClientContact}]
        }
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

  //GET INDIVIDUAL CLIENT DETAILS WHEN SELECTED
  app.get('/getClientData/:id', isAuthenticated, function(request, response) {
    db.ClientContact.findOne({
      where: {
        ClientId: request.params.id
      },
      include: [{model: db.Client}]
    }).then(function(data) {
      response.json(data);
    });
  });

//MIRDANDA'S AWESOME ADVENTURE
  app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;

    form.on('file', function(name, file){
      db.archFile.create({
        name: file.name,
        type: file.type,
        size: file.size,
        content: file.path
      }).then(function(dbArchFile){
        console.log(dbArchFile);
      });
    });

    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
      res.end('success');
    });

  form.parse(req);
  });

};
