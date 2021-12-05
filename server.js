// Imports
const express = require("express");
const app = express();
const port = 3030;
app.use(express.urlencoded({ extended: false }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
  db.collection("customer")
    .find()
    .toArray(function (error, result) {
      // console.log(result);
      res.render("list.ejs", { customers: result });
    });
});

app.delete("/delete", function (req, res) {
  // console.log(req.body);
  req.body._id = parseInt(req.body._id);
  db.collection("customer").deleteOne(req.body, function (error, result) {
    console.log("deleted!");
    res.status(200).send({ message: "success!" });
  });
});

app.get("/customer", function (req, res) {
  db.collection("customer")
    .find()
    .toArray(function (error, result) {
      console.log(result);
    });

  res.render("customer.ejs");
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
});
// customer add
app.post("/add", function (req, res) {
  res.send("<script>alert('saved');location.href='list'</script>");
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (error, result) {
      console.log(result.totalPost);
      var total = result.totalPost;
      db.collection("customer").insertMany(
        [
          {
            _id: total + 1,
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
      db.collection("counter").updateOne(
        { name: "게시물갯수" },
        { $inc: { totalPost: 1 } },
        function (error, result) {
          if (error) {
            return console.log(error);
          }
        }
      );
    }
  );
});
app.get("/edit/:id", function (req, res) {
  db.collection("customer").findOne(
    { _id: parseInt(req.params.id) },
    function (error, result) {
      console.log(result);
      res.render("edit.ejs", { post: result });
    }
  );
});
