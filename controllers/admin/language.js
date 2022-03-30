// const express       = require('express');
// const Router        = express.Router();
// const DB            = require('../../models/db');
// const HELPERFUNC    = require('../../models/commonfunctions');
// var mongoose        = require('mongoose');

// Router.get('/listLanguages',function(req,res) {
//   const response = {
//     status  : 0,
//   }
//   DB.GetDocument('languages',{}, {}, {}, function(err, result) {
//       if(err) {
//           res.send(response);
//       } else {
//           response.status  = 1;
//           response.data    = result;
//           response.count   = result.length;
//           res.send(response);
//       }
//   });
// });

// Router.post('/viewLanguages',function(req,res) {
//   const response = {

//   }
//   DB.GetOneDocument('languages',{_id:req.body.id}, {}, {}, function(err, result) {
//       if(err) {
//           res.send(response);
//       } else {
//         response.name= result.name;
//         response.code=result.code;
//         response.status=result.status;
//         response.id=result.id;
//           res.send(response);
//       }
//   });
// });

// Router.post('/addUpdateLanguages',function(req,res) {
//   const response = {
//     status  : 0,
//     message : 'Something went wrong in your code!'
//   }
//   req.checkBody('name', 'name is required.').notEmpty();
//   req.checkBody('code', 'code is required.').notEmpty();
//   var errors = req.validationErrors();
//   if (errors) {
//     return res.status(422).json({ errors: errors});
//   }
//   const name = req.body.name;
//   const code   = req.body.code;
//   const status   = req.body.status;
//   const languageFormData = {
//     name  : HELPERFUNC.Capitalize(name),
//     code    : HELPERFUNC.UpperCase(code),
//     status    : status
//   }
//   if(!req.body.id){
//     DB.GetOneDocument('languages', {name:name}, {}, {}, function(err, result) {
//       if(result){
//         response.status  = 0;
//         response.message = 'Data you have entered is already exist!';
//         res.send(response);
//       } else {
//         DB.InsertDocument('languages', languageFormData, function(err, result1) {
//       if(err) {
//             res.send(response);
//           } else {
//             response.status  = 1;
//             response.message = 'Language added successfully';
//             response.id      = result1._id;
//             res.send(response);
//           }
//         });
//       }
//     });
//   } else {
//     DB.FindUpdateDocument('languages',{_id:req.body.id}, languageFormData, function(err, result) {
//       if(err) {
//         res.send(response);
//       } else {
//         DB.GetOneDocument('languages', {_id:req.body.id}, {}, {}, function(err, result1) {
//             if(err) {
//                 res.send(response);
//             } else {
//                   const languageData = {
//                     id         : result1._id,
//                     name   : result1.name,
//                     code     : result1.code,
//                     status     : result1.status
//                   }
//                   response.status  = 1;
//                   response.message = 'Language updated successfully';
//                   response.data    = languageData;
//                 res.send(response);
//             }
//         });
//       }
//     });
//   }
// })

// Router.post('/deleteLanguage',function(req,res) {
//   const response = {
//     status  : 0,
//     message : 'Something went wrong in your code!'
//   }
//   DB.DeleteDocument('languages', {_id:req.body.id}, function(err, result) {
//       if(err) {
//           res.send(response);
//       } else {
//         DB.GetDocument('languages', {}, {}, {}, function(err, result) {
//             if(err) {
//                 res.send(response);
//             } else {
//                   response.status  = 1;
//                   response.message = 'Language deleted successfully';
//                   response.data    = result;
//                   response.count   = result.length;
//                   res.send(response);
//             }
//         });
//       }
//   });
// })

// module.exports = Router;




const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');

Router.get('/listLanguages',function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('languages',{}, {}, {}, function(err, result) {
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

Router.post('/viewLanguages',function(req,res) {
  const response = {

  }
  DB.GetOneDocument('languages',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        response.name= result.name;
        response.code=result.code;
        response.status=result.status;
        response.id=result.id;
          res.send(response);
      }
  });
});

Router.post('/addUpdateLanguages',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('code', 'code is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = req.body.name;
  const code   = req.body.code;
  const status   = req.body.status;
  const languageFormData = {
    name  : HELPERFUNC.Capitalize(name),
    code    : HELPERFUNC.UpperCase(code),
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('languages', {name:name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('languages', languageFormData, function(err, result1) {
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Lanuage added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('languages',{_id:req.body.id}, languageFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('languages', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const languageData = {
                    id         : result1._id,
                    name   : result1.name,
                    code     : result1.code,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Language updated successfully';
                  response.data    = languageData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteLanguage',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('languages', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('languages', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Language deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;
