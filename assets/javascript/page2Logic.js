// run weatherQuery for that city

// populate DOM with day icons, high temp, low temp

var hotelCounter = 0;

var currentCity; 
var latitude;
var longitude;

var daysShown = 7;

//calculates dimensions for images in slideshow
var documentWidth = $(document).width();
var documentHeight = $(document).height();
var imageWidth = .5 * documentWidth;
var imageHeight = .4 * documentHeight;

//switch to turn off setInterval function that plays image slideshow
var playingImageSlideshow = 0;
//keeps track of which div is showing
var divOpened = "none";

//gets today's date and the date eight days from now (used to limit user input in event form)
var today = new Date();
var todaymm = today.getMonth() + 1;
var todaydd = today.getDate();
var todayyy = today.getFullYear();
var beginning = todaymm + "/" + todaydd + "/" + todayyy;

var sevenDaysFromToday = new Date();
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + daysShown - 1);
var endmm = sevenDaysFromToday.getMonth() + 1;
var enddd = sevenDaysFromToday.getDate();
var endyy = sevenDaysFromToday.getFullYear();
var end = endmm + "/" + enddd + "/" + endyy;

//eventfulAPIKey
var eventfulKey = "6MjJmgvxws8Mw9hz";
var googleMapsKey = "AIzaSyC4wHmmK9UQ73Dt3GhziiwysbQdSS-5cSE";

//firebase initialization
var config = {
apiKey: "AIzaSyAlvm9H2XTBUbAJGx84uaTROnQi6FR33jI",
authDomain: "remote-in-style-1518157314057.firebaseapp.com",
databaseURL: "https://remote-in-style-1518157314057.firebaseio.com",
projectId: "remote-in-style-1518157314057",
storageBucket: "",
messagingSenderId: "803886486196"
};

//user account variables
firebase.initializeApp(config);
var database = firebase.database();
var uid; //identifier for user's node in database
var loggedIn = 0; //identifies whether user is logged in
var newUser = 0; //identifies whether user is new
var userFirstName; //user's first name (to be displayed in header)
var userCities = []; //user's favorite cities
var userHotels = [];
var changingTab = 0; //switch to prevent onAuthStateChanged function from running when user backtracks

function loadWeatherImage() {

	var desiredWeather = sessionStorage.getItem("weather");

	if (desiredWeather === "snow") {
		$("#weather-image").attr("src", "assets/images/icon_snowy_70.png");
	}
	else if (desiredWeather === "rain") {
		$("#weather-image").attr("src", "assets/images/icon_rainy_70.png");
	}
	else if (desiredWeather === "sunny") {
		$("#weather-image").attr("src", "assets/images/icon_sunny_70.png");
	}
	else if (desiredWeather === "temperate") {
		$("#weather-image").attr("src", "assets/images/icon_overcast_70.png");
	}

};

