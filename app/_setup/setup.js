import express from 'express';
import UserModel from '../features/users/model';
import crypt from '../features/users/crypto-ctr';
import config from '../../config';

let controller = express.Router();

//http://localhost:8080/api/setup/addusers

/* --- add sample user(s) --- */
controller.get('/addusers', (req, res) => {
  let bob = new UserModel({
      login     : "bob"
    , password  : crypt(config.secret).encrypt("morane")
    , email     : "ph.charriere@gmail.com"
    , firstName : "Bob"
    , lastName  : "Morane"
    , role      : "admin"
    , language  : "FR"
  });

  let john = new UserModel({
      login     : "john"
    , password  : crypt(config.secret).encrypt("doe")
    , email     : "ph.charriere@gmail.com"
    , firstName : "John"
    , lastName  : "Doe"
    , role      : "sales"
    , language  : "EN"
  });

  let jane = new UserModel({
      login     : "jane"
    , password  : crypt(config.secret).encrypt("doe")
    , email     : "ph.charriere@gmail.com"
    , firstName : "Jane"
    , lastName  : "Doe"
    , role      : "marketing"
    , language  : "EN"
  });

  bob.save((err) => {
    if (err) throw err;
    console.log('Bob saved successfully');
    john.save((err) => {
      if (err) throw err;
      console.log('John saved successfully');
      jane.save((err) => {
        if (err) throw err;
        console.log('Jane saved successfully');
        res.status(200).json([bob, john, jane]);
      });
    });
  });

});

export default controller;