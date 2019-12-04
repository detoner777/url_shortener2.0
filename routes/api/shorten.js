const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const URL = require("../../models/Urls");

//issue fix --> Access to XMLHttpRequest at 'http://localhost:5000/api/shorten' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token,XKey,Authorization"
  );
  // res.header(
  //   "Access-Control-Allow-Origin",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

//@route GET /api/shorten/test
//@desc Test API end point
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Api is working" }));

//@route POST /api/shorten
//@desc POST a URL to shorten
//@access Public
router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.url) {
    urlData = req.body.url;
  }
  console.log("URL is:", urlData);
  //Chek if the URL already exists
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log("Entry found in db");
    } else {
      console.log("This is a new URL");
      const webaddress = new URL({
        _id: uniqid(),
        url: urlData
      });
      webaddress.save(err => {
        if (err) {
          return console.error(err);
        }
        res.send({
          url: urlData,
          hash: webaddress._id,
          staus: 200,
          statusTxt: "OK"
        });
      });
    }
  });
});

module.exports = router;
