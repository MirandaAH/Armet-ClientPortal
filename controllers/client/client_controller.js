let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');
var request = require('ajax-request');


module.exports = function(app) {

app.get('/download', isAuthenticated, function(request, response) {
  function downloadFile(x){
    request.download({
      url: x,
      destPath: function(filename) {
        return filename;
      }
    }, function(err, res, body, destpath) {
      if(error){
        console.log('there was an error, man');
      }
      console.log('')
    });
  }
});



//GET RELEVANT DETAILS (LOGIN), then render PROFILE
  // app.get('/clientlogged', isAuthenticated, function(request, response) {
  //   db.Client.findOne({
  //     where: {
  //       id: request.user.id
  //     },
  //     include: [{model: db.Arch}]
  //   }).then(function(data) {
  //     console.log('LETS HAVE A LOOK AT THIS: ' + JSON.stringify(data));
  //     let hbsObject = {
  //       client: data
  //     };
  //     response.render('client-interface', hbsObject);
  //   }).catch(function(error) {
  //     response.json(error);
  //   });
  // });

};
