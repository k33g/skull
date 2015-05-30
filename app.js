/**
 * # main module: [app.js]
 *
 */
import config from './config';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import errorHandler from './app/errors/errorHandler';

import usersCtrl from './app/features/users/controller';
import authenticationCtrl from './app/features/users/authenticate';
import setupCtrl from './app/_setup/setup'

import Broker from './app/broker/simpleBroker'

mongoose.connect(config.database);

let app = express();
let broker = new Broker(app);

app
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use('/api/authenticate', authenticationCtrl)
  .use('/api/users', usersCtrl)
  .use('/api/setup', setupCtrl)
  .use(errorHandler)
  .listen(config.httpPort);


console.log("-------------------- SKULL ------------------");
console.log(" Listening on: " + config.httpPort);
console.log("---------------------------------------------");
