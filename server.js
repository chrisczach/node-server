const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', err => err && console.log(err));
    console.log(log);
    next();
});

hbs.registerHelper('getYear', ()=> new Date().getFullYear())

app.get('/', (req, res) => {
    res.send({
        name: 'bob',
        test: 'testing'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        title: 'About Page'
    })
});

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'sumtinwong'})
})


app.listen(port, console.log(`server is running on port ${port}`));