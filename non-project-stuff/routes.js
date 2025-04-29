const express = require("express");
const router = express.Router();

//Home Page
router.get("/", (req, res) => {
    res.send("The answer to life is:");
});

//Secret Page
router.get("/secret", (req, res) => {
    res.send("42");
});

module.exports = router;