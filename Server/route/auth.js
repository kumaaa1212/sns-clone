const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/register',async(req,res) =>{
  try{
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    await user.save();
    return res.status(200).json(newUser);
  }
  catch(err){
    return res.status(500).json(err);
  }
})
router.post('/login',async(req,res) =>{
  try{
    const user = await User.findOne({email: req.body.email});
    if(!user){return res.status(404).json('User not found');}
    const validPassword = req.body.password === user.password;
    if(!validPassword){return res.status(400).json('Wrong password');}
    return res.status(200).json(user);
  }
  catch(err){
    return res.status(500).json(err);

  }
})
module.exports = router;

// 普通の通信であればsendで送るが、jsonで送る場合はjsonを使う
// registerであれば、この時のURLの時に送られたものをがひとまとまり
