import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
    success: false,
  };

  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(
      err.keyValue
    )} already in use. Please choose another.`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({
    message: customError.msg,
    statusCode: customError.statusCode,
    success: false,
  });
};

export default errorHandlerMiddleware;
