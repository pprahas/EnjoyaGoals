import GoogleStrategy from "passport-google-oauth20";
import config from "../../server/app";
import User from "../api/model/user.model";

const googleAuth = (passport) => {
  GoogleStrategy.Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, callback) => {
        const userObj = {
          googleId: profile.id,
          displayName: profile.displayName,
          gmail: profile.emails[0].value,
          image: profile.photos[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return callback(null, user);
        }

        User.create(userObj)
          .then((user) => {
            return callback(null, user);
          })
          .catch((err) => {
            return callback(err.message);
          });
      }
    )
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      callback(err, user);
    });
  });
};

export { googleAuth };