const express = require("express");
const router = express.Router();

//@route GET api/redirect
//@headers hash
//@desc Redirect user
//@access Public

router.get("/", (req, res) => {
  const hash = req.headers.hash;

  URL.findOne({ _id: hash }).then(doc => {
    return res.json({ url: doc.url }).catch(err => {
      return res
        .status(400)
        .json({ error: "Sorry, this link may have expired" });
    });
  });
});

module.exports = router;
