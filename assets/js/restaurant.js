var unirest = require("unirest");

var req = unirest("GET", "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng");

req.query({
	"limit": "30",
	"currency": "USD",
	"distance": "2",
	"lunit": "km",
	"lang": "en_US",
	"latitude": "12.91285",
	"longitude": "100.87808"
});

req.headers({
	"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
	"x-rapidapi-key": "d9b6260d09mshf173d56e7c8cb49p1dfbc7jsn19ee9d462231",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});