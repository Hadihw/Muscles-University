const express = require("express");
const workoutController = require("../controllers/workoutController");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

router.get("/workoutPlan", authJWT, workoutController.getAllWorkouts);
router.get("/WorkoutPlan/:id", authJWT, workoutController.getWorkoutById);
router.post("/WorkoutPlan", authJWT, workoutController.addWorkout);

module.exports = router;