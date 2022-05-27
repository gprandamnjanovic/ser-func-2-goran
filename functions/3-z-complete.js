require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app3aCo4nzedXztXa')
  .table('products');

exports.handler = async (event, context, cb) => {
  // console.log(event);
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const product = await airtable.retrieve(id);
      // console.log(product);
      if (product.error) {
        return {
          statusCode: 400,
          body: `No product with id: ${id}`,
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server Error',
      };
    }
  }
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, price, image: img } = product.fields;
      const url = img[0].url;
      return { id, name, url, price };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
    // console.log(data);
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error',
    };
  }
};
