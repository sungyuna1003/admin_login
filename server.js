// Imports
const express = require('express');
const app = express();
const port = 3030
app.use(express.urlencoded({ extended: false }));



var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://admin:1234@admin.v8pd6.mongodb.net/centeradmin?retryWrites=true&w=majority', function (error, client) {
    app.listen(port, function () {
        console.log('server is running!');
    });
    
})


// Static files
app.use(express.static('public'))
app.use('/css', express(__dirname + 'public/css'))

// app.listen(port, function () {
//     console.log('server is running');
// });

app.get('/list', function (req, res) {
    res.sendFile(__dirname + '/views/list.html')
});


app.get('/customer', function (req, res) {
    res.sendFile(__dirname + '/views/customer.html')
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html')
});
