const returnError = (statusCode: number, message: string) => {
  return {
    statusCode,
    response: {
      status: false,
      code: statusCode,
      message,
      data: { id: "s", email: "s" },
    },
  };
};
const returnSuccess = (statusCode: number, message: string, data = {}) => {
  return {
    statusCode,
    response: {
      status: true,
      code: statusCode,
      message,
      data,
    },
  };
};

export default {
  returnError,
  returnSuccess,
};
