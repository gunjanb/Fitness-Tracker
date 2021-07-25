const router = require("express").Router();
const home = require("./home.js");

router.use("/", home);

module.exports = router;
