const Post = require("../models/postModel");
const User = require("../models/userModel");
const Reply = require("../models/replyModel");

const router = require("express").Router();

router.get("/allposts", async (req, res, next) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (ex) {
    next(ex);
  }
});

router.get("/allposts/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId }).populate("replies");
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }

    const populatedPost = {
      _id: post._id,
      text: post.text,
      topic: post.topic,
      username: post.username,
      userId: post.userId,
      createdAt: post.createdAt,
      replies: post.replies.map((reply) => ({
        _id: reply._id,
        text: reply.text,
        username: reply.username,
        userId: reply.userId,
        createdAt: reply.createdAt
      })),
    };
    //console.log(populatedPost);
    res.json(populatedPost);
  } catch (ex) {
    next(ex);
  }
});

router.post("/addpost", async (req, res, next) => {
  try {
    const username = req.body.currusername;
    const userId= req.body.currUserId;
    const {text,topic} = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ status:false, msg: "User not found" });
    }
    const post = await Post.create({
      text,
      topic,
      username,
      userId
    });
    user.posts.push(post._id);
    await user.save();

    return res.json({ status: true });
  } catch (ex) {
    next(ex);
  }
});

router.post("/deletepost", async(req,res,next) =>{
  try{
    const postId= req.body.postId;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ status:false, msg: "Post not found" });
    }
    const userId=post.userId;
    await Reply.deleteMany({ _id: { $in: post.replies } });
    
    await Post.deleteOne({ _id: postId });

    const user = await User.findOne({ _id: userId });
    if (!user) {
     return res.status(404).json({ status: false, msg: "User not found" });
    }
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    return res.json({ status: true, msg: "Post deleted successfully" });

  } catch (ex){
    next(ex);
  }
});




module.exports = router;
