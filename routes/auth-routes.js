const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  return res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      res.send(err);
    } else {
      return res.redirect("/");
    }
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { user: req.user });
});

router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  if (password.length < 8) {
    console.log("密碼至少要8個字元");

    req.flash("error_msg", "密碼至少要8個字元，請重新輸入。");
    return res.redirect("/auth/signup");
  }

  //確認信箱是否被註冊過
  let foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    console.log("信箱已被註冊過");

    req.flash(
      "error_msg",
      "信箱已被註冊過，請重新輸入新的信箱，或以此信箱登入系統。"
    );
    return res.redirect("/auth/signup");
  }

  //註冊
  let hashedPassword = await bcrypt.hash(password, 12);
  let newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  console.log("成功註冊新用戶");
  req.flash("success_msg", "恭喜你!成功註冊新用戶!你可以用新帳號登入了!");
  return res.redirect("/auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "帳號或密碼輸入錯誤，請重新輸入。",
  }),
  (req, res) => {
    return res.redirect("/profile");
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log("進入redirect");
  return res.redirect("/profile");
});

module.exports = router;
