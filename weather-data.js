'use strict'
const http = require('http');
let url ="https://api.openweathermap.org/data/2.5/weather?lat=47.3769&lon=8.5417&appid=a996f11c487ccc58fac63f8ac4233682";

http.get({
  url: url,
  json: true,
}, (err, res, data) => {
  if (err) {
    console.log('Error:', err);
  } else if (res.statusCode !== 200) {
    console.log('Status:', res.statusCode);
  } else {
    // data is already parsed as JSON:
    console.log(data);
  }
});