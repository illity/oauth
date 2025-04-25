require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const tokenUrl = 'https://dev-44555177.okta.com/oauth2/default/v1/token';

async function getAccessToken() {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    scope: 'test' // substitua pelo escopo correto autorizado no Okta
  });

  const auth = Buffer.from(`${process.env.OKTA_CLIENT_ID}:${process.env.OKTA_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`,
      }
    });

    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter token:', error.response?.data || error.message);
  }
}

getAccessToken();
