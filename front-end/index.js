const express = require("express");
const path = require("path");

const pug = require('pug');

const app = express();



app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'images')))
console.log(__dirname);

app.get('/', (req, res) => {
    res.render('landing-page');
})

app.get("/sign-up", (req, res) => {
    // res.sendFile(path.join(__dirname, "public") + '/sign-in.html');
    res.render('sign-in')
})

app.get("/log-in", (req, res) => {
    // res.sendFile(path.join(__dirname, "public") + '/sign-in.html');
    res.render('log-in')
})

app.get('/home', (req, res) => {
    res.render('chat')
})
const port = 4000;


app.listen(port, () => console.log(`Listening on port:${port}`));
