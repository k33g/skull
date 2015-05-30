var express = require('express');

var addCrudRoutes = function (mongooseModel, controller) {

  controller.get('/', function (req, res, next) {
    console.log("GET", req.originalUrl);
    //console.log("req.originalUrl", req.originalUrl);
    mongooseModel.find(function (err, models) {
      if (err) {
        var error = new Error('Error getting models.');
        error.statusCode = 500;
        return next(error);
      }
      return res.status(200).json(models);
    });
  });

  controller.post('/', function (req, res, next) {
    console.log("POST", req.originalUrl, req.body);
    var model = new mongooseModel(req.body);
    model.save(function (err, model) {
      if (err) {
        var error = new Error('Error saving model.');
        error.statusCode = 500;
        return next(error);
      }
      //res.redirect(req.originalUrl + "/" + model._id);
      return res.status(200).json(model); // redirect would be better
    });
  });

  controller.get('/:id', function (req, res, next) {
    console.log("GET", req.originalUrl, req.params.id);
    //console.log("get", req.params.id)
    mongooseModel.findOne({_id: req.params.id}, function (err, model) {
      if (err) {
        var error = new Error('Error getting model.');
        error.statusCode = 500;
        return next(error);
      }

      if(!model) {
        var error = new Error('No such model.');
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json(model);
    });
  });

  controller.put('/:id', function (req, res, next) {
    console.log("PUT", req.originalUrl, req.params.id, req.body);
    //console.log("put:req.originalUrl", req.originalUrl);
    mongooseModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, model) {

      if (err) {
        var error = new Error('Error getting model for update.');
        error.statusCode = 500;
        return next(error);
      }

      if(!model) {
        var error = new Error('No such model.');
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json(model); // redirect would be better
    });
  });

  controller.delete('/:id', function (req, res, next) {

    console.log("DELETE", req.originalUrl, req.params.id);

    mongooseModel.findOneAndRemove({_id: req.params.id}, function (err, model) {

      if (err) {
        var error = new Error('Error getting model for delete.');
        error.statusCode = 500;
        return next(error);
      }

      if(!model) {
        var error = new Error('No such model.');
        error.statusCode = 404;
        return next(error);
      }

      return res.status(200).json(model);
    });
  });

  return controller;
};

module.exports = addCrudRoutes;
