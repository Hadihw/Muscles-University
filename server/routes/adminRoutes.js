const express = require("express");
const adminController = require("../controllers/adminController");
const { adminMiddleware } = require("../middleware/adminMiddleware");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

// Route to register a new trainer
router.post("/registerTrainer",
    authJWT,
    adminMiddleware,
    adminController.registerTrainer
);

// Route to assign a client to a trainer
router.post('/assignClientToTrainer',
    authJWT,
    adminMiddleware,
    adminController.assignClientToTrainer
);

// Route to remove a client from a trainer
router.post('/removeClientFromTrainer',
    authJWT,
    adminMiddleware,
    adminController.removeClientFromTrainer
);

module.exports = router;