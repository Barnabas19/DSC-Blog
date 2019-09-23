const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (request, response, next) => {
  let token;
  if (request.headers.authorization) {
    token = request.headers.authorization.split(' ')[1];
  }
  token = token
    || request.headers['x-access-token'].split(' ')[1]
    || request.query.token.split(' ')[1]
    || request.body.token.split(' ')[1];

  if (!token) {
    return response.status(401).send({
      success: false,
      message: 'You did not provide a token',
    });
  }

  return jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      return response.status(401).send({
        success: false,
        message: 'Your token is invalid or expired',
      });
    }

    request.payload = payload;
    return next();
  });
};

module.exports = verifyToken;
