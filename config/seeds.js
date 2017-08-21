let db = require('../models/');

module.exports = function() {

  db.Token.create({
    token: 'password'
  }).then(function(data) {
    console.log(data);
  }).catch(function(error) {
    console.log(error);
    response.json(error);
  });

};
