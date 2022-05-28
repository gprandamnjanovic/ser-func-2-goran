require('dotenv').config();
const axios = require('axios');
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`;

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST Method is Allowed',
    };
  }
  // console.log(method);
  const { city } = JSON.parse(event.body);
  // console.log(city);
  try {
    const response = await axios.get(`${url}${city}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
    };
  }
};
