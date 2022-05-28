require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app3aCo4nzedXztXa')
  .table('survery');

exports.handler = async (event, context, cb) => {
  // console.log(event);httpMethod
  const method = event.httpMethod;
  if (method === 'GET') {
    try {
      const { records } = await airtable.list();
      // console.log(records);
      const survery = records.map((item) => {
        const { id } = item;
        const { room, votes } = item.fields;
        return { id, room, votes };
      });
      return {
        statusCode: 200,
        body: JSON.stringify(survery),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server Error',
      };
    }
  }
  if (method === 'PUT') {
    try {
      const { id, votes } = JSON.parse(event.body);
      if (!id || !votes) {
        return {
          statusCode: 400,
          body: 'Please provide id and votes values!',
        };
      }
      const fields = { votes: Number(votes) + 1 };
      const item = await airtable.update(id, { fields });
      console.log(item);
      if (item.error) {
        return {
          statusCode: 400,
          body: JSON.stringify(item),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: 'Please provide id an votes values!',
      };
    }
  }
  //Default response
  return {
    statusCode: 405,
    body: 'Only GET & PUT Requests Allowed',
  };
};
