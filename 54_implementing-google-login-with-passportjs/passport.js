import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUri = process.env.GOOGLE_REDIRECT_URL

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: redirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
