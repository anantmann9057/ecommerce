import bcrypt from "bcrypt";

export const sendErrorMessage = (res, message, status) => {
  res.status(status).json({ message: message, status: status });
};

export const sendSuccessResponse = ({ res, message, status, data }) => {
  res.status(status).json({
    data: data,
    message: message,
    status: status,
  });
};

export const compareToken = ({ storedToken, currentToken }) => {
  return bcrypt.compareSync(storedToken, currentToken);
};
