const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const path = require('path');


app.use(session(
    {
        secret: '4IA0cd!:qM>QPDN)zAwxr$ahe"15bP^CcJOVNy<@c<N"bzh!jg/Jf;h(O(i^a',
        resave: false,
        saveUninitialized: true,
    }));
app.use(express.static('public'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const logRequest = (req, res, next) => {
    console.log(`>: ${new Date().toLocaleString()} - ${req.method} ${req.originalUrl}`);
    next();
};



app.post('/form', (req, res) => {
    console.log(req.body);
    if(req.body.password === '1234') {
        res.send('Mot de passe correct');
    }else{
        res.redirect('/fichier/html?mdp=incorrect');
    }
    res.send('Données reçues');
});

app.get('/',logRequest, (req, res) => {

    if(!req.session.views) {
        req.session.views = 0;
    }

    req.session.views++;
    res.send(`<h1>Hello World<small> ${req.session.views} fois</small></h1>`);
})

app.get('/articles/:id', (req, res) => {
    console.log(req.params);
    const text = `<h1>Article #${req.params.id} du blog</h1>`;
    console.log(req.query)
    res.send(text);
});

app.get('/bonjour/:prenom', (req, res) =>  {
    console.log(req.query);
    const text = `<h1> bonjour ${req.params.prenom}....</h1>`;
    res.send(text);
});



app.get('/fichier/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/page.html'));
})

app.use((req, res) => {
    res.status(404).send('<h1>Page introuvable</h1>');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});