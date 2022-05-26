// const items = [{ name: 'susan' }, { name: 'anna' }];
const items = require('../assets/data');

exports.handler = async (event, context, cb) => {
  return {
    headers: {
      'Access-Control-Allow-Orgin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
