const express = require('express');
const Router = express.Router();
const DB = require("../../models/db")
const HELPERFUNC = require('../../models/commonfunctions');
var mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|jfif)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

Router.post('/addUpdateImage', imageUpload.single('image'), (req, res)=> {
    console.log(req.file,"req.filename");
    const response = {
        status: 0,
        message: 'Something went wrong in your code!'
    }
    req.checkBody('category', 'category is required.').notEmpty();
    req.checkBody('status', 'status is required.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({ errors: errors });
    }
    const category = req.body.category;
    const filename = req.file.filename;
    const status = req.body.status;
    const formData = {
        category: HELPERFUNC.Capitalize(category),
        filename: filename,
        status: status
    }
    if (!req.body.id) {
        DB.GetOneDocument('image', { category: category }, {}, {}, function (err, result) {
            if (result) {
                response.status = 0;
                response.message = 'Data you have entered is already exist!';
                res.send(response);
            } else {
                DB.InsertDocument('image', formData, function (err, result1) {
                    console.log(err);
                    if (err) {
                        res.send(response);
                    } else {
                        response.status = 1;
                        response.message = 'Image added successfully';
                        response.id = result1._id;
                        res.send(response);
                    }
                });
            }
        });
    } else {
        DB.FindUpdateDocument('image', { _id: req.body.id }, formData, function (err, result) {
            if (err) {
                res.send(response);
            } else {
                DB.GetOneDocument('image', { _id: req.body.id }, {}, {}, function (err, result1) {
                    if (err) {
                        res.send(response);
                    } else {
                        const Data = {
                            id: result1._id,
                            category: result1.category,
                            filename: result1.filename,
                            status: result1.status
                        }
                        response.status = 1;
                        response.message = 'Image updated successfully';
                        response.data = Data;
                        res.send(response);
                    }
                });
            }
        });
    }
})


Router.get('/listImages', function (req, res) {
    const response = {
        status: 0,
    }
    DB.GetDocument('image', {}, {}, {}, function (err, result) {
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
Router.post('/viewImage', function (req, res) {
    const response = {
        status: 0,
    }
    DB.GetOneDocument('image', { _id: req.body.id }, {}, {}, function (err, result) {
        if (err) {
            res.send(response);
        } else {
            // response.status  = 1;
            response.status = 1;
            response.data = result;
            response.count = result.length;

            res.send(response);
        }
    });
});
Router.post('/deleteImage', function (req, res) {
    const response = {
        status: 0,
        message: 'Something went wrong in your code!'
    }
    DB.DeleteDocument('image', { _id: req.body.id }, function (err, result) {
        if (err) {
            res.send(response);
        } else {
            DB.GetDocument('image', {}, {}, {}, function (err, result) {
                if (err) {
                    res.send(response);
                } else {
                    response.status = 1;
                    response.message = 'Image deleted successfully';
                    response.data = result;
                    response.count = result.length;
                    res.send(response);
                }
            });
        }
    });
})

module.exports = Router;