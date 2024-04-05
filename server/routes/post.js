const Post = require("../models/postModel");
const User = require("../models/userModel");

const router = require("express").Router();

router.get("/allposts", async (req, res, next) => {
    try {
        const allPosts = await Post.find();
        // console.log("backend");
        // console.log(allPosts);
        res.status(200).json(allPosts);
    } catch (ex) {
      next(ex);
    }
  });

router.post("/addpost", async (req, res, next) => {
    try {
        const username = req.body.username;
        const text = req.body.text;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // console.log(text);
        // console.log(username);
        const post = await Post.create({
            text,
            username
          });
         user.posts.push(post._id);
         await user.save();
        
        return res.json({ status: true, post });
    } catch (ex) {
      next(ex);
    }
  });

module.exports = router;
