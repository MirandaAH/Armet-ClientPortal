module.exports = function(app) {

  app.get('/', function(request, response) { //HOME
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('index');
  });

  app.get('/login', function(request, response) { //LOGIN PAGE
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('login');
  });

  app.get('/signup', function(request, response) { //SIGN UP PAGE
    if (request.user) {
      response.redirect('/logged');
    }
    response.render('signup');
  });

};
