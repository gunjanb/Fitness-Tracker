const router = require("express").Router();
const Workout = require("../../models/workout.js");
// GET /api/workouts : get all workout along with totalduration of workout
router.get("/", async (req, res) => {
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
router.post("/", async ({ body }, res) => {
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

//update /api/workouts/id  :id is the id of the workout
//in which new exercise will get added if we hit continue button
router.put("/:id", async ({ body, params }, res) => {
  try {
    const dbworkoutdata = await Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    );
    if (!dbworkoutdata) {
      res.status(404).json({ msg: "no workout found with this id" });
      return;
    }
    res.json(dbWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get/api/workouts/range : give last 7 days workouts along with total duration
router.get("/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
