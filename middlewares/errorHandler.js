const { CustomAPIError } = require("../errors/customErrors");

// Express has built in error function that will handle the error by default
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: "Something went worng. Please try again" });
};

module.exports = errorHandlerMiddleware;
