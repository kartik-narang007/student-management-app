const express = require("express");
const router = express.Router();
const { fetchClassNames } = require("../controllers/publicControllers");


router.get("/fetch-class-names", fetchClassNames);

module.exports = router;