const express = require("express");
const router = express.Router();
const authRouter = require("./user");

router.use("/user", authRouter)

module.exports = router;