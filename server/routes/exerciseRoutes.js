const express = require("express");
const exerciseController = require("../controllers/exerciseController");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

router.get("/exercises", authJWT, exerciseController.getAllExercises);
router.get("/exercises/:id", authJWT, exerciseController.getExerciseById);
router.post("/exercises", authJWT, exerciseController.addExercise);

module.exports = router;