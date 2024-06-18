const { CustomError } = require('../errors/customError');

const WHITELIST_DOMAINS = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:3001',
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.includes(origin) || origin == undefined) {
      return callback(null, true)
    }

    return callback(new CustomError(`${origin} not allowed by our CORS Policy.`, 403))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
}
