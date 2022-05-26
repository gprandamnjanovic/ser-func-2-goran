//domain/.netlify/functions/1-hello
//exports
// const person = { name: 'Jhon' };
exports.handler = async (event, context, cb) => {
  // cb(null, { statusCode: 200, body: 'Hello World' });
  // console.log(event);
  // console.log(context);
  // return {
  //   statusCode: 404,
  //   // body: JSON.stringify(person),
  //   body: 'Resurce not found',
  // };
  return {
    statusCode: 200,
    body: 'Hello World!',
  };
};
