import config from '../../config';
import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        var error = new Error('Failed to authenticate token.');
        error.statusCode = 403;
        return next(error);
      } else {
        // if everything is good, save to request for use in other routes
        req.decodedUser = decoded; // user is in decoded
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    var error = new Error('No token provided!.');
    error.statusCode = 403;
    return next(error);
  }
}