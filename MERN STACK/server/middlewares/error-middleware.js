const errorMiddleware = (err, req, res, next) => {
    const status = err.status 
    const message = err.message 
    const extraDetails = err.extraDetails 
  
    console.error(
      `[${req.method}]  ${req.path} >> StatusCode:: ${status}, Message:: ${extraDetails} `
    );
  console.log("sssssssssss---------------------",status, message, extraDetails);
   res.status(status).json({ message, extraDetails });
  };
  
  module.exports = errorMiddleware;