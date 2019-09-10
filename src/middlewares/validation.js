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

  static handleErrors(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // console.log('errors : ', errors);
      // req.flash('message', )
      return res.status(500).json({
        status: 'error',
        errors: errors.errors.map(err => err.msg)
      });
    }

    // if control gets here => no errors
    next(); //pass control to passport
  }


}