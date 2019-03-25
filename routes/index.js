const express = require('express');
const router = express.Router();
//parola şifreleme
const bcrypt = require('bcryptjs');
//token
const jwt =require('jsonwebtoken');
//models
const User = require('../models/Users');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
//register

router.post('/register', (req, res, next) => {
  const {username, password} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user =new User({
      username,
      password : hash
    });
    const promise = user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err) =>{
      res.json(err);
    })
  });
});
//login
router.post('/authenticate',(req,res)=>{
  const {username, password} = req.body;
  User.findOne({
    username
  },(err, user)=>{
    if(err)
      throw err;
    if(!user) {
      res.json({
        status: false,
        message: 'authentication failed'
      });
    }else{
      bcrypt.compare(password, user.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:'password is wrong'
          });
        }else{
          const payload = {username};
          const token = jwt.sign (payload, req.app.get('api_secret_key'),{ expiresIn: 720 /*12saat*/ });
          res.json({status: true, token});
        }
      });
    }
  });
});

module.exports = router;
