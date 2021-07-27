const router = require("express").Router();
const Workout = require("../../models/workout.js");
// /api/workouts :all workout sorted on date
router.get("/workouts", (req, res) => {
  console.log("here at backend");

  Workout.find({})
    // .sort({ date: -1 })
    .then((dbworkoutdata) => {
      res.status(200).json(dbworkoutdata);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
module.exports = router;
