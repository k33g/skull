var express     = require('express')
  , humanModel = require('./model.js')
  , addCrudRoutes = require('../helpers/crud-routes.js')
  , checkToken  = require('../checking/check-token.js')
  , checkRoles  = require('../checking/check-roles.js')
  , controller  = express.Router();


addCrudRoutes(humanModel, controller)

module.exports = controller;
