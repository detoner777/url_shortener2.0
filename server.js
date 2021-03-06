const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const shorten = require("./routes/api/shorten");
const redirect = require("./routes/api/redirect");

const app = express();
const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/api/shorten", shorten);
app.use("/api/redirect", redirect);

mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

//Hash API
app.get("/:hash", (req, res) => {
  const id = req.params.hash;
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc.url);
      res.redirect("http://" + doc.url);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
