let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var request = require('ajax-request');

module.exports = function(app) {

  //GET CLIENT Contact Info --AND PROBABLY FILES TOO LATER
    app.get('/getClientData/:id', isAuthenticated, function(request, response) {
      db.Contact.findOne({
        where: {
          UserId: request.params.id
        },
        include: [{model: db.User},{model: db.ArchFile}]
      }).then((data) => {
        console.log('THIS IS THE GOODS ' + JSON.stringify(data));
        response.json(data);
      })
    });

//Navigate to Add-Client Page
  app.get('/addClientPage', isAuthenticated, function(request, response) {
    if (request.user.kind !== 'arch') { response.redirect('/logout'); }
    response.render('add-client');
  });

//Navigate to Arch-Settings
  app.get('/archSettings', isAuthenticated, function(request, response) {
    if (request.user.kind !== 'arch') { response.redirect('/logout'); }
    Promise.all([
      db.Contact.findOne({
        where: {
          UserId: request.user.id
        }
      })
    ]).then((data) => {
      console.log(JSON.stringify(data));
      let hbsObject = {
        contact: data[0]
      };
      response.render('arch-settings', hbsObject);
    }).catch((error) => {
      console.log(error);
    })

  })

//Add new client
  app.post('/api/addClient', isAuthenticated, function(request, response) {
    Promise.all([
      db.User.findAll({
        attributes: ['id']
      }),
      db.User.create({
        email: request.body.email,
        password: request.body.password,
        kind: 'client',
        assoc: request.user.id
      })
    ])
    .then((data) => {
      let x = data[0][0].id + 1; //Assumes id value with largest integer is at index 0 and no other larger id values have been deleted
      Promise.all([
        db.Contact.create({
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
          UserId: x
        })
      ])
      .then((data) => {
        response.redirect('/completeLogin');
      })
    })
    .catch((error) => {
    console.log(error);
    });
  });

  app.put('/api/updateContact', isAuthenticated, function(request, response) {
    db.Contact.update({
      first_name:  request.body.first_name.trim(),
      last_name:  request.body.last_name.trim(),
      middle_name:  request.body.middle_name.trim(),
      addr_number:  request.body.addr_number.trim(),
      addr_street:  request.body.addr_street.trim(),
      apt_number: request.body.apt_number.trim(),
      zip_code:  request.body.zip_code.trim(),
      city:  request.body.city.trim(),
      state:  request.body.state.trim(),
      phone_number:  request.body.phone_number.trim()
    }, {
      where: {
        UserId: request.user.id
      }
    }).then((data) => {
      response.redirect('/');
    }).catch((error) => {
      console.log(error);
    });
  });

//MIRDANDA'S AWESOME ADVENTURE
  app.post('/upload', function(req, res){
    let x = $('#upload-input').val();

    var form = new formidable.IncomingForm();
    form.multiples = true;

    form.uploadDir = path.join(__dirname, '/uploads');

    form.on('file', function(name, file) {
      db.ArchFile.create({
        name: name,
        ContactId: x
      }).then((data) => {
        response.redirect('/completeLogin');
      })
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

//*********************************************************
// Promise.all([db.findAll(tableA), db.findAll(tableB)])
// .then((data) => {
//    //data[0] is response from tableA find
//    // data[1] is from tableB
// })

//SELECT * FROM tableName ORDERBY ASC/DESC LIMIT 1
//let phone = request.body.phone_number.replace(/[^0-9]+/g, '');
