let isAuthenticated = require('../../config/middleware/isAuthenticated');
let db = require('../../models');

module.exports = function(app) {

app.put('/comment/:id', isAuthenticated, function(req, res){
  console.log(req);
  db.Docs.update({
    comment: req.body.comment
  }, {
    where: {
      id: req.params.id
    }
  }).then((data) => {
    response.json(data);
  });
});

};