function findForecast(latitude, longitude) {

	$("#weather-stats").empty();

	var queryURL = "https://api.darksky.net/forecast/7c1ee8ce08e3d4210e427e13b9b51926/" + latitude + "," + longitude;
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	var targetUrl = queryURL;
    
	$.get(proxyUrl + targetUrl, function(response) {

		for (var i = 0; i < daysShown; i++) {

			var weatherDay = $("<div>");

			if(i + 1 === daysShown)
				weatherDay.addClass("last-weather-day");
			else
				weatherDay.addClass("weather-day");

			var dayAndDateDiv = $("<div>");
			var dayAndDate = $("<span>");
			dayAndDateDiv.addClass("day-and-date");
			var day = $("<span>");
			day.addClass("day");
				if (i === 0) {
					day.append("Tod.<br>");
				}
				else if (i === 1) {
					day.append("Tom.<br>");
				}
				else {
					var today = moment();
					today.add(i, "days");
					day.append(today.format("ddd")).append("<br>");
				}
			var date = $("<span>");
			date.addClass("date");
				var today = moment();
				today.add(i, "days");
				date.append(today.format("MMM D"));

			dayAndDateDiv.append(day, date)

			var weatherImageDiv = $("<div>");
			var weatherImage = $("<img>");
			weatherImageDiv.addClass("daily-weather-image");
			if ((response.daily.data[i].icon === "rain") || (response.daily.data[i].precipType === "rain" && response.daily.data[i].precipProbability > 0.3)) {
				weatherImage.attr("src", "assets/images/icon_rainy_70.png");
			}
			else if ((response.daily.data[i].icon === "snow") || (response.daily.data[i].precipType === "snow" && response.daily.data[i].precipProbability > 0.3)) {
				weatherImage.attr("src", "assets/images/icon_snowy_70.png");
			}
			else if ((response.daily.data[i].icon === "partly-cloudy-day" || response.daily.data[i].icon === "partly-cloudy-night" || response.daily.data[i].icon === "wind" || response.daily.data[i].icon === "fog" || response.daily.data[i].icon === "clear-day" || response.daily.data[i].icon === "cloudy") && (response.daily.data[i].temperatureHigh < 70)) {
					weatherImage.attr("src", "assets/images/icon_overcast_70.png");
			}
			else if ((response.daily.data[i].icon === "partly-cloudy-day" || response.daily.data[i].icon === "partly-cloudy-night" || response.daily.data[i].icon === "wind" ||
				response.daily.data[i].icon === "fog" ||response.daily.data[i].icon === "clear-day" || response.daily.data[i].icon === "cloudy") && (response.daily.data[i].temperatureHigh > 70)) {
					weatherImage.attr("src", "assets/images/icon_sunny_70.png");
			}		

			weatherImageDiv.append(weatherImage);
			var temperatures = $("<span>");
			temperatures.addClass("temperatures");
			var tempHigh = $("<span>");
			tempHigh.addClass("temp-high");
			tempHigh.append(Math.round(response.daily.data[i].temperatureHigh)).append(" / ");
			var tempLow = $("<span>");
			tempLow.addClass("temp-low");
			tempLow.append(Math.round(response.daily.data[i].temperatureLow));

			temperatures.append(tempHigh, tempLow);

			weatherDay.append(dayAndDateDiv, weatherImageDiv, temperatures);

			$("#weather-stats").append(weatherDay);

		}
	});
};

function playImageSlideshow() {
	$("#images").empty();
	setTimeout(function() {
		var date = new Date();
		$("#images").append("<img class = 'display-none' id = '" + "img-" + 0 + "' src = 'https://source.unsplash.com/" + imageWidth + "x" + imageHeight + "/?" + currentCity + "/?" + date.getTime() + "'>");
	}, 100);
	setTimeout(function() {
		var date = new Date();
		$("#images").append("<img class = 'display-none' id = '" + "img-" + 1 + "' src = 'https://source.unsplash.com/" + imageWidth + "x" + imageHeight + "/?" + currentCity + "/?" + date.getTime() + "'>");
	}, 200);
	setTimeout(function() {
		var date = new Date();
		$("#images").append("<img class = 'display-none' id = '" + "img-" + 2 + "' src = 'https://source.unsplash.com/" + imageWidth + "x" + imageHeight + "/?" + currentCity + "/?" + date.getTime() + "'>");
	}, 300);

	var j = 0;
	var slideshow = setInterval(function(){
		if(playingImageSlideshow !== 1) {
			clearInterval(slideshow);
			return;
		}
		var image = $("#img-" + j);
		image.removeClass("display-none");
		image.addClass("display-block");
		image.addClass("fadeIn");
		setTimeout(function(){
			image.addClass("fadeOut");
			var date = new Date();
			$("#images").append("<img class = 'display-none' id = '" + "img-" + j + "' src = 'https://source.unsplash.com/" + imageWidth + "x" + imageHeight + "/?" + currentCity + "/?" + date.getTime() + "'>");
			j = (j + 1) % 3;
		}, 6500);
		setTimeout(function(){
			image.remove();
		}, 8500);
	}, 9000);
} 

//Limits dates user can select in event form
$(function() {
	$('[data-toggle="datepicker"]').datepicker({
		startDate: beginning,
		endDate: end
	});
});

