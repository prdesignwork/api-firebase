var form = document.getElementById('zipcode-form');
var coordinates = document.createElement('H1');
document.getElementsByClassName("container")[0].append(coordinates);
var weather = document.createElement('H2');
document.getElementsByClassName("container")[0].append(weather);

form.addEventListener('submit', (event) => {
  event.preventDefault()
  var zipcodeInput = event.target.elements.zipcode.value;

  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcodeInput)
  .then((response) => {
    return response.json()
    .then((zipcodeLocation) => {

      var latLocation = zipcodeLocation.results["0"].geometry.location.lat;

      var lngLocation = zipcodeLocation.results["0"].geometry.location.lng;

      document.getElementsByTagName('h1')[0].innerHTML = "Latitudinal location is " + latLocation + "<br>Longitudinal location is " + lngLocation + "<br>Zipcode is " + zipcodeInput;

        fetch('https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/84fb5cd8ed7974f03de5154d0fcd38c2/' + latLocation + ',' + lngLocation)
        .then((response) => {
          return response.json()
          .then((weatherDB) => {
            var weather = weatherDB.daily.summary;
            document.getElementsByTagName('h2')[0].innerHTML = "<br>Current weather summary is:<br>" + weather;
        })
      })
    })
  })
})
