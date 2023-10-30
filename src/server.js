const express = require('express');
const path = require ('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Inits

const app = express();
require('./config/passport');

// Settings 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  });
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;