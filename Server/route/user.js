const express = require('express');
const router = express.Router();
const User = require('../models/User');
module.exports = router;


// CRUD
// ユーザー情報の編集

// ユーザー情報の更新
router.put('/:id', async(req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      return res.status(200).json('Account has been updated');
    }
    catch(err){
      return res.status(500).json(err);
    }
    }
  else{
    return res.status(500).json('Something went wrong');
  }
});
// $setは全てのスキーマーの要素ってこと.
// Putメソッドは更新というよりは置換
// Patchメソッドは既存のリソースを更新・変更・修正

// ユーザー情報の削除
router.delete('/:id', async(req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await User.findOneAndDelete(req.params.id)
      return res.status(200).json('Account has been delete');
    }
    catch(err){
      return res.status(500).json(err);
    }
    }
  else{
    return res.status(500).json('Something went wrong');
  }
});
// ユーザー情報の取得
router.get('/', async(req, res) => {
  const userId = req.query.userId;
  // ?userId=123とかの123の所
  const username = req.query.username;
    try{
      const user = userId ? await User.findById(userId) : await User.findOne({username: username});
      const {password, updatedAt, ...other} = user._doc;
      // これでそれぞれを取得して、必要な情報だけを取得することができる
      return res.status(200).json(other);
    }
    catch(err){
      return res.status(500).json(err);
    }
});

// user._docで全ての情報ってこと

// ユーザーのフォロー
// Putを使う。情報の更新があるから
router.put('/:id/follow', async(req, res) => {
  if(req.body.userId !== req.params.id){
    try{
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if(!user.followers.includes(req.body.userId)){
      await user.updateOne({$push: {followers: req.body.userId}});
      await currentUser.updateOne({$push: {followings: req.params.id}});
      return res.status(200).json('成功');
    }
    else{
      return res.status(403).json('You already follow this user');
    }
    }
    catch(err){
      return res.status(500).json(err);
    }
}
else{
  return res.status(403).json('You cant follow yourself');
}
})

// $pushは配列に追加するという意味


// ユーザーのフォロー解除
router.put('/:id/unfollow', async(req, res) => {
  if(req.body.userId !== req.params.id){
    try{
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if(user.followers.includes(req.body.userId)){
      await user.updateOne({$pull: {followers: req.body.userId}});
      await currentUser.updateOne({$push: {followings: req.params.id}});
      return res.status(200).json('解除に成功');
    }
    else{
      return res.status(403).json('You already follow this user');
    }
    }
    catch(err){
      return res.status(500).json(err);
    }
}
else{
  return res.status(403).json('You cant follow yourself');
}
})
// pullは配列から削除するという意味

