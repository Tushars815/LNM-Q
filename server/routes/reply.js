const Reply = require("../models/replyModel");
const Post = require("../models/postModel");

const router = require("express").Router();


router.post("/addreply", async (req, res, next) => {
    try {
      //  console.log("reply add");
        const username = req.body.currusername;
        const text = req.body.text;
        const postId= req.body.postId;
       // console.log(postId);
        const post = await Post.findOne({ _id: postId });
        const reply= await Reply.create({
            text,
            username
          });
      //  console.log(reply.createdAt);
        post.replies.push(reply._id);
        await post.save();
        return res.json({status: true});
    } catch (ex) {
      next(ex);
    }
  });

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
