var cities = [
	{
		"name": "Abbotsford",
		"latitude": "49.0504",
		"longitude": "-122.3045"
	},
	{
		"name": "Amsterdam",
		"latitude": "52.3702",
		"longitude": "4.8952"
	},
	{
		"name": "Atlanta",
		"latitude": "33.7490",
		"longitude": "-84.3880"
	},
	{
		"name": "Auckland",
		"latitude": "-36.8485",
		"longitude": "174.7633"
	},
	{
		"name": "Austin",
		"latitude": "30.287144",
		"longitude": "-97.728885"
	},
	{
		"name": "Baltimore",
		"latitude": "39.2904",
		"longitude": "-76.6122"
	},
	{
		"name": "Bangkok",
		"latitude": "13.7563",
		"longitude": "100.5018"
	},
	{
		"name": "Barcelona",
		"latitude": "41.3851",
		"longitude": "2.1734"
	},
	{
		"name": "Beijing",
		"latitude": "39.9042",
		"longitude": "116.407396"
	},
	{
		"name": "Berlin",
		"latitude": "52.5200",
		"longitude": "13.4050"
	},
	{
		"name": "Bern",
		"latitude": "46.9480",
		"longitude": "7.4474"
	},
	// {
	// 	"name": "Boston",
	// 	"latitude": "42.3601",
	// 	"longitude": "71.0589"
	// },
	// {
	// 	"name": "Bucharest",
	// 	"latitude": "44.4268",
	// 	"longitude": "26.1025"
	// },
	// {
	// 	"name": "Budapest",
	// 	"latitude": "47.4979",
	// 	"longitude": "19.0402"
	// },
	// {
	// 	"name": "Buenos Aires",
	// 	"latitude": "-34.6037",
	// 	"longitude": "-58.3816"
	// },
	// {
	// 	"name": "Buffalo",
	// 	"latitude": "42.8864",
	// 	"longitude": "-78.8784"
	// },
	// {
	// 	"name": "Cairns",
	// 	"latitude": "-16.9186",
	// 	"longitude": "145.7781"
	// },
	// {
	// 	"name": "Canggu",
	// 	"latitude": "-8.6478",
	// 	"longitude": "115.1385"
	// },
	// {
	// 	"name": "Cape Town",
	// 	"latitude": "-33.9249",
	// 	"longitude": "18.4241"
	// },
	// {
	// 	"name": "Cardiff",
	// 	"latitude": "51.4816",
	// 	"longitude": "-3.1791"
	// },
	// {
	// 	"name": "Charleston",
	// 	"latitude": "32.7765",
	// 	"longitude": "-79.9311"
	// },
	// {
	// 	"name": "Charlotte",
	// 	"latitude": "35.2271",
	// 	"longitude": "-80.8431"
	// },
	// {
	// 	"name": "Chattanooga",
	// 	"latitude": "35.0456",
	// 	"longitude": "-85.3097"
	// },
	// {
	// 	"name": "Chennai",
	// 	"latitude": "13.0827",
	// 	"longitude": "80.2707"
	// },
	// {
	// 	"name": "Chiang Mai",
	// 	"latitude": "18.7061",
	// 	"longitude": "98.9817"
	// },
	// {
	// 	"name": "Chicago",
	// 	"latitude": "41.8781",
	// 	"longitude": "-87.6298"
	// },
	// {
	// 	"name": "Chisinau",
	// 	"latitude": "47.0105",
	// 	"longitude": "28.8638"
	// },
	// {
	// 	"name": "Cluj",
	// 	"latitude": "46.7712",
	// 	"longitude": "23.6236"
	// },
	// {
	// 	"name": "Copenhagen",
	// 	"latitude": "55.676097",
	// 	"longitude": "12.568337"
	// },
	// {
	// 	"name": "Daegu",
	// 	"latitude": "35.8714",
	// 	"longitude": "128.6014"
	// },
	// {
	// 	"name": "Dallas",
	// 	"latitude": "32.7767",
	// 	"longitude": "-96.7970"
	// },
	// {
	// 	"name": "Denpasar",
	// 	"latitude": "-8.6705",
	// 	"longitude": "115.2126"
	// },
	// {
	// 	"name": "Denver",
	// 	"latitude": "39.7392",
	// 	"longitude": "-104.9903"
	// },
	// {
	// 	"name": "Detroit",
	// 	"latitude": "42.3314",
	// 	"longitude": "-83.0458"
	// },
	// {
	// 	"name": "Dubai",
	// 	"latitude": "25.2048",
	// 	"longitude": "55.2708"
	// },
	// {
	// 	"name": "Dublin",
	// 	"latitude": "53.3498",
	// 	"longitude": "-6.2603"
	// },
	// {
	// 	"name": "Frankfurt",
	// 	"latitude": "50.1109",
	// 	"longitude": "8.6821"
	// },
	// {
	// 	"name": "Ft. Lauderdale",
	// 	"latitude": "26.1224",
	// 	"longitude": "-80.1373"
	// },
	// {
	// 	"name": "Funchal Madeira",
	// 	"latitude": "32.6669",
	// 	"longitude": "-16.9241"
	// },
	// {
	// 	"name": "Barcelona",
	// 	"latitude": "41.3851",
	// 	"longitude": "16.9241"
	// },
	// {
	// 	"name": "Gainesville",
	// 	"latitude": "29.6516",
	// 	"longitude": "-82.3248"
	// },
	// {
	// 	"name": "Galicia",
	// 	"latitude": "42.5751",
	// 	"longitude": "-8.1339"
	// },
	// {
	// 	"name": "Groningen",
	// 	"latitude": "53.2194",
	// 	"longitude": "6.5665"
	// },
	// {
	// 	"name": "Hanoi",
	// 	"latitude": "21.0278",
	// 	"longitude": "105.8342"
	// },
	// {
	// 	"name": "Ho Chi Minh City",
	// 	"latitude": "10.8231",
	// 	"longitude": "106.6297"
	// },
	// {
	// 	"name": "Hobart",
	// 	"latitude": "-42.8821",
	// 	"longitude": "147.3272"
	// },
	// {
	// 	"name": "Hong Kong",
	// 	"latitude": "22.3964",
	// 	"longitude": "114.1095"
	// },
	// {
	// 	"name": "Honolulu",
	// 	"latitude": "21.3069",
	// 	"longitude": "-157.8583"
	// },
	// {
	// 	"name": "Houston",
	// 	"latitude": "29.7604",
	// 	"longitude": "-95.3698"
	// },
	// {
	// 	"name": "Mexico City",
	// 	"country": "Mexico",
	// 	"latitude": "19.432608",
	// 	"longitude": "-99.133208"
	// },
	// {
	// 	"name": "Munich",
	// 	"country": "Germany",
	// 	"latitude": "48.08",
	// 	"longitude": "11.34"
	// },
	// {
	// 	"name": "New York",
	// 	"country": "USA",
	// 	"latitude": "40.712775",
	// 	"longitude": "-74.005973"
	// },
	// {
	// 	"name": "Phuket",
	// 	"country": "Thailand",
	// 	"latitude": "7.5324",
	// 	"longitude": "98.2354"
	// },
	// {
	// 	"name": "Porto",
	// 	"country": "Portugal",
	// 	"latitude": "41.94371",
	// 	"longitude": "-8.371903"
	// },
	// {
	// 	"name": "Riga",
	// 	"country": "Latvia",
	// 	"latitude": "56.5656",
	// 	"longitude": "98.2354"
	// },
	// {
	// 	"name": "Rio de Janiero",
	// 	"country": "Brazil",
	// 	"latitude": "-22.906847",
	// 	"longitude": "-43.172896"
	// },
	// {
	// 	"name": "Seoul",
	// 	"country": "South Korea",
	// 	"latitude": "37.34",
	// 	"longitude": "-126.58"
	// },
	// {
	// 	"name": "Vancouver",
	// 	"country":" Canada",
	// 	"latitude": "49.282729",
	// 	"longitude": "-123.120738"
	// }
];

