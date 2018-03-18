const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.set('view engine', 'hbs');

// ----MIDDLEWARES-----

// Logs
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (e) => {
        if(e) {
            console.log('Unable to append to file');
        }
    });
    console.log(log);
    next();
});
// Under maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
// Static website directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: '404 request error'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});