import express from 'express';
import checkToken from '../../checking/check-token'
import checkRole from '../../checking/check-role'
import config from '../../../config';

let controller = express.Router();

// route middleware to verify a token
controller.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  checkToken(req, res, next)
});

controller.use((req, res, next) => {
  checkRole(req, res, next)
});

/*==== TESTS ====*/
controller.get('/one', function (req, res) {
  return res.status(200).json({yo:'one'});
});

controller.get('/two', function (req, res) {
  return res.status(200).json({yo:'two'});
});

controller.get('/three', function (req, res) {
  return res.status(200).json({yo:'three'});
});

module.exports = controller;
