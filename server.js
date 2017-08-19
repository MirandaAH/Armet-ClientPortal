const express = require('express');
const bodyParser = require('body-parser');
const methOver = require('method-override');
const expHbars = require('express-handlebars');
const session = require('express-session');
const passport = require('./config/passport.js');
const passport2 = require('./config/passport2.js');
const db = require('./models'); //MODELS

const app = express();
const PORT = process.env.PORT || 8080;

//express static -where you get your static files (css, js, images, etc...)
app.use(express.static('./assets')); //

//bodyParser - parsing responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//express sessions - manage user login sessions
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport2.initialize());
app.use(passport.session());

//method override for put/delete
app.use(methOver('_method'));

//exp-handlebars
app.engine('handlebars', expHbars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//controllers
//require('./controller/arch/html-routes.js')(app);
//require('./controller/client/html-routes.js')(app);
require('./controllers/auth.js')(app);

db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
  });
});
