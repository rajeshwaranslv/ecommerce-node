const express = require('express');
const Router = express.Router();
const DB = require('../../models/db');
const HELPERFUNC = require('../../models/commonfunctions');
var mongoose = require('mongoose');

Router.get('/listPages', function (req, res) {
  const response = {
    status: 0,
  }
  DB.GetDocument('pages', {}, {}, {}, function (err, result) {
    if (err) {
      res.send(response);
    } else {
      response.status = 1;
      response.data = result;
      response.count = result.length;
      res.send(response);
    }
  });
});

Router.post('/viewPage', function (req, res) {
  const response = {
  }
  DB.GetOneDocument('pages', { _id: req.body.id }, {}, {}, function (err, result) {
    if (err) {
      res.send(response);
    } else {
      response.title= result.title;
      response.description=result.description;
      response.status=result.status;
      response.id=result.id;
      res.send(response);
    }
  });
});

Router.post('/addUpdatePage', function (req, res) {
  const response = {
    status: 0,
    message: 'Something went wrong in your code!'
  }
  req.checkBody('title', 'title is required.').notEmpty();
  req.checkBody('description', 'description is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const pageFormData = {
    title: HELPERFUNC.Capitalize(title),
    description: HELPERFUNC.Capitalize(description),
    status: status
  }
  if (!req.body.id) {
    DB.GetOneDocument('pages', { title: title }, {}, {}, function (err, result) {
      if (result) {
        response.status = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('pages', pageFormData, function (err, result1) {
          if (err) {
            res.send(response);
          } else {
            response.status = 1;
            response.message = 'Page added successfully';
            response.id = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('pages', { _id: req.body.id }, pageFormData, function (err, result) {
      if (err) {
        res.send(response);
      } else {
        DB.GetOneDocument('pages', { _id: req.body.id }, {}, {}, function (err, result1) {
          if (err) {
            res.send(response);
          } else {
            const pageData = {
              id: result1._id,
              title: result1.title,
              description: result1.description,
              status: result1.status
            }
            response.status = 1;
            response.message = 'Page updated successfully';
            response.data = pageData;
            res.send(response);
          }
        });
      }
    });
  }
})

Router.post('/deletePage', function (req, res) {
  const response = {
    status: 0,
    message: 'Something went wrong in your code!'
  }
  DB.DeleteDocument('pages', { _id: req.body.id }, function (err, result) {
    if (err) {
      res.send(response);
    } else {
      DB.GetDocument('pages', {}, {}, {}, function (err, result) {
        if (err) {
          res.send(response);
        } else {
          response.status = 1;
          response.message = 'Page deleted successfully';
          response.data = result;
          response.count = result.length;
          res.send(response);
        }
      });
    }
  });
})

module.exports = Router;
