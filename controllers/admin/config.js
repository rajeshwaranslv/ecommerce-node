const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
Router.get('/listConfig',function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('config',{}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = 1;
          response.data    = result;
          response.count   = result.length;
          res.send(response);
      }
  });
});

Router.post('/viewConfig',function(req,res) {
  const response = {    
  }
  DB.GetOneDocument('config',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        response.id=result._id;
          response.name= result.name;
          response.slug=result.slug;
          response.description=result.description;
          response.status=result.status;
          res.send(response);
      }
  });
});

Router.post('/addUpdateConfig',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('slug', 'slug is required.').notEmpty();
  req.checkBody('description', 'description is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = req.body.name;
  const slug = req.body.slug;
  const description = req.body.description;
  const status   = req.body.status;
  const configFormData = {
    name  : HELPERFUNC.Capitalize(name),
    slug    : HELPERFUNC.Capitalize(slug),
    description    : HELPERFUNC.Capitalize(description),
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('config', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('config', configFormData, function(err, result1) {
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Config added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('config',{_id:req.body.id}, configFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('config', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const configData = {
                    id         : result1._id,
                    name   : result1.name,
                    slug   : result1.slug,
                    description : result1.description,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Config updated successfully';
                  response.data    = configData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteConfig',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('config', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('config', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Config deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;
