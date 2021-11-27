// Imports
const express = require('express');
const app = express();
const port = 3030
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);


var db;

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://admin:1234@admin.v8pd6.mongodb.net/centeradmin?retryWrites=true&w=majority',
    function (error, client) {
    if(error)return console.log(error)
    
    db = client.db('centeradmin');

    // db.collection('customer').insertOne(
    //     { _id : 1 , name: 'Yuna', center: 'Neuperlach', payment: 'cash', startdate: '2021 - 10 - 02', enddate: '2021 - 11 - 02' },
    //     function (error, result) {
    //     console.log('input-clear!')
    // });

    app.listen(port, function () {
        console.log('server is running!');
    });
    
})


// Static files
app.use(express.static('public'))
app.use('/css', express(__dirname + 'public/css'))

app.get('/', function (req, res) {
    res.render('login.ejs')
});


app.get('/list', function (req, res) {
    res.render('list.ejs')
});


app.get('/customer', function (req, res) {
    res.render('customer.ejs')
});

app.get('/login', function (req, res) {
    res.render('login.ejs')
});

// customer add
app.post('/add', function (req, res) {
    res.send('sent!~');

    db.collection('customer').insertMany(
        [{ name: req.body.name, center: req.body.center, payment: req.body.payment, startdate: req.body.startdate, enddate: req.body.enddate}],
        function (req, res) {
        console.log('saved!');
        })
})
// show customer list(not yet)

// app.get('/list', function (req,res) {
//     res.send('show-list');

//     db.collection('customer').find()
// })

