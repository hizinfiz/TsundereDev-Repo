

// ==========================================================================================================================================

clock({
  twentyfour : twentyfourhours, // Update in config.js
  padzero : zero, 
  refresh : 1000,
  success: function(clock){
    document.getElementById('time').innerHTML = clock.hour() +  " : " + clock.minute();
    document.getElementById('fullDate').innerHTML = clock.daytext() + ", " + clock.date() + " " + clock.monthtext() + " " + clock.year();                 }
});

// ==========================================================================================================================================

$(document).ready(function() {
  getWeather(); //Get the temperature, location and condition
  setInterval(getWeather, 600000); // Update the weather every 10 minutes.
  box();
});

function getWeather() {
  $.simpleWeather({
    woeid: woeid, // Update in config.js
    unit: unit, // Update in config.js
    success: function(weather) {
      document.getElementById("temp").innerHTML = '<li class="temp">'+weather.temp+'&deg;'+weather.units.temp+'</li>';
      document.getElementById("weather-city").innerHTML = '<li class="city">'+weather.city+'</li>';
      document.getElementById("weather-curr").innerHTML = '<li class="currently">'+weather.currently+'</li>';
    },
    error: function(error) {
      $("#temp").html('<p>'+error+'</p>');
      $("#weather-city").html('<p>'+error+'</p>');
      $("#weather-curr").html('<p>'+error+'</p>');
    }
  });
}


function box() {
  document.getElementsByClassName('box')[0].style.marginTop = margintop;
}
// ==========================================================================================================================================