const axios = require('axios');
const prompt = require('prompt');
const AsciiTable = require('ascii-data-table').default
const imageToAscii = require("image-to-ascii");

// converts image to ascii
function imageOut(state) {

 imageToAscii(`https://www.metaweather.com/static/img/weather/png/${state}.png`, {
    size: { height: 10}
  }, (err, converted) => {
    var out = console.log(err || converted);
    return out;
  });

}

// converts weather state into abbreviation for use in imageOut
function weatherState(state) {

  switch (state) {
    case 'snow':
      return 'sn'
      break;
    case 'hail':
      return 'h'
      break;
    case 'thunderstorm':
      return 't'
      break;
    case 'heavy rain':
      return 'hr'
      break;
    case 'light rain':
      return 'lr'
      break;
    case 'showers':
      return 's'
      break;
    case 'heavy cloud':
      return 'hc'
      break;
    case 'light cloud':
      return 'lc'
      break;
    case 'clear':
      return 'c'
      break;

  }

}

// loops through the five day forcast pushing into array
function loopFiveDays(fiveDays) {

  const items = [
                  ['Day', 'Date', 'Max temp', 'Min temp', 'Humidity', 'Consensus'],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                ]

                console.log("Return of imageOut()");
                console.log(imageOut(state));


    for (var i = 0; i < fiveDays.length; i++) {
      var state = weatherState((fiveDays[i].weather_state_name).toLowerCase());
      console.log(state);
      items[i + 1].push(i + 1);
      items[i + 1].push(fiveDays[i].applicable_date);
      items[i + 1].push((fiveDays[i].max_temp).toFixed(2));
      items[i + 1].push((fiveDays[i].min_temp).toFixed(2));
      items[i + 1].push(fiveDays[i].humidity);
      items[i + 1].push(fiveDays[i].predictability);
      items[i + 1].push(fiveDays[i].weather_state_name);
      // items[i + 1].push(imageOut(state));
    // console.log(`Day: ${i + 1}, the ${fiveDays[i].applicable_date}`);
    // console.log('Weather: ' + fiveDays[i].weather_state_name);
    // console.log('Max temperature: ' + fiveDays[i].max_temp);
    // console.log('Min temperature: ' + fiveDays[i].min_temp);
    // console.log('Humidity: ' + fiveDays[i].humidity);
    // console.log('Consensus: ' + fiveDays[i].predictability);
  };


  // makes a table of the 5 day forcast
  const res = AsciiTable.table(items)
  console.log(res);


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

getWeather(1105779);

// gets the woeid of the location entered by user
// function getLocation(location) {
//
// axios.get(`https://www.metaweather.com/api/location/search/?query=${location}`)
//   .then(function (response) {
//     var woeid = response.data[0].woeid;
//     console.log(woeid);
//     getWeather(1105779);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//
// };

// console.log("Welcome to terminal weather");
// console.log("Please enter the city: ");


// start prompt

// prompt.get(['location'], function (err, result) {
//     getLocation(result.location);
// });

// do we include the node module's folder?? NO, put it in the git ignore.
