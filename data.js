function getJSON(key, loc, date) {
	url = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx"
		+ "?key=" + key 
		+ "&q=" + loc
		+ "&date=" + date
		+ "&format=json";

	var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    var response = JSON.parse(xhr.response);
    
    return response;
}

function parseJSON(json_data) {
	var weather = json_data.data.weather[0];
	var avg_temp_c = (parseInt(weather.maxtempC) + parseInt(weather.mintempC)) / 2;

	return avg_temp_c;
}

function getCity() {
	var input = $("#city").val().split(' ');
	var city = '';
	input.forEach(function(d, i) {
		city += d;
		if (i != input.length - 1) city += '+';
	})

	return city;
}

function getData(loc, date) {
	var json_response = getJSON(api_key, loc, date);
	var temperature = parseJSON(json_response);
	return temperature;
}

function prepareData() {
	var location = getCity();

	var month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var current_date = new Date(),
		year = current_date.getFullYear(),
		month = current_date.getMonth() + 1,
		day = current_date.getDate(),
		month_name = month_array[month];

	var climate_data = [];

	while (year >= 2008) {
		var date = [year, month, day].join('-');
		var temp = getData(location, date);
		climate_data.push({location: location, year: year, temperature: temp});
		year--;
	}
	
	createChart(climate_data);
}