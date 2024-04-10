const Post = require("../models/postModel");
const User = require("../models/userModel");
const Reply = require("../models/replyModel");

const router = require("express").Router();

router.get("/allposts", async (req, res, next) => {
  try {
    //console.log("backend");
    const allPosts = await Post.find();
    // console.log("backend");
    // console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (ex) {
    next(ex);
  }
});

router.get("/allposts/:postId", async (req, res, next) => {
  try {
    // console.log("Reply");
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId }).populate("replies");

    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }

    const populatedPost = {
      _id: post._id,
      text: post.text,
      username: post.username,
      replies: post.replies.map((reply) => ({
        _id: reply._id,
        text: reply.text,
        username: reply.username,
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
    const text = req.body.text;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ status:false, msg: "User not found" });
    }
    // console.log(text);
    // console.log(username);
    const post = await Post.create({
      text,
      username,
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
    await Reply.deleteMany({ _id: { $in: post.replies } });

    await Post.deleteOne({ _id: postId });

    return res.json({ status: true, msg: "Post deleted successfully" });

  } catch (ex){
    next(ex);
  }
})

router.post("/deletereply", async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const replyId = req.body.replyId;
    const reply = await Reply.findOne({ _id: replyId });
    if (!reply) {
      return res.status(404).json({ status: false, msg: "Reply not found" });
    }
    await Reply.deleteOne({ _id: replyId });

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }
    post.replies = post.replies.filter((id) => id.toString() !== replyId);
    await post.save();
    return res.json({ status: true, msg: "Reply deleted successfully" });
  } catch (ex) {
    next(ex);
  }
});


module.exports = router;
