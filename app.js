
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  helper = require('./bin/helper.js'),
  path = require('path');
  
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'views')));

var routes = require('./bin/routes.js');
app.use('/', routes);

//connect and seed if necessary
mongo_url = helper.get_mongo_url();
mongoose.connect(mongo_url);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + mongo_url);
  helper.seed_db();
});

app.set('port', process.env.PORT || 3000);
server = app.listen(app.get('port'), function(err) {
  if(err){
      console.log('Could not start server: ' + err);
  } else {
      console.log('Server listening on port ' + server.address().port);
  }
});
      