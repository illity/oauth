require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const tokenUrl = 'https://auth.pingone.com/92cf3132-a747-49f2-aa41-8d2aa015e83b/as/token';

async function getAccessToken() {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    scope: 'test'
  });

  const auth = Buffer.from(`${process.env.PING_CLIENT_ID}:${process.env.PING_CLIENT_SECRET}`).toString('base64');

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