//Initializes "add to city favorites" star
$(function(){
	$(".rateYo-city").rateYo({
		numStars: 1,
		fullStar: true,
		starWidth: "40px"
	});
});

$(function(){
	$(".rateYo-city").rateYo().on("rateyo.set", function(e, data){
		if(data.rating === 5 && loggedIn === 1) {
			database.ref("users/" + uid + "/favoriteCities/" + currentCity).update({
				favorite: "true"
			});
		}
		else if(data.rating === 0 && loggedIn === 1) {
			database.ref("users/" + uid + "/favoriteCities/" + currentCity).update({
				favorite: null
			});
		}
	});
});

//Initializes "add to hotel favorites" star
$(function(){
	$(".rateYo-hotel").rateYo({
		numStars: 1,
		fullStar: true,
		starWidth: "40px"
	});
});

$(function(){
	$(".rateYo-hotel").rateYo().on("rateyo.set", function(e, data){
		var propertyCode = $(".hotel-name").attr("property_code");
		var name = $(".hotel-name").text();
		var address = $(".hotel-address").text();
		var number = $("#hotel-number").text();

		if(data.rating === 5 && loggedIn === 1) {
			database.ref("users/" + uid + "/favoriteHotels/" + currentCity + "/" + propertyCode).update({
				name: name,
				address: address,
				number: number
			});
		}
		else if(data.rating === 0 && loggedIn === 1) {
			database.ref("users/" + uid + "/favoriteHotels/" + currentCity).child(propertyCode).remove();
		}
	});
});

//Collects user's inputs in the event form
function parseEventForm(){
	var startTemp = beginning;
	var endTemp = end;

	$("#event-form").removeClass("display-none");
	$("#validation").empty();

	$("#start-date").focus(function(){
		$("#start-date").blur();
	});
	$("#end-date").focus(function(){
		$("#end-date").blur();
	});

	$(document).on("click", "#submit-event-form", function(){
		event.preventDefault();
		var startDate = $("#start-date").val().trim();
		var endDate = $("#end-date").val().trim();
		var userAddress = $("#address-event-form").val().trim();
		var maximumDistance = $("#maximum-distance").val().trim();
		var categoriesString = "";
		var eventfulDate = convertToEventfulDateFormat(startDate) + "-" + convertToEventfulDateFormat(endDate);
		var queryURL;

		$("#event-form input:checkbox").each(function(){
			if($(this).is(":checked")){
				if(categoriesString === "")
					categoriesString = $(this).attr("id");
				else
					categoriesString = categoriesString + "+" + $(this).attr("id");
			}
		});

		if(startDate === "" || endDate === "")
			$("#validation").text("Please enter a start date and end date");
		else if (categoriesString === "")
			$("#validation").text("Please select at least one category");
		else if (verifyDateOrder(startDate, endDate) === false)
			$("#validation").text("Start date must be on or before end date");
		else if (userAddress !== "" && maximumDistance === "")
			$("#validation").text("Must enter a maximum distance if address is entered");
		else if (maximumDistance !== "" && userAddress === "")
			$("#validation").text("Must enter an address if maximum distance is entered");
		else if(isNaN(maximumDistance) === true || parseInt(maximumDistance) <= 0)
			$("#validation").text("Enter a numeric maximum distance greater than zero");
		else {
			if(userAddress !== "") {
				$.ajax({
					url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + userAddress +
					", " + currentCity + "&key=" + googleMapsKey,
					method: "GET" 
				}).then(function(response){	
					if(parseInt(response.results.length) > 0 && !(response.results[0].hasOwnProperty("partial_match"))) {
						var userAddressLatitude = response.results[0].geometry.location.lat;
						var userAddressLongitude = response.results[0].geometry.location.lng;
						queryURL = "https://api.eventful.com/json/events/search?app_key=" + eventfulKey + 
						"&date=" + eventfulDate + "&c=" + categoriesString + "&l=" + currentCity +
						"&page_size=5&sort_order=popularity&where=" + userAddressLatitude + "," + 
						userAddressLongitude + "&within=" + maximumDistance;
						$("#start-date").val("");
						$("#end-date").val("");
						$("#maximum-distance").val("");
						$("#address-event-form").val("");
						$("#event-form input:checkbox").each(function(){
							if($(this).is(":checked"))
								$(this).prop("checked", false);
						});	
						$("#event-form").addClass("display-none");
						populateEvents(queryURL, 1);
					}
					else {
						$("#validation").text("Please enter a valid address");
					}
				});
			}
			else {
				$("#start-date").val("");
				$("#end-date").val("");
				$("#maximum-distance").val("");
				$("#address-event-form").val("");
				$("#event-form input:checkbox").each(function(){
					if($(this).is(":checked")){
						$(this).prop("checked", false);
					}
				});	
				$("#event-form").addClass("display-none");
				queryURL = "https://api.eventful.com/json/events/search?app_key=" + eventfulKey + 
				"&date=" + eventfulDate + "&c=" + categoriesString + "&l=" + currentCity +
				"&page_size=5&sort_order=popularity";
				populateEvents(queryURL, 1);
			}
		}
	});
}

