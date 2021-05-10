const jsonwebtoken = require('jsonwebtoken');

// TODO: change to read from process env
const privateKey = 'secret2';

const sign = (payload) => new Promise((resolve, reject) => {
  jsonwebtoken.sign(payload, privateKey, (err, token) => {
    if (err) reject(new Error(err));
    resolve(token);
  });
});

const verify = (token) => new Promise((resolve, reject) => {
  jsonwebtoken.verify(token, privateKey, (err, decoded) => {
    if (err) reject(new Error(err));
    resolve(decoded);
  });
});


module.exports = {
  sign,
  verify,
};
