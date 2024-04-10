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
      //  console.log(post);
        post.replies.push(reply._id);
        await post.save();
        return res.json({status: true});
    } catch (ex) {
      next(ex);
    }
  });


module.exports = router;
