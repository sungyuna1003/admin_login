const express = require('express');
const app = express();

app.listen(3030, function () {
    console.log('server is running');
});

app.get('/test', function (req,res) {
    res.send('test 페이지입니다');
})