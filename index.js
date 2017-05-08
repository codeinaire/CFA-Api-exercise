const axios = require('axios');
const prompt = require('prompt');
const AsciiTable = require('ascii-data-table').default
const imageToAscii = require("image-to-ascii");

// converts image to ascii
function imageOut(state) {

for (var i = 0; i < state.length; i++) {
  var day = i;
  imageToAscii(`https://www.metaweather.com/static/img/weather/png/${state[i]}.png`, {
    //  size: { height: 10}
   }, (err, converted) => {
     console.log(`Day ${day}`);
     console.log(err || converted);
   });
}


}

// converts weather state into abbreviation for use in imageOut
function weatherState(state) {

  switch (state) {
    case 'Snow':
      return 'sn'
      break;
    case 'Hail':
      return 'h'
      break;
    case 'Thunderstorm':
      return 't'
      break;
    case 'Heavy Rain':
      return 'hr'
      break;
    case 'Light Rain':
      return 'lr'
      break;
    case 'Showers':
      return 's'
      break;
    case 'Heavy Cloud':
      return 'hc'
      break;
    case 'Light Cloud':
      return 'lc'
      break;
    case 'Clear':
      return 'c'
      break;

  }

}

// loops through the five day forcast pushing into array
function loopFiveDays(fiveDays) {

  const items = [
                  ['Day', 'Date', 'Weather state', 'Min temp', 'Max temp', 'Humidity', 'Consensus'],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                ]
    const state = [];
                // console.log("Return of imageOut()");
                // console.log(imageOut(state));


    for (var i = 0; i < fiveDays.length; i++) {
      state.push(weatherState(fiveDays[i].weather_state_name));
      items[i + 1].push(i + 1);
      items[i + 1].push(fiveDays[i].applicable_date);
      items[i + 1].push(fiveDays[i].weather_state_name);
      items[i + 1].push((fiveDays[i].min_temp).toFixed(2));
      items[i + 1].push((fiveDays[i].max_temp).toFixed(2));
      items[i + 1].push(fiveDays[i].humidity);
      items[i + 1].push(fiveDays[i].predictability);
  };


  // makes a table of the 5 day forcast
  const res = AsciiTable.table(items)
  console.log(res);
  
  getImages(state)


};

// gets the 5 day weather forcast of the woeid
function getWeather(woeid) {

axios.get(`https://www.metaweather.com/api/location/${woeid}`)
  .then(function (response) {
    // console.log(response.data.consolidated_weather);
    const fiveDays = response.data.consolidated_weather
    loopFiveDays(fiveDays)
  })
  .catch(function (error) {
    console.log(error);
  });

};

// getWeather(1105779);

// gets the woeid of the location entered by user
function getLocation(location) {

axios.get(`https://www.metaweather.com/api/location/search/?query=${location}`)
  .then(function (response) {
    var woeid = response.data[0].woeid;
    getWeather(woeid);
  })
  .catch(function (error) {
    console.log(error);
  });

};

function getImages(state) {

  // start prompt

  console.log("Would you like a graphical display of the weather? ");
  prompt.get(['response'], function (err, result) {
      if (result.response === "yes") {
        imageOut(state)
      } else {
        "Thank-you, enjoy your weather filled week!"
      }
  });
}

console.log("Welcome to terminal weather");
console.log("Please enter the city: ");

prompt.get(['location'], function (err, result) {
    console.log("Collecting weather data to display...");
    getLocation(result.location);
});


// do we include the node module's folder?? NO, put it in the git ignore.
