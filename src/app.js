import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import morgan from 'morgan';
import debug from 'debug';
import path from 'path';
import dbConfig from './config/dbConfig';
console.log('Node env: ', process.env.NODE_ENV);
const logger = debug('app');
// mongoose.connect
mongoose.connect(dbConfig(), { useNewUrlParser: true }, (err) => {
  if (err) {
    return console.log('error connecting to mongoDB...', err);
  };
  logger('Connected to mongoDB...');
});
const app = express();
const port = process.env.PORT || 3000;

// Import 
import userController from './controllers/userController';
import passportConfig from './config/passport';
app.use(morgan('tiny'));
// Set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keepitsecret', saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());
// Static assests
app.use(express.static(path.join(__dirname, '/public')));
// views & view engine
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'ejs');
// set up passport before routing
passportConfig(passport);


// Routing
app.use('/auth', userController);
app.use('/dashboard', (req, res, next) => {
  logger('dashboard:user:', req.user);
  return res.status(200).json({
    message: req.flash('message'),
    data: req.user
  });
});
app.use('/', (req, res, next) => {
  return res.render('index', { message: req.flash('message') });
});

app.use((req, res, next) => {
  return res.status(200).json({
    error: '404 - Not Found'
  });
});

app.listen(port, () => {
  logger('App running on : ', port);
  console.log('App running on : ', port);
});