//Populates events div with events
function populateEvents(queryURL, number){
	$("#event-listings").removeClass("display-none");
	$("#back-button").removeClass("display-none");

	$.ajax({
		url: queryURL + "&page_number=" + number,
		jsonpCallback: "callback",
		dataType: "JSONP",
		method: "GET"  
	}).then(function(response){
		if(response.events != null) {
			var eventArray = response.events.event;
			var allEvents = $("<div>");
			for(var i = 0; i < eventArray.length; i++) {
				var event = eventArray[i];
				
				var eventDiv = $("<div>");
				eventDiv.addClass("event");
				
				var eventInfoDiv = $("<div>");
				eventInfoDiv.addClass("event-info");
				eventInfoDiv.append("<a target = '_blank' href='" + event.url + "'><p class = 'event-title'>" + event.title + "</p></a>");
				
				var startTime = moment(event.start_time).format('dddd MMM DD, h:mm a');
				eventInfoDiv.append("<p class='event-start-date'>Starts: " + startTime + "</p>");
				eventInfoDiv.append("<p class='event-location'><a target = '_blank' href='" + event.venue_url + "'>" + 
					event.venue_name + "</a> | <a target = '_blank' href='https://www.google.com/maps/search/?api=1&query=" +
					event.latitude + "," + event.longitude + "'>" + event.venue_address + " " + 
					event.city_name + ", " + event.region_abbr + "</a></p>");
				
				eventDiv.append(eventInfoDiv);
				if(i % 2 === 0)
					eventDiv.addClass("event-even");
				else
					eventDiv.addClass("event-odd");
				allEvents.append(eventDiv);
			}

			$("#event-listings").prepend(allEvents);

			if(parseInt(response.page_number) <= 1)
				$("#left-arrow").addClass("display-none");
			else
				$("#left-arrow").removeClass("display-none");

			if(response.page_number === response.page_count)
				$("#right-arrow").addClass("display-none");
			else
				$("#right-arrow").removeClass("display-none");

			$("#left-arrow").on("click", function(){
				$("#left-arrow").unbind("click");
				$("#right-arrow").unbind("click");
				$(".event").remove();
				populateEvents(queryURL, --number);
			});

			$("#right-arrow").on("click", function(){ 
				$("#left-arrow").unbind("click");
				$("#right-arrow").unbind("click");
				$(".event").remove();
				populateEvents(queryURL, ++number);	
			});
		}
		else {
			$("#event-listings").prepend("<p> Sorry, no events can be found</p>");
		}
	});
}

//Verifies that start date is before end date
function verifyDateOrder(start, end){
	var startYear = parseInt(start.substr(6, 4));
	var startMonth = parseInt(start.substr(3, 2));
	var startDay = parseInt(start.substr(0, 2));
	var endYear = parseInt(end.substr(6, 4));
	var endMonth = parseInt(end.substr(3, 2));
	var endDay = parseInt(end.substr(0, 2));

	if(startYear > endYear)
		return false;
	else if(startYear < endYear)
		return true;
	else if(startMonth > endMonth)
		return false;
	else if(startMonth < endMonth)
		return true;
	else if(startDay > endDay)
		return false;
	else
		return true;
}

