const express = require("express");
const subscriptionC = require("../controllers/subscriptionController");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

router.put("/updateSubscription/:id", authJWT, subscriptionC.updateSubscription);



module.exports = router;