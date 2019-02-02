const request = require('superagent');

request
  .get('/lisbon-metro')
  .then((res) => {
    console.dir(res.body);
  })
  .catch((err) => {
    console.log(`Request failed: ${err.message}`);
  });
