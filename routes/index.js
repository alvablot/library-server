const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello world!");
    console.log("GET/_")
});

module.exports = router;
