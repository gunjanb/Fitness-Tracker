const router = require("express").Router();
const Workout = require("../../models/workout.js");

// GET /api/workouts : get all workouts along with totalduration of workout
router.get("/workouts", async (req, res) => {
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

    res.status(200).json(dbworkoutdata);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST/api/workouts  : create a new workout
router.post("/workouts", async ({ body }, res) => {
  try {
    const dbworkoutdata = await Workout.create(body);
    res.json(dbworkoutdata);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/workouts/id  :update workout with an exercise
router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbworkoutdata) => {
      res.json(dbworkoutdata);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get/api/workouts/range : return last 7 days workouts along with total duration
router.get("/workouts/range", (req, res) => {
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
    .then((dbworkoutdata) => {
      res.json(dbworkoutdata);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