//Converts input to proper date format required by Eventful API
function convertToEventfulDateFormat(dateString){
	var day;
	var month;
	var year;

	day = dateString.substr(3, 2);
	month = dateString.substr(0, 2);
	year = dateString.substr(6, 4);
	return year + month + day + "00";
}

// finds 10 hotels within 40km of city
function loadHotels(latitude, longitude) {
	var queryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=iD5zJSk96ckruurDP9FraQIVA5ROplcG&latitude=" + 
	latitude + "&longitude=" + longitude + "&radius=40&check_in=" + todayyy + "-" + todaymm + "-" + 
	todaydd + "&check_out=" + endyy + "-" + endmm + "-" + enddd + "&number_of_results=10";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		$(".hotel-name").text(response.results[hotelCounter].property_name);
		$(".hotel-name").attr("property_code", response.results[hotelCounter].property_code);
		$(".hotel-address").append(response.results[hotelCounter].address.line1).append("<br>").append(response.results[hotelCounter].address.city).append("<br>").append(response.results[hotelCounter].address.postal_code);
		$(".hotel-number").append("Phone: <span id = 'hotel-number'>" + response.results[hotelCounter].contacts[0].detail + "</span>");
		$(".rateYo-hotel").removeClass("display-none");
		if(isHotelFavorited() === true) {
			$(".rateYo-hotel").rateYo("rating", 5);
		}
		else {
			$(".rateYo-hotel").rateYo("rating", 0);
		}
	});

};

function isHotelFavorited() {
	var propertyCode = $(".hotel-name").attr("property_code");

	for(var i = 0; i < userHotels.length; i++) {
		if(userHotels[i].city === currentCity) {
			for(var j = 0; j < userHotels[i].hotels.length; j++) {
				if(userHotels[i].hotels[j].property === propertyCode)
					return true;
			}
		}
	}
	return false;
}

// validates email user enters to create an account
function validateEmail(string) {
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string))
		return true;
	else
		return false;
}

function hasLettersAndNumbers(string) {
	var hasLetter = 0;
	var hasNumber = 0;
	for(var i = 0; i < string.length; i++) {
		var char = string.charAt(i);
		if(hasNumber === 0 && isNaN(parseInt(char)) === false)
			hasNumber = 1;
		else if(hasLetter === 0 && (/[a-z]/i).test(string.charAt(i)) === true)
			hasLetter = 1;
		if(hasLetter === 1 && hasNumber === 1)
			return true;
	}
	return false;
}

//Gets data from new user info form and stores in firebase
function parseNewUserInfo(email, password) {
	$("#signup-modal").addClass("display-none");
	$("#new-user-info-modal").removeClass("display-none");
	populateCountries("user-country", "user-state");
	populateStates("user-country", "user-state");
	$("#new-user-info-modal input:text").each(function(){
		$(this).val("");
	});
	$("#user-country").val("");
	$("#user-state").val("");
	$("#new-user-info-error").empty();

	$("#submit-new-user-info").on("click", function(){
		$("#submit-new-user-info").unbind("click");
		var isFieldEmpty = false;
		$("#new-user-info-modal input:text").each(function(){
			if($(this).val().trim() === "")
				isFieldEmpty = true;
		});
		if($("#user-country").val() === "" || $("#user-state").val() === "")
			isFieldEmpty = true;
		if(isFieldEmpty === true)
			$("#new-user-info-error").text("All fields must be filled out");
		else if(isNaN(parseInt($("#user-age").val().trim())) === true)
			$("#new-user-info-error").text("Age must be a number");
		else {
			const auth = firebase.auth();
			const promise = auth.createUserWithEmailAndPassword(email, password);
			promise.catch(function(e){
				$("#signup-error").text("An error occurred. Please try again");
			});
			$("#new-user-info-modal").addClass("display-none");
		}
	});
}

