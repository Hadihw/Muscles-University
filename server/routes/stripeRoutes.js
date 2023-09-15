const express = require("express");
const stripeC = require("../controllers/stripeController");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

router.post('/createCheckoutSession',authJWT, stripeC.createCheckoutSession);
router.get('/getSubscriptionPlans',authJWT, stripeC.getSubscriptionPlans);
router.post('/stripeWebhook', stripeC.stripeWebhook);
router.post('/cancelSubscriptionInStripe',authJWT, stripeC.cancelSubscriptionInStripe);

module.exports = router;