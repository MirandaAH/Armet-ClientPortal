let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');
// var path = require('path');
// var formidable = require('formidable');
// var fs = require('fs');

module.exports = function(app) {

//Navigate to Add-Client Page
  app.get('/addClientPage', isAuthenticated, function(request, response) {
    if (request.user.kind !== 'arch') { response.redirect('/logout'); }
    response.render('add-client');
  });

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

//GET CLIENT Contact Info --AND PROBABLY FILES TOO LATER
  app.get('/getClientData/:id', isAuthenticated, function(request, response) {
    db.Contact.findOne({
      where: {
        UserId: request.params.id
      },
      include: [{model: db.User}]
    }).then((data) => {
      console.log('THIS IS THE GOODS ' + JSON.stringify(data));
      response.json(data);
    })
  });

//************************************************************

//MIRDANDA'S AWESOME ADVENTURE
//   app.post('/upload', function(req, res){
//     var form = new formidable.IncomingForm();
//     form.multiples = true;
//     form.uploadDir = path.join(__dirname, '/uploads');
//     form.on('file', function(field, file) {
//
//   fs.rename(file.path, path.join(form.uploadDir, file.name));
//   });
//
//   form.on('error', function(err) {
//     console.log('An error has occured: \n' + err);
//   });
//
//   form.on('end', function() {
//     res.end('success');
//   });
//
//   form.parse(req);
//   });
//
};

//*********************************************************
// Promise.all([db.findAll(tableA), db.findAll(tableB)])
// .then((data) => {
//    //data[0] is response from tableA find
//    // data[1] is from tableB
// })

//SELECT * FROM tableName ORDERBY ASC/DESC LIMIT 1
//let phone = request.body.phone_number.replace(/[^0-9]+/g, '');
