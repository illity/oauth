const express = require('express');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const app = express();  // Initialize the Express app

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'of3p0yDhE2Bf_Lp87i0epRzJjoG4mLbPb4eprQUGi2qXewbxrr9ujMq6PoczyX-b',
  baseURL: 'http://localhost:3000',
  clientID: 'Ul9VZcID0WFX0De6MKwzqlFOrpSvkdvg',
  issuerBaseURL: 'https://dev-2xr7g1xk16qz3im2.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  console.log(req.oidc);
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
