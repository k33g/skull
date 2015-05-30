import express from 'express';
import UserModel from './model';
import crypt from './crypto-ctr';
import checkToken from '../../checking/check-token'
import config from '../../../config';
import jwt from 'jsonwebtoken';

let controller = express.Router();

/* when authenticate
var token = window.localStorage.getItem('token');
if (token) {
  $.ajaxSetup({
    headers: {
      'x-access-token': token
    }
  });
}
//$.get("api/users/").then(function(data){console.log(data)})
*/


// route middleware to verify a token
controller.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  checkToken(req, res, next)
});


controller.get('/', (req, res, next) => {

  UserModel.find((err, models) => {
    if (err) {
      var error = new Error('Error getting users.');
      error.statusCode = 500;
      return next(error);
    }

    //res.app.emit('users:getall', models)
    return res.status(200).json(models);
  });
});


/*
 sam = new User({
  email:"ph.charriere@gmail.com",
  firstName:"Sam",
  lastName:"LePirate",
  language:"US",
  login:"sam",
  password:"sam"
 })

 sam.save().then(function(data) { console.log(data); }).fail(function(err) { console.log("Error", err); })
 */

controller.post('/', (req, res, next) => {

  console.log("=== user create ===")

  var model = new UserModel(req.body);
  model.password = crypt(config.secret).encrypt(model.password);

  model.save((err, model) => {
    if (err) {
      var error = new Error('Error saving user.');
      error.statusCode = 500;
      return next(error);
    }
    //res.redirect(req.originalUrl + "/" + model._id);
    return res.status(200).json(model); // redirect would be better
  });
});

controller.get('/:id', (req, res, next) => {
  UserModel.findOne({_id: req.params.id}, (err, model) => {
    var error;
    if (err) {
      error = new Error('Error getting user.');
      error.statusCode = 500;
      return next(error);
    }

    if(!model) {
      error = new Error('No such user.');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json(model);
  });
});

controller.put('/:id', (req, res, next) => {

  req.body.password = crypt(config.secret).encrypt(req.body.password);

  UserModel.findOneAndUpdate({_id: req.params.id}, req.body, (err, model) => {

    var error;
    if (err) {
      error = new Error('Error getting user for update.');
      error.statusCode = 500;
      return next(error);
    }

    if(!model) {
      error = new Error('No such user.');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json(model); // redirect would be better
  });

});

controller.delete('/:id', (req, res, next) => {

  UserModel.findOneAndRemove({_id: req.params.id}, (err, model) => {
    var error;
    if (err) {
      error = new Error('Error getting user for delete.');
      error.statusCode = 500;
      return next(error);
    }

    if(!model) {
      error = new Error('No such user.');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json(model);
  });
});

export default controller;
