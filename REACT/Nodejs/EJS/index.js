const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

const articles = [
    {
        title: 'Article 1',
        content: 'Content for article 1'
    },
    {
        title: 'Article 2',
        content: 'Content for article 2'
    },
    {
        title: 'Article 3',
        content: 'Content for article 3'
    }

];
app.get('/', (req, res) => {
    res.render('pages/home', { title: 'Home', message: 'Hello World' });
    // const template = path.join(__dirname, 'views/home.ejs');
    // const data = {};
    // const options = {};
    // ejs.renderFile(template, data, {}, (err, str) => {
    //     if (err) {
    //         return res.send(err);
    //     }
    //     res.send(str);
    // });
});

app.get('/hello/:name', (req, res) => {
    const data = 
    res.render('/pages/hello', { 
        name : req.params.name, 
    });
});
app.get('/posts', (req, res) => {
    res.render('pages/post-lit', { posts : articles });
});
app.listen(port, () =>{
    console.log(`Server started on http://localhost:${port}`);
})