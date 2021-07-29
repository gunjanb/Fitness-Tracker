const router = require("express").Router();
const api = require("./api");

router.use("/workouts", api);

module.exports = router;
