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

  //GO TO ADD CLIENT PAGE
  app.get('/addClientPage', isAuthenticated, function(request, response) {
    response.render('add-client');
  });

  //ADD A NEW CLIENT (ARCH)
let clientAddInfo;

  app.post('/addClient', isAuthenticated, function(request, response) {
    clientAddInfo = request.body;
    Promise.all([
      db.Client.findAll({
        attributes: ['id']
      }),
      db.Client.create({
        email: request.body.email,
        password: request.body.password,
        ArchId: request.user.id
      })
    ])
    .then((data) => {
      let x = data[0][data[0].length - 1].id + 1;
      Promise.all([
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
          ArchId: request.user.id,
          ClientId: x
        })
      ])
      .then((data) => {
        response.redirect('/archlogged');
      })
    })
    .catch(function(error) {
    console.log(error);
    });
  });

//GET ID FOR NEW CLIENT
  function getClientId(email) {
    db.Client.findOne({
      where: { email: email }
    }).then((data) => {
      let x = { id: data.id, ArchId: data.ArchId };
      clientAddId = x;
    });
  }
  function defineInfo(data) {
    request.body = data;
  }

//MIRDANDA'S AWESOME ADVENTURE
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

};


// Promise.all([db.findAll(tableA), db.findAll(tableB)])
// .then((data) => {
//    //data[0] is response from tableA find
//    // data[1] is from tableB
// })

//SELECT * FROM tableName ORDERBY ASC/DESC LIMIT 1
