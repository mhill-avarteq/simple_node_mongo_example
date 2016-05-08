var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/', function(req, res) {
  controller.random_page(req, res);
});

router.get('/random', function(req, res) {
  controller.random_page(req, res);
});

router.get('/quotes/new', function(req, res) {
  controller.new_page(req, res);
});

router.post('/quotes/create', function(req, res) {
  controller.create_quote(req, res);
});

router.get('/quotes/:id', function(req, res) {
  controller.show_quote(req, res);
});

router.get('/quotes', function(req, res) {
  controller.list_quotes(req, res);
});

router.get('/quotes/:id/delete', function(req, res) {
  controller.delete_quote(req, res);
});

module.exports = router;
