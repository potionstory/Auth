const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'potionstory',
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Google Login</a>');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) { next(err); }
    if (!user) {
      res.status(401);
      res.json({
        type: 'info',
        message: 'login fall',
      });
      return;
    }
    req.login(user, (err) => {
      if (err) { next(err); }
      res.status(200);
      res.json({
        type: 'info',
        message: 'login success',
      });
      return;
    });
  })(req, res, next);}
);

passport.use(new GoogleStrategy({
    clientID: '1075170310958-gpgui21b62fi1vs1nd9s44nqg7griqku.apps.googleusercontent.com',
    clientSecret: 'NMNThti3pwQMfaZJ9QlRF3Sq',
    callbackURL: 'http://localhost:3000',
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const userInfo = {
    user,
    info: 'test message',
  };
  done(null, userInfo);
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.status(401);
  res.json({});
};

app.get('/session', ensureAuthenticated, (req, res) => {
  let userInfo = req.user;
  console.log(userInfo);
  res.json({
    type: 'info',
    message: 'session OK!',
    admin: userInfo.user.admin,
  });
});

app.listen(port, () => {
  console.log(`server port on ${port}`);
});