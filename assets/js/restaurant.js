var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
function setData(jsonData){
    data = jsonData;
    console.log(data);
}
xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		setData(JSON.parse(this.responseText));
	}
});

xhr.open("GET", "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=12.91285&longitude=100.87808");
xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "d9b6260d09mshf173d56e7c8cb49p1dfbc7jsn19ee9d462231");

xhr.send(data);