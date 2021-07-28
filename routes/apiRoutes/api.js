const router = require("express").Router();
const Workout = require("../../models/workout.js");
// GET /api/workouts : get all workout along with totalduration of workout
router.get("/workouts", async (req, res) => {
  console.log("here at backend");
  try {
    const dbworkoutdata = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]);

    console.log("@@@@@@@@@@@@@@@@", dbworkoutdata);
    res.status(200).json(dbworkoutdata);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST/api/workouts  : create a new workout
router.post("/workouts", async ({ body }, res) => {
  console.log("here at backend for creating new workout");
  try {
    console.log(body);
    const dbworkoutdata = await Workout.create(body);

    console.log("@@@@@@@@@@@@@@@ posting  workout", dbworkoutdata);
    res.json(dbworkoutdata);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
