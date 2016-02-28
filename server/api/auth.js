import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import _ from 'lodash';
import config from 'config';
import * as UserService from './service/user';

let facebook = config.get('facebook');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserService.getUser(id)
  .then(user => {
    done(null, user)
  });
});

passport.use(new FacebookStrategy({
    clientID: facebook.appId,
    clientSecret: facebook.appSecret,
    callbackURL: facebook.callbackURL,
    profileFields: facebook.profileFields
  },
  function(accessToken, refreshToken, profile, done) {
    UserService.replaceUser({
      id: profile.id,
      displayName: profile.displayName,
      profileUrl: profile.profileUrl,
      photos: profile.photos
    })
    .then(user => done(null, user));
  }
));

export default passport;
