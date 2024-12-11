import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import mongoose from 'mongoose';
import albumRoutes from './routes/album.routes.js';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();
app.use(express.static(path.join('public')));

mongoose.connect('mongodb://localhost:27017/phototheque' );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', path.join('views'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'vQXhq5A1MPW6XUcLuZky3NODTaAPNAcS',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash()); // Flash messages

app.get('/', (req, res) => {
    res.redirect('/albums');
});

app.use('/',albumRoutes);

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});