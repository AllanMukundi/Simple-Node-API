// Call packages
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = 8000;

// Setting up routes
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'API test.'});
});

app.use('/api', router);

app.listen(port);
console.log('Using port ' + port);
