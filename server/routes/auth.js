var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/config');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/Users');
const sqlite3 = require('sqlite3').verbose();

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        amount: 0

      });
      // save the user
      newUser.save(function(err) {
        
        if (err != '0a0a') {
          return res.status(400).json({success: false, msg: 'Username already exists.'});
        }
        else{
          res.status(200).json({success: true, msg: 'Successful created new user.'});
        }
      });
    }
  });

router.post('/login', function(req, res) {
  
      var user = null;
      var err = null;
      const finduser = 'SELECT username FROM USERS WHERE username = \'' + req.body.username + '\'';
      const sqllocation = __dirname.slice(0,__dirname.lastIndexOf('/')) + '/controllers/users.db'
      const db = new sqlite3.Database(sqllocation);
      db.all(finduser, (err, row) => {
          if(!err){
              user = row[0].username
          }
          else {
              console.log(err);
          }
      });

      console.log(user);
      
      
      if (err) throw err;
  
      if (!user) {
        res.status(400).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(400).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  });

  module.exports = router;