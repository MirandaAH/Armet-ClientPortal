var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var expHbars = require('express-handlebars');
var db = require('./models');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride('_method'));

app.engine('handlebars', expHbars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


db.sequelize.sync({}).then(function(){
  app.listen(PORT, function() {
    console.log('Connection Successful');
  });
})
