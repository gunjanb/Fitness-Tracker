const router = require("express").Router();
const path = require("path");

// get /   : display  the home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../public/html/index.html"));
});

// get /stats  : display stats page
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../public/html/stats.html"));
});

// get /excercise :display excercise page
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../public/html/exercise.html"));
});
module.exports = router;
