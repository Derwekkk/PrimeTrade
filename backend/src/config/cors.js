const { CORS_ORIGIN } = require("./env");

const corsOptions = {
  origin: CORS_ORIGIN.split(","),
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions };
