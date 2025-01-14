export const createError = (message, status = 500, details = []) => {
  console.log('CREATING AN ERROR... ');
  const err = new Error(message); // Ensure we pass the message to the parent Error constructor
  err.statusCode = status; // Use statusCode instead of status (convention in Express)
  err.details = details; // Optional field for additional error info
  console.log('ERR: ', err);
  return err;
};
