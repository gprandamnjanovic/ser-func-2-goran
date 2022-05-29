require('dotenv').config();
const nodemailer = require('nodemailer');

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PSSWORD } = process.env;
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PSSWORD,
  },
});

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST Request is Allowed',
    };
  }
  const { name, email, subject, message } = JSON.parse(event.body);
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: 'Please provide all values',
    };
  }
  const data = {
    from: 'John Doe <damnjanovicgoran7@gmail.com>',
    to: `${name} <${email}>`,
    subject: subject,
    html: `<p>${message}</p>`,
  };
  try {
    await transporter.sendMail({ ...data });
    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
};
