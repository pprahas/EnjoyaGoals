const jwt = require("jsonwebtoken");

const createToken = {
  activation: (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {
      expiresIn: "20d",
    });
  },
};

module.exports = createToken;
