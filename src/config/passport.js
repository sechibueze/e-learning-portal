import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import debug from 'debug';
const logger = debug('passportConfig');
import User from '../model/users';


const config = (passport) => {

  // Stores user in the session
  passport.serializeUser((user, done) => {
    logger('serializeUser:', user);
    done(null, user._id);//store the _id
  });

  // Pull User out of session
  passport.deserializeUser((userId, done) => {
    logger('deSerializeUser:', userId);
    User.findOne({ _id: userId }, (err, user) => {
      if (user) {
        // Send back user WITHOUT password
        user['password'] = null;
        return done(null, user);
      }

      return done(err);
    });

  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //pass the req 
  },
    (req, email, password, done) => {



      User.findOne({ email }, (err, user) => {

        if (err) {
          return done(err);
        }

        // check if user already exists

        if (user) {

          return done(null, false, req.flash('message', 'User already exists'));
        }

        //Save the user
        const newStudent = new User(req.body);
        newStudent.save((err) => {
          if (err) throw err;

          return done(null, newStudent, req.flash('message', 'User signup successful'));
        });


      });

    }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    

    User.findOne({ email }, (err, user) => {
      console.log('founc:', err, user);
      if (err) {
        return done(err);
      }

      if (user) {
        // Check if password match
        console.log('found user: ', err, user);

        bcrypt.compare(password, user.password, (err, same) => {
          if (err) return done(err);

          if (same) {
            return done(null, user, req.flash('message', 'Successfully logged in'))
          } else {
            return done(null, false, req.flash('message', 'Email/Password invalid'));
          }
        });

      }

      if (!user) {
        //No error but User not found: user === null
        return done(null, false, req.flash('message', 'Record not Found, please Sign Up'));
      }


    });

  }));
};
export default config;