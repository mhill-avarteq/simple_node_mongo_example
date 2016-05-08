var Quote = require('../db/quote.js'); 

random_page = function(req, res) {
	Quote.count({}, function(err, count) {
		rand_nr = Math.floor(Math.random() * count);
		Quote.find().select('_id author quote').limit(1).skip(rand_nr).exec(function (err, quotes) {
			quote = quotes[0];
			res.render('quotes/random', { quote: quote });
		});	
	});	
};

new_page = function(req, res) {
	res.render('quotes/new', { quote: {} });
};

create_quote = function(req, res) {
	console.log('sdf');
	author = req.body.author
	quote = req.body.quote

	var quote = new Quote({ author: author, quote: quote });
	quote.save(function (err, quote) {
		if (err) return console.log(err);
		res.redirect("/quotes/" + quote._id);
	});
};

show_quote = function(req, res) {
	Quote.findOne( { _id: req.params.id }, function(err, quote) {
		res.render('quotes/show', { quote: quote });
	} );
};

list_quotes = function(req, res) {
	Quote.find({}, function(error, quotes) {
		res.render('quotes/quotes', { quotes: quotes });
	});
};

delete_quote = function(req, res) {
	Quote.remove( { _id: req.params.id }, function(err) {
		res.redirect("/quotes");
	} );
};

module.exports.random_page = random_page;
module.exports.new_page = new_page;
module.exports.create_quote = create_quote;
module.exports.show_quote = show_quote;
module.exports.list_quotes = list_quotes;
module.exports.delete_quote = delete_quote;

