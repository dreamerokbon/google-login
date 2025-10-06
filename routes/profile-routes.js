const router = require("express").Router();
const passport = require("passport");
const Post = require("../models/post-model");

const authCeck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCeck, async (req, res) => {
  console.log("進入profile頁面");
  let postFound = await Post.find({ author: req.user._id });
  return res.render("profile", { user: req.user, posts: postFound }); //deserializeUser會將req.user設定為找到的用戶
});

router.get("/post", authCeck, (req, res) => {
  return res.render("post", { user: req.user });
});

router.post("/post", authCeck, async (req, res) => {
  let { title, content } = req.body;

  let newPost = new Post({
    title,
    content,
    author: req.user._id,
  });
  try {
    await newPost.save();
    return res.redirect("/profile");
  } catch (e) {
    console.log(e);
    req.flash("error_msg", "標題與內容都需要填寫!");
    res.redirect("/profile/post");
  }
});

module.exports = router;
