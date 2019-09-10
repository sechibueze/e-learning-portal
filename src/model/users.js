import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String }
});

// Don not use arrow functions 
userSchema.pre('save', function (next) {
  const user = this;
  // Only new or changed password should be hashed
  if (!user.isModified()) return next();
  const saltRound = 10;
  // Hash the password
  bcrypt.hash(user.password, saltRound, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });

});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, match) => {
    //match can be true or false
    if (err) return cb(err);
    cb(null, match);
  })
};

export default mongoose.model('user', userSchema, 'users');