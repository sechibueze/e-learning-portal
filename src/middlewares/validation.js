import { validationResult } from 'express-validator';
// const constraint = ;
export default class Validation {


  static handleSignupErrors(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //re=render signup page with error messages
      return res.render('signup', {
        status: 'error',
        message: errors.errors.map(err => err.msg)
      });
    }

    // if control gets here => no errors
    next(); //pass control to passport
  }

  static handleLoginErrors(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //re=render login page with error messages
      return res.render('login', {
        status: 'error',
        message: errors.errors.map(err => err.msg)
      });
    }

    // if control gets here => no errors
    next(); //pass control to passport
  }

}