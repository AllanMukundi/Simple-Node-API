// Base setup
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Goose = require('./app/models/goose');

mongoose.connect('mongodb://allan:test@ds113282.mlab.com:13282/goose-api');

// Configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = 8000;

// Routes---------------------------------
var router = express.Router();

// Middleware example
router.use(function(req, res, next) {
  console.log("A request was sent.");
  next();
})

router.get('/', function(req, res) {
  res.json({ message: 'API test.'});
});

router.route('/goose')

  .post(function(req, res) {
    var goose = new Goose();
    goose.name = req.body.name;

    goose.save(function(err) {
      if(err) {
        res.send(err);
      }
      res.json({ message: 'Goose created successfully.' });
    });

  })

  .get(function(req, res) {
    Goose.find(function(err, goose) {
      if(err) {
        res.send(err);
      }
      res.json(goose);
    });
  });

  router.route('/goose/:goose_id')

    .get(function(req, res) {
      Goose.findById(req.params.goose_id, function(err, goose) {
        if(err) {
          res.send(err);
        }
        res.json(goose);
      });
    })

    .put(function(req, res) {
      Goose.findById(req.params.goose_id, function(err, goose) {
        if(err) {
          res.send(err);
        }
        goose.name = req.body.name

        goose.save(function(err) {
          if(err) {
            res.send(err);
          }
          res.json({ message: 'Goose updated successfully.' });
        });
      });
    })

    .delete(function(req, res) {
      Goose.remove({
        _id: req.params.goose_id
      }, function(err, goose) {
        if(err) {
          res.send(err);
        }
        res.json({ message: 'Goose deleted successfully.' });
      });
    });

//----------------------------------------

// Register routes
app.use('/api', router);

app.listen(port);
console.log('Using port ' + port);
