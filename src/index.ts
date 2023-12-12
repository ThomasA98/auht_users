import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import path from 'path';
import { BaseRouter } from './routes/base';
import { NotesRouter } from './routes/notes';
import { UsersRouter } from './routes/users';
import { AuthDefault } from './routes';

import env from './env'

//initialization
const app = express();

//settings
app.set('port', env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecresapp',
    resave: true,
    saveUninitialized: true
}));

//global variables

//routes
app.use(BaseRouter);
app.use('/auth', AuthDefault);
app.use(NotesRouter);
app.use(UsersRouter);

//statics files
app.use(express.static(path.join(__dirname, 'src/public')));

//server is listening
app.listen(app.get('port'), () => {
    console.log("server on port " + app.get('port'));
});