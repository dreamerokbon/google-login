const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local");

passport.serializeUser((user, done) => {
  console.log("成功進入serializeUser區域");
  console.log(user);
  done(null, user.id); //儲存用戶ID到session，並且將ID簽名後以coockie的形式傳給使用者。
});

passport.deserializeUser(async (_id, done) => {
  console.log("成功進入deserializeUser區域");
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); //將req.user設定為找到的用戶foundUser
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        process.env.GOOGLE_CALLBACK_URL_LOCAL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("成功進入googleStrategy區域");
      //   console.log(profile);
      //   console.log("=====================================================");
      let foundUser = await User.findOne({ googleID: profile.id });
      if (foundUser) {
        console.log("使用者已經註冊過，無須存入資料庫");

        return done(null, foundUser);
      } else {
        console.log("新用戶未註冊過，需存入資料庫");

        let newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
        });
        let savedUser = await newUser.save();

        console.log("成功創建新用戶");

        return done(null, savedUser);
      }
    }
  )
);

passport.use(
  new localStrategy(async (username, password, done) => {
    let foundUser = await User.findOne({ email: username });
    if (!foundUser) {
      console.log("用戶不存在");
      return done(null, false);
    } else {
      let isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        console.log("密碼正確");
        return done(null, foundUser);
      } else {
        console.log("密碼錯誤");
        return done(null, false);
      }
    }
  })
);

module.exports = passport;
