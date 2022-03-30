const express = require('express');
const Router = express.Router();
const DB = require('../../models/db');
const HELPERFUNC = require('../../models/commonfunctions');
var mongoose = require('mongoose');

Router.get('/listNewsletter', function (req, res) {
  const response = {
    status: 0,
  }
  DB.GetDocument('newsletter', {}, {}, {}, function (err, result) {
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

Router.post('/viewNewsletter', function (req, res) {
  const response = {
  }
  DB.GetOneDocument('newsletter', { _id: req.body.id }, {}, {}, function (err, result) {
    if (err) {
      res.send(response);
    } else {
      response.name= result.name;
      response.subject=result.subject;
      response.template=result.template;
      response.status=result.status;
      response.id=result.id;
      res.send(response);
    }
  });
});
Router.post('/deleteNewsletter', function (req, res) {
  const response = {
    status: 0,
    message: 'Something went wrong in your code!'
  }
  DB.DeleteDocument('newsletter', { _id: req.body.id }, function (err, result) {
    if (err) {
      res.send(response);
    } else {
      DB.GetDocument('newsletter', {}, {}, {}, function (err, result) {
        if (err) {
          res.send(response);
        } else {
          response.status = 1;
          response.message = 'Newsletter deleted successfully';
          response.data = result;
          response.count = result.length;
          res.send(response);
        }
      });
    }
  });
})

Router.post('/addUpdateNewsletter', function (req, res) {
  const response = {
    status: 0,
    message: 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('subject', 'subject is required.').notEmpty();
  req.checkBody('template', 'template is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors });
    console.log("error",errors);
  }
  const name = req.body.name;
  const subject = req.body.subject;
  const template = req.body.template;
  const status = req.body.status;
  const newsletterFormData = {
    name: HELPERFUNC.Capitalize(name),
    subject: HELPERFUNC.Capitalize(subject),
    template: HELPERFUNC.Capitalize(template),
    status: status
  }
  if (!req.body.id) {
    DB.GetOneDocument('newsletter', { name: name }, {}, {}, function (err, result) {
      if (result) {
        response.status = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
        res.send(response);
      } else {
        DB.InsertDocument('newsletter', newsletterFormData, function (err, result1) {
          if (err) {
            res.send(response);
          } else {
            response.status = 1;
            response.message = 'Newsletter added successfully';
            response.id = result1._id;
            res.send(response);
          }
        });
      }
    });
  }
  else {
    DB.FindUpdateDocument('newsletter', { _id: req.body.id }, newsletterFormData, function (err, result) {
      if (err) {
        res.send(response);
      } else {
        DB.GetOneDocument('newsletter', { _id: req.body.id }, {}, {}, function (err, result1) {
          if (err) {
            res.send(response);
          } else {
            const newsletterData = {
              id: result1._id,
              name: result1.name,
              subject: result1.subject,
              template: result1.template,
              status: result1.status
            }
            response.status = 1;
            response.message = 'Newsletter updated successfully';
            response.data = newsletterData;
            res.send(response);
          }
        });
      }
    });
  }
})
module.exports = Router;