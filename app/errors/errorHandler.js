/* Error-handling middleware component */
export default function (err, req, res, next) {
  console.log("=== Error-handling ===")
  console.log("req.originalUrl", req.originalUrl);
  console.log("req.method", req.method);
  console.log("req.decoded[user]", req.decodedUser);

  console.log("-----------------------------------------")
  console.log(req.body)
  console.log("-----------------------------------------")

  console.error('error', err);

  res.status(err.statusCode || 500).send(err.message)
  //res.status(err.statusCode || 500).json(err.message)

}

