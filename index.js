const express = require('express');
const monk = require('monk');
const app = express();
const port = 3000;
const dbCredentials = require('./dbcredentials');
const db = monk(dbCredentials.url);

db.then(() => {
    console.log('Connected correctly to server');
});

const alumnos = db.get('alumnos');

app.get('/', (req, res) => {
    res.redirect('/saludo');
});
app.get('/saludo', (req, res) => {
    res.send('Hello World!');
});

app.get('/alumnos', (req, res) => {
    alumnos.find({}, function(err, allAlumnos){
		if (err) res.send(500, err);
		else res.json(allAlumnos);
	})
})

app.use(function (req, res, next) {
    res.status(404).send('ERROR 404: This page doesnt exist!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
