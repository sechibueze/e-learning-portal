import express from 'express';
import passport from 'passport';
import { check } from 'express-validator';
import Validation from '../middlewares/validation';
import debug from 'debug';
import Users from '../model/users';
const logger = debug('userController:');
const router = express.Router();

router.get('/users', (req, res) => {
  Users.find({}, (err, users) => {
    res.json({
      data: users
    });
  })
});
router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('message') });
});

router.get('/profile', (req, res) => {

  if (req.user) {
    //user is logged in
    res.render('profile', { message: `Welcome ${req.user.firstname}` });
  } else {
    res.redirect('/');
  }

});
router.post('/signup', [
  check('firstname').isString().isLength({ min: 1 }).withMessage('Firstname field cannot be empty'),
  check('lastname').isString().isLength({ min: 1 }).withMessage('Lastname field cannot be empty'),
  check('email').isEmail().withMessage('Enter a valid email'),
  check('password').isLength({ min: 5 }).withMessage('password must be at least 5 characters')
], Validation.handleSignupErrors, passport.authenticate('local-signup', {
  successRedirect: '/auth/profile',
  failureRedirect: '/auth/signup',
  failureFlash: true
}));




router.post('/login', [
  check('email').isEmail().withMessage('Email is required'),
  check('password').isString().isLength({ min: 5 }).withMessage('Password is required')
], Validation.handleErrors,
  passport.authenticate('local-login', { failureFlash: true }),
  (req, res, next) => {
    // console.log('req', req.login);
    return res.status(401).json({
      message: req.flash('message'),
      data: req.user
    });
  });



export default router;