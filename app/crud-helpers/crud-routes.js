import express from 'express';

export default function (mongooseModel, controller) {

  controller.get('/', (req, res, next) => {
    //console.log("req.originalUrl", req.originalUrl);
    mongooseModel.find((err, models) => {
      if (err) {
        var error = new Error('Error getting models.');
        error.statusCode = 500;
        return next(error);
      }
      return res.status(200).json(models);
    });
  });

  controller.post('/', (req, res, next) => {
    //console.log("POST", req.originalUrl, req.body);
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

  controller.get('/:id', (req, res, next) => {
    //console.log("GET", req.originalUrl, req.params.id);
    mongooseModel.findOne({_id: req.params.id}, (err, model) => {
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

  controller.put('/:id', (req, res, next) => {
    //console.log("PUT", req.originalUrl, req.params.id, req.body);
    mongooseModel.findOneAndUpdate({_id: req.params.id}, req.body, (err, model) => {

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

  controller.delete('/:id', (req, res, next) => {

    //console.log("DELETE", req.originalUrl, req.params.id);

    mongooseModel.findOneAndRemove({_id: req.params.id}, (err, model) => {

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
