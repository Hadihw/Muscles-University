const express = require("express");
const userC = require("../controllers/userController");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

// Fetch all users
router.get("/users", authJWT, userC.getAllUsers);

// Fetch a user by ID
router.get("/getUser/:id", authJWT, userC.getUserById);

// Update user details by ID
router.put("/updateUser/:id", authJWT, userC.updateUser);

// Check if an email exists
router.post("/checkEmailExists", authJWT, userC.checkEmailExists);

// Fetch user by email
router.get("/getUserByEmail/:email", authJWT, userC.getUserByEmail);

// Fetch all trainers
router.get("/getAllTrainers", authJWT, userC.getAllTrainers);

router.get("/fetchUserById", authJWT, userC.fetchUserById);

router.get("/getAllUsers", authJWT,userC.getAllUsers);

module.exports = router;