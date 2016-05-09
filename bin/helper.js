var Quote = require('../db/quote.js'); 
var seeds = require('../db/seeds.js');

get_mongo_url = function () {
  try {
		var mongodb_service_name = process.env.MONGODB_SERVICE_NAME;
    var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
    mongo_url = vcap_services[mongodb_service_name][0].credentials.uri;
    return mongo_url;
	} catch (err) {
		console.log("An error occured while loading the MongoDB credentials from the env:", err)
		throw Error(err); 
	}
}

seed_db = function (params) {
  Quote.count({}, function(err, count) {
		if(count === 0) {
			console.log("Inserting seeds into the database!");
			for(var i = 0; i < seeds.length; i++) {
				var quote = new Quote({ 
          author: seeds[i].author, 
          quote: seeds[i].quote 
        });
				quote.save(function (err, quote) {
					if (err) return console.log(err);
				});
			}
		} else {
			console.log("Found data. Skipping seeds section!");
		}
	});
}

module.exports.get_mongo_url = get_mongo_url
module.exports.seed_db = seed_db