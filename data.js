function getJSON(key, location, date) {
	url = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx"
		+ "?key=" + key 
		+ "&q=" + location
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

function getData() {
	var json_response = getJSON(api_key, location, date);
	var temp = parseJSON(json_response);
	console.log(temp);
}