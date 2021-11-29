// Imports
const express = require("express");
const app = express();
const port = 3030;
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var db;

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:1234@admin.v8pd6.mongodb.net/centeradmin?retryWrites=true&w=majority",
  function (error, client) {
    if (error) return console.log(error);

    db = client.db("centeradmin");

    // db.collection('customer').insertOne(
    //     { _id : 1 , name: 'Yuna', center: 'Neuperlach', payment: 'cash', startdate: '2021 - 10 - 02', enddate: '2021 - 11 - 02' },
    //     function (error, result) {
    //     console.log('input-clear!')
    // });

    app.listen(port, function () {
      console.log("server is running!");
    });
  }
);

// Static files
app.use(express.static("public"));
app.use("/css", express(__dirname + "public/css"));

app.get("/", function (req, res) {
  res.render("login.ejs");
});

app.get("/list", function (req, res) {
  res.render("list.ejs");
});

app.get("/customer", function (req, res) {
  res.render("customer.ejs");
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
});
app.get("/test1", function (req, res) {
  res.render("test1.ejs");
});
app.get("/test2", function (req, res) {
  res.render("test2.ejs");
});
// customer add
app.post("/add", function (req, res) {
  res.send("<script>alert('saved');location.href='list'</script>");
  db.collection("customer").insertMany(
    [
      {
        name: req.body.name,
        center: req.body.center,
        payment: req.body.payment,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
      },
    ],
    function (req, res) {
      console.log("saved!");
    }
  );
});

// 문제 해결중

// app.get("/list", function (req, res) {
//   res.send("list?!~");
//   db.collection("customer")
//     .find()
//     .toArray(function (error, result) {
//       console.log(result);
//     });
// });

// 테스트용
// app.get("/list", function (req, res) {
//   db.getCollection("customer").find({ name: "test3" });
//   console.log(res);
// .toArray(function (error, result) {
//   if (err) throw error;
//   console.log(result);
// });
// });

// test1 add
app.post("/test1", function (req, res) {
  res.send("<script>alert('good');location.href='test2'</script>");
  db.collection("test1").insertMany(
    [
      {
        name: req.body.name,
        center: req.body.color,
      },
    ],
    function (req, res) {
      console.log("test saved!");
    }
  );
});
//test get
app.get("/test2", function (req, res) {
  db.collection("test1")
    .find()
    .toArray(function (error, result) {
      console.log(result);
    });
});
