const express = require('express');
const db = require('./models');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : false }));

//* GET /  read
app.get('/', function(req, res) {
    res.send('You are at root. Everything looks OK.');
})

//* Get /users read
app.get('/users', function(req, res) {
    db.user.findAll()
    .then(function(data){
        console.log('get all users.');
        res.json(data);
    });
});

//* GET /users/:email read
app.get('/users/:email', function(req, res) {
    console.log(req.params.email);
    db.user.findOne({
        where: {codeid: req.params.email.split('@')[0].slice(Math.floor(req.params.email.split('@')[0].length/2)).split('').reverse().join('')}
    })
    .then(function(data) {
        res.json(data);
    });
});




//* POST /users create
app.post('/users', function(req, res) {
    db.user.create({
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        codeid: req.body.email.split('@')[0].slice(Math.floor(req.body.email.split('@')[0].length/2)).split('').reverse().join('')
    })
    .then(function(data) {
        console.log('new user created');
        res.json(data);
    });
});

//* DELETE /users/:email delete
app.delete('/users/:email', function(req,res) {
    db.user.destroy({
        where: {codeid: req.params.email.split('@')[0].slice(Math.floor(req.params.email.split('@')[0].length/2)).split('').reverse().join('')}
    })
    .then(function(data) {
        console.log('user delete');
        res.redirect('/users')
    })
})

//* UPDATE /users/:email update
app.put('/users/:email', function(req, res) {
    db.user.update({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
    }, {
        where: {codeid: req.params.email.split('@')[0].slice(Math.floor(req.params.email.split('@')[0].length/2)).split('').reverse().join('')}
    })
    .then(function() {
        console.log('updated user info');
        res.redirect('/users/'+ req.params.email);
    })
})

app.listen('3000', function() {
    console.log('Connected to port 3000');
})