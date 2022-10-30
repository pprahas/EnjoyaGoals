const jwt = require("jsonwebtoken");

const createToken = {
  activation: (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {
      expiresIn: "20d",
    });
  },
};

const InvCreateToken = {
  activation: (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, 
      // {
      // creater: payload.creater,
      // expiresAt: payload.expiresAt,
      // maxUses: payload.maxUses,
      // }
      );
  },
};

module.exports = createToken, InvCreateToken;