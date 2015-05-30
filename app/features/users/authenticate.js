import express from 'express';
import UserModel from './model';
import crypt from './crypto-ctr';
import config from '../../../config';
import jwt from 'jsonwebtoken';

let controller = express.Router();


/* --- authenticate sample user --- */
/* http://localhost:8080/api/authenticate */
/*
  Use with jQuery
  $.ajax({
    type:'POST',
    url:'api/authenticate',
    data:{login:"bob", password:"morane"}
  }).then(function(data){
      window.localStorage.setItem('token', data.token)
      console.log(data)
  }).fail(function(err) {console.log(err.responseText, err.statusText, err.status)})
 */

controller.post('/', (req, res, next) => {
  // find the user
  UserModel.findOne({login: req.body.login}, '+password', (err, user) => { // see http://stackoverflow.com/questions/18791616/removing-attribute-from-javascript-object-returned-by-mongooses-findoneandupd

    if (err) return next(err); // use errors/errorHandler middleware

    if (!user) {
      var error = new Error('Authentication failed. User not found.');
      error.statusCode = 401;
      return next(error);
    } else if (user) {

      // check if password matches
      if (crypt(config.secret).decrypt(user.password) != req.body.password) {
        var error = new Error('Authentication failed. Wrong password.');
        error.statusCode = 401;
        next(error);
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: config.tokenExpiration // expires in N minutes
        });

        // Get all features off a user
        // Foo

        // return the information including token as JSON
        res.json({
          token     : token,
          login     : user.login,
          firstName : user.firstName,
          lastName  : user.lastName,
          language  : user.language,
          email     : user.email,
          role      : user.role
        });

      }
    }
  });

});

export default controller;
