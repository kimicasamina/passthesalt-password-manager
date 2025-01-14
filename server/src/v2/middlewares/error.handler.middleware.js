export const ErrorHandler = (err, req, res, next) => {
  console.log('Middleware Error Handling...');
  console.log('ERR...: ', err.message);

  const errStatus = err.statusCode || 500; // Default to 500 if statusCode isn't set
  const errMsg = err.message || 'Something went wrong'; // Fallback message

  // Log the error stack only if in development environment
  const errStack =
    process.env.NODE_ENV === 'development' ? err.stack : undefined;

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: errStack,
    details: err.details || [],
  });
};
