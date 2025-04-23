var request = require("request");
const axios = require("axios");

var options = { method: 'POST',
  url: 'https://dev-2xr7g1xk16qz3im2.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"0xhgRqbRyzIX5RX7nJme54rVNOWVpXPa","client_secret":"9vlxtlWe3UmoZSIYkqSpzzF7L2cMXVJLo9C9yENeoRRnOzl8dZE1y8978ggCv1NK","audience":"https://dev-2xr7g1xk16qz3im2.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  Bearer = JSON.parse(body).access_token;
  options = { 
    method: "GET",
    url: "http://localhost:3000",
    headers: { "authorization": `Bearer ${Bearer}` },
  };
    

axios(options)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});  
});

