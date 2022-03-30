const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
Router.post('/listConfigOption',function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('configOption',{parentID:req.body.parentId}, {}, {}, function(err, result) {
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

Router.post('/viewConfigOption',function(req,res) {
  const response = {    
  }
  DB.GetOneDocument('configOption',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.name= result.name;
          response.slug=result.slug;
          response.description=result.description;
          response.status=result.status;
          response.id=result.id;
          res.send(response);
      }
  });
});

Router.post('/addUpdateConfigOption',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('slug', 'slug is required.').notEmpty();
  req.checkBody('sort', 'sort is required.').notEmpty();
  req.checkBody('parentId', 'parentId is required.').notEmpty();
  req.checkBody('description', 'description is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = req.body.name;
  const slug = req.body.slug;
  const sort = req.body.sort;
  const parentID = req.body.parentId;
  const description = req.body.description;
  const status   = req.body.status;
  const configOptionFormData = {
    name  : HELPERFUNC.Capitalize(name),
    slug    : HELPERFUNC.Capitalize(slug),
    sort    : sort,
    parentID    : parentID,
    description    : HELPERFUNC.Capitalize(description),
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('configOption', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('configOption', configOptionFormData, function(err, result1) {
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Config Options added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('configOption',{_id:req.body.id}, configOptionFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('configOption', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const configData = {
                    id         : result1._id,
                    name   : result1.name,
                    sort :result1.sort,
                    parentID:result1.parentID,
                    slug   : result1.slug,
                    description : result1.description,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Config options updated successfully';
                  response.data    = configData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteConfigOption',function(req,res) {
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
