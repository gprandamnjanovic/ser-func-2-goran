require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only Accepts POST Request',
    };
  }
  const { purchase, total_amount, shipping_fee } = JSON.parse(event.body);
  // console.log(purchase, total_amount, shipping_fee);
  const calculateOrderAmount = () => {
    return shipping_fee + total_amount;
  };
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'usd',
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
