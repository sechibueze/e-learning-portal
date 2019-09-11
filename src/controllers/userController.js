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
  return res.render('signup', { status: 'error', message: req.flash('message') });
});

router.get('/login', (req, res) => {
  return res.render('login', { message: req.flash('message') });
});


router.get('/profile', (req, res) => {

  if (req.user) {
    //user is logged in
    let data = req.user;
    delete data['password'];
    console.log('sending data : ', data);
    return res.render('profile', {
      message: `${req.flash('message')} Welcome ${req.user.firstname}`,
      data
    },
    );
  } else {
    return res.redirect('/');
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
], Validation.handleLoginErrors,
  passport.authenticate('local-login', { successRedirect: '/auth/profile', failureRedirect: '/auth/login', failureFlash: true })
);



export default router;