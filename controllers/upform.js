const formidable = require('formidable');
const isAuthenticated = require('../../config/middleware/isAuthenticated');
//let db = require('../../models');

module.exports = function(app) {

  app.post('/fileUpload', isAuthenticated, function(request, response) {
    if (request.user.kind !== 'arch') { response.redirect('/logout'); }
    
  });

};

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
