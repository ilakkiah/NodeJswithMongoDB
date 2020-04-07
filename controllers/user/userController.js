var express = require('express');
var bodyParser = require('body-parser');
var userService = require('./../../services/user/service')

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/mydb";

var db;
class UserController {
  constructor() { }

  //////////////////////////////////////////////////////////////////////
  //                      Initilization at App Start                  //
  //////////////////////////////////////////////////////////////////////
  static init(app) {
    /* Initialize DB */

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, database) {
      if (err) throw err;
      console.log("Database created!");
      db = database.db('mydb')
    });

    const router = express.Router();

    // Install bodyParser parameters
    router.use(bodyParser.urlencoded({
      extended: true
    }));
    router.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.use('/user', router);

    // LIST All REST Endpoints 
    router.get('/getUsers', UserController.getAllUsers);
    router.post('/user', UserController.addNewUser);
    router.put('/user', UserController.updateUser);
    router.delete('/user', UserController.deleteUser);
  }

  //////////////////////////////////////////////////////////////////////
  //                      REST Endpoints Starts (static)              //
  //////////////////////////////////////////////////////////////////////

  /**
   * 
   */
  static getAllUsers(req, res) {
    userService.getAllUsers(db, function (returnvalue) {
      res.status(200).send(returnvalue);
    })

  }

  static addNewUser(req, res) {
    userService.addNewUser(db,req.body,function(returnValue){
      res.status(200).send(returnValue);
    });
    
  }
  static addNewUser(req, res) {
    userService.addNewUser(db,req.body,function(returnValue){
      res.status(200).send(returnValue);
    });
    
  }
  static updateUser(req, res) {
    userService.updateUser(db,ObjectId,req.query.id,req.body,function(returnValue){
      res.status(200).send(returnValue);
    });
  }
  static deleteUser(req,res) {
    console.log(req.query.id);
    userService.deleteUser(db,ObjectId,req.query.id,function(returnValue){
      res.status(200).send(returnValue);
    })
  }
}

module.exports = UserController.init;