$(document).ready(function() {
	currentCity = sessionStorage.getItem("city");
	latitude = sessionStorage.getItem("latitude");
	longitude = sessionStorage.getItem("longitude");
	changingTab = 0;

	$(".city").text(currentCity);
	$("#page2body").css("background-image", "url('https://source.unsplash.com/" + documentWidth + "x" + documentHeight + "/?" + currentCity + "')");
	
	if(loggedIn === 0) {
		$(".rateYo-city").rateYo("option", "readOnly", true);
		$(".rateYo-hotel").rateYo("option", "readOnly", true);
	}
	
	$(document).on("click", ".info", function(){
		var value = $(this).attr("value");
		if(divOpened === value)
			return;
		$("#main-content").removeClass("display-none");
		$(".content").addClass("display-none");
		$(document).off("click", "#submit-event-form");
		$("#left-arrow").unbind("click");
		$("#left-arrow").addClass("display-none");
		$("#right-arrow").unbind("click");
		$("#right-arrow").addClass("display-none");
		divOpened = value;
		$("#" + value).removeClass("display-none");
		
		if(value === "slideshow") {
			playingImageSlideshow = 1;
			playImageSlideshow();
		}
		else {
			playingImageSlideshow = 0;
			$("#images").empty();
		}

		if(value === "events")
			parseEventForm();
		else 
			$(".event").remove();

		if (value === "hotels") {
			$(".hotel-name, .hotel-address, .hotel-number").empty();
			$(".rateYo-hotel").addClass("display-none");
			loadHotels(latitude, longitude);
		}
	});

	$(document).on("click", ".next-btn", function(e) {
		e.preventDefault();
		$(".rateYo-hotel").addClass("display-none");
		if (hotelCounter < 9) {
			hotelCounter++;
		}
		else {
			hotelCounter = 0;
		}
		$(".hotel-name, .hotel-address, .hotel-number").empty();
		loadHotels(latitude, longitude);
	});

	//Gets rid of all event listeners and clears all elements associated with a ".info" button
	$(document).on("click", "#close-content", function(){
		$("#main-content").addClass("display-none");
		$(".content").addClass("display-none");
		divOpened = "none";
		playingImageSlideshow = 0;
		$("#images").empty();
		$(document).off("click", "#submit-event-form");
		$("#left-arrow").unbind("click");
		$("#left-arrow").addClass("display-none");
		$("#right-arrow").unbind("click");
		$("#right-arrow").addClass("display-none");
		$(".event").remove();
	});

	$(document).on("click", "#log-in", function(){
		$("#login-modal").removeClass("display-none");
		$("#login-error").empty();
	});

	$(document).on("click", "#create-account", function(){
		$("#signup-modal").removeClass("display-none");
		$("#signup-error").empty();
	});

	$(document).on("click", "#close-login-modal", function(){
		$("#login-modal input[type=text]").val("");
		$("#login-modal input[type=password]").val("");
		$("#login-modal").addClass("display-none");
	});

	$(document).on("click", "#close-signup-modal", function(){
		$("#signup-modal input[type=text]").val("");
		$("#signup-modal input[type=password]").val("");
		$("#signup-modal").addClass("display-none");
	});

	findForecast(latitude, longitude);

	loadWeatherImage();

	$(document).on("click", "#close-new-user-info-modal", function(){
		$("#new-user-info-modal").addClass("display-none");
	});

	$(document).on("click", "#submit-login", function(){
		var email = $("#login-email-address").val().trim();
		var password = $("#login-password").val();
		const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch(function(e) {
			$("#login-error").text("Incorrect email or password");
		});
		$("#login-email-address").val("");
		$("#login-password").val("");
	});

	$(document).on("click", "#submit-new-account", function(){
		var email = $("#signup-email-address").val().trim();
		var password = $("#signup-password").val();
		var confirmationPassword = $("#confirm-password").val();
		var object = firebase.auth().fetchProvidersForEmail(email);

		
		object.then(function(){ 
			if(validateEmail(email) === false) {
				$("#signup-email-address").val("");
				$("#signup-error").text("Not a valid email");
			}
			else if(hasLettersAndNumbers(password) === false)
				$("#signup-error").text("Password must contain at least one letter and one number");
			else if(password.length < 6)
				$("#signup-error").text("Password must be at least six characters");
			else if(password !== confirmationPassword)
				$("#signup-error").text("Passwords must be identical");
			else if(object["i"].length !== 0)
				$("#signup-error").text("An account with that email already exists");
			else {
				$("#signup-password").val("");
				$("#confirm-password").val("");
				$("#signup-email-address").val("");
				newUser = 1;
				parseNewUserInfo(email, password)
			}

		$("#signup-password").val("");
		$("#confirm-password").val("");
		$("#signup-email-address").val("");
		
		});
	});

	$(document).on("click", "#log-out", function(){
		firebase.auth().signOut();
	});

	$("#weather-image").on("click", function() {
			changingTab = 1;
			sessionStorage.setItem("Weather chosen", "false");
		});

	$("#city-name").on("click", function() {
			changingTab = 1;
			sessionStorage.setItem("Weather chosen", "true");
		});

	firebase.auth().onAuthStateChanged(function(firebaseUser){
		if(changingTab === 1)
			return;

		if(firebaseUser) {
			$("#enter-account").addClass("display-none-important");
			$("#exit-account").removeClass("display-none-important");
			$("#login-modal").addClass("display-none");
			$("#new-user-info-modal").addClass("display-none");
			$(".rateYo-city").rateYo("option", "readOnly", false);
			$(".rateYo-hotel").rateYo("option", "readOnly", false);
			loggedIn = 1;
			uid = firebaseUser.uid;
			if(newUser === 0) {
				database.ref("/users/" + uid).on("value", function(snapshot){
					userFirstName = snapshot.val().firstName;
					$("#user-name").text(userFirstName);
				});
			}
			else {
				userFirstName = $("#user-first-name").val().trim();
				var userLastName = $("#user-last-name").val().trim();
				var userAge = $("#user-age").val().trim();
				var userCountry = $("#user-country").val().trim();
				var userState = $("#user-state").val().trim();
				database.ref("users/" + uid).set({
					firstName: userFirstName,
					lastName: userLastName,
					age: userAge,
					country: userCountry,
					state: userState
				});
				$("#user-name").text(userFirstName);
				if(divOpened === "hotels" && isHotelFavorited() === true)
					$(".rateYo-hotel").rateYo("rating", 5);
			}
			//initializes array of cities and hotels that the user previously liked and sets up event listeners
			database.ref("/users/" + uid + "/favoriteCities").on("value", function(snapshot){
				if(snapshot.hasChild(currentCity))
					$(".rateYo-city").rateYo("rating", 5);
				var cityKeys = snapshot.val();
				userCities = []; //clear userCities to avoid repeats
				for(var key in cityKeys)
					userCities.push(key);
			});
			database.ref("/users/" + uid + "/favoriteHotels").on("value", function(snapshot){
				var hotelObject = snapshot.val();
				if(hotelObject === null)
					return;
				userHotels = [];
				for(var city in hotelObject) {
					var obj = {};
					obj["city"] = city;
					var hotelArray = [];
					for(var property in hotelObject[city]) {
						var hotelObj = {};
						hotelObj["property"] = property;
						hotelObj["address"] = hotelObject[city][property].address;
						hotelObj["number"] = hotelObject[city][property].number;
						hotelObj["name"] = hotelObject[city][property].name;
						hotelArray.push(hotelObj);
					}
					obj["hotels"] = hotelArray;
					userHotels.push(obj);
				}
			});
		}
		else {
			newUser = 0;
			loggedIn = 0;
			uid = "";
			userCities = [];
			$(".rateYo-city").rateYo("option", "readOnly", true);
			$(".rateYo-city").rateYo("rating", 0);
			$(".rateYo-hotel").rateYo("option", "readOnly", true);
			$(".rateYo-hotel").rateYo("rating", 0);
			$("#enter-account").removeClass("display-none-important");
			$("#exit-account").addClass("display-none-important");
		}
	});

});
