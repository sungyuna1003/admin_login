// Imports
const express = require('express');
const app = express();
const port = 3030

// Static files
app.use(express.static('public'))
app.use('/css', express(__dirname + 'public/css'))

app.listen(port, function () {
    console.log('server is running');
});

app.get('/list', function (req, res) {
    res.sendFile(__dirname + '/views/list.html')
});


app.get('/customer', function (req, res) {
    res.sendFile(__dirname + '/views/customer.html')
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html')
});
