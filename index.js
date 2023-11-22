const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//inicializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewars
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecresapp',
    resave: true,
    saveUninitialized: true
}));

//global variables

//routes
app.use(require('./src/routes/index'));
app.use(require('./src/routes/notes'));
app.use(require('./src/routes/users'));

//statics files
app.use(express.static(path.join(__dirname, 'src/public')));

//server is listening
app.listen(app.get('port'), () => {
    console.log("server on port " + app.get('port'));
});