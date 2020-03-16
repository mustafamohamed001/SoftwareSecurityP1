var settings = require('../config/config');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcrypt-nodejs');

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
      res.status(400).json({success: false, msg: 'Please pass username, email, and password.'});
    } 
    else {
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          res.status(400).json({success: false, msg: 'Salt cannot generate'});
        }
        bcrypt.hash(password, salt, null, function (err, hash) {
            if (err) {
              res.status(400).json({success: false, msg: 'Hash unsuccessful'});
            }
            password = hash;

            //========= adding new user info to database ===================
                const insertuser = 'INSERT INTO USERS (username, password, email, amount) VALUES (' + '\'' + username + '\'' + ', ' + '\'' + password + '\'' + ', ' + '\'' +  email + '\'' + ', ' + 0 + ')';
                const sqllocation = __dirname.slice(0,__dirname.lastIndexOf('/')) + '/controllers/users.db'
                const db = new sqlite3.Database(sqllocation);
                db.all(insertuser, (err, rows) => {
                    if (!err) {
                        console.log('User has been inserted!');
                        res.status(200).json({success: true, msg: 'Successful created new user.'});
                    }
                    else {
                        console.log(err);
                        res.status(400).json({success: false, msg: 'Username already exists.'});
                    }
                });
            //======================= end ===========================
        });
      });
    }
});

router.post('/login', function(req, res) {
  var user = null;
  var err = null;
  const finduser = 'SELECT username FROM USERS WHERE username = \'' + req.body.username + '\'';
  const sqllocation = __dirname.slice(0,__dirname.lastIndexOf('/')) + '/controllers/users.db'
  const db = new sqlite3.Database(sqllocation);
  db.all(finduser, (err, userrow) => {
      if(!err){
        if (userrow.length == 0) {
          res.status(400).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else {
          user = userrow[0].username;

          // check if password matches
          const findpass = 'SELECT password FROM USERS WHERE username = \'' + req.body.username + '\'';
          db.all(findpass, (err, passrow) => {
            if(!err){
              bcrypt.compare(req.body.password, passrow[0].password, function (err, isMatch) {
                if (isMatch && !err) {
                  // if user is found and password is right create a token
                  var token = jwt.sign({username:user}, settings.secret, {expiresIn: '1h'});
                  // return the information including token as JSON
                  res.status(200).json({success: true, token: 'JWT ' + token});
                }
                else{
                  console.log(err);
                  res.status(400).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
              }); 
            }
            else{
              console.log(err);
              res.status(400).send({success: false, msg: 'Authentication failed.'});
            }
          });
        }
      }
  });
});

  module.exports = router;