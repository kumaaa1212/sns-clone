const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
// Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("The post has been updated");
    } else {
      return res.status(403).json("You can update only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("削除に成功");
    } else {
      return res.status(403).json("You can update only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json("取得に成功");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿にいいね
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("投稿にいいね");
    } else {
      // 投稿にすでにいいね
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(403).json("いいね外す");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
// タイムラインの投稿を取得

router.get("/timeline/all", async(req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/timeline/:id", async(req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    return res.status(200).json(userPosts);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/profile/:username", async(req, res) => {
  try {
    const user = await User.findOne({username:req.params.username});
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/profile/:id", async(req, res) => {
  try {
    const user = await User.findOne({username:req.params.id});
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// concat配列を繋げる
// スプレッドにする理由は、friendPostsがmapで一つずつ取り出しているから
// awaitで追加いたいものがすでにawaitで使われている時はPromise.allを使う
// timeline/allここをtimelineだけにしてしまうと:idt一致してしまう
module.exports = router;
