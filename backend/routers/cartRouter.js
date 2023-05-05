const express = require("express");
const { cartController } = require ("../controllers/index")
const router = express.Router()

router.post("/", cartController.newTransaction)

module.exports = router