var desiredWeather;
var desiredTemp;

var name;
var latitude;
var longitude;

var matchingCities = [];

function checkWeatherChosen() {

	var weatherChosen = sessionStorage.getItem("Weather chosen");

	if (weatherChosen === null) {
		sessionStorage.clear();
		return;
	}
	else if (weatherChosen === "false") {
		$(".title-screen").addClass("display-none");
		$(".weather-screen").removeClass("display-none");
	}
	else if (weatherChosen === "true") {
		$(".title-screen").addClass("display-none");
		desiredWeather = sessionStorage.getItem("weather");
		if (desiredWeather === "sunny") {
			desiredTemp = "hot";
		}
		else if (desiredWeather === "temperate") {
			desiredTemp = "cold";
		}

		matchWeatherType();

		$(document).ajaxStop(function() {

			$(".weather-screen").addClass("display-none");

			$(".button-screen").removeClass("display-none");

			addToPage();

		});

	}

}

function matchWeatherType() {

	for (var i = 0; i < cities.length; i++) {

		name = cities[i].name;
		latitude = cities[i].latitude;
		longitude = cities[i].longitude;

		weatherQuery(name, latitude, longitude);

	};	
};

function weatherQuery(name, latitude, longitude) {

	var queryURL = "https://api.darksky.net/forecast/7c1ee8ce08e3d4210e427e13b9b51926/" + latitude + "," + longitude;
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	var targetUrl = queryURL;
    
	$.get(proxyUrl + targetUrl, function(response) {
		
		if (desiredWeather === "rain" || desiredWeather === "snow") {
			if (response.daily.icon === desiredWeather) {
			matchingCities.push(name);
			}
		}

		else if (desiredWeather === "clear-day") {
			if (desiredTemp === "hot" && parseInt(response.daily.data[0].temperatureHigh) > 70) {
				if (response.daily.icon === desiredWeather) {
					matchingCities.push(name);
				} 
			}
			else if (desiredTemp === "cold" && parseInt(response.daily.data[0].temperatureHigh) < 70) {
				if (response.daily.icon === desiredWeather) {
					matchingCities.push(name);
				} 
			}
		}
	});
};

function addToPage() {

	for (var i = 0; i < matchingCities.length; i++) {

		potentialCity = $("<a>");

		potentialCity.addClass("pure-button").attr("href","page2Index.html").text(matchingCities[i]).attr("data-name", matchingCities[i]);

		$(".city-button").append(potentialCity);

	};

};

$(document).ready(function() {

	checkWeatherChosen();

	$(".title-screen").on("click", function() {

		$(this).addClass("display-none");

		$(".weather-screen").removeClass("display-none");

	});


	$(document).on("click", ".weather-icon", function() {
		
		matchingCities = [];

		var thisIcon = $(this);

		desiredWeather = $(this).attr("data-weather");

		desiredTemp = $(this).attr("data-temp");

		var id = $(this).attr("id");

		if(desiredWeather === "snow")
			$("#selection-notification").text("YOU HAVE SELECTED SNOW!");
		else if(desiredWeather === "clear-day" && desiredTemp === "hot")
			$("#selection-notification").text("YOU HAVE SELECTED SUNNY");
		else if(desiredWeather === "clear-day" && desiredTemp === "cold")
			$("#selection-notification").text("YOU HAVE SELECTED OVERCAST!");
		else
			$("#selection-notification").text("YOU HAVE SELECTED RAINY!");

		setTimeout(function(){
			matchWeatherType();

			$(document).ajaxStop(function() {

				$(".city-button").empty();

				$(".weather-screen").addClass("display-none");

				$(".button-screen").removeClass("display-none");

				addToPage();

			});

			sessionStorage.clear();

			if (desiredWeather === "snow" || desiredWeather === "rain") {
				sessionStorage.setItem("weather", thisIcon.attr("data-weather"));
			}
			else if (desiredWeather === "clear-day" && desiredTemp === "hot") {
				sessionStorage.setItem("weather", "sunny");
			}
			else if (desiredWeather === "clear-day" && desiredTemp === "cold") {
				sessionStorage.setItem("weather", "temperate");
			}
		}, 3000);

	});

	$(document).on("click", ".pure-button", function() {

		sessionStorage.setItem("city", $(this).attr("data-name"));

		for (var i = 0; i < cities.length; i++) {
			if ($(this).attr("data-name") === cities[i].name) {
				latitude = cities[i].latitude;
				longitude = cities[i].longitude;
			}
		}

		sessionStorage.setItem("latitude", latitude);
		sessionStorage.setItem("longitude", longitude);

	});

	$(document).on("click", "#back-to-weather", function() {
		$("#selection-notification").empty();
		$(".button-screen").addClass("display-none");
		$(".weather-screen").removeClass("display-none");
	});

});




