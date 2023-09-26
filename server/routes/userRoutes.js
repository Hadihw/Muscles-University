const express = require("express");
const userController = require("../controllers/userController");
const authJWT = require("../middleware/authJWT");

const router = express.Router();

// Route to fetch all users
router.get("/users", authJWT, userController.getAllUsers);

// Route to fetch a user by ID
router.get("/users/:id", authJWT, userController.getUserById);

// Route to update user details by ID
router.put("/users/:id", authJWT, userController.updateUser);

// Route to check if an email exists
router.post("/checkEmailExists", authJWT, userController.checkEmailExists);

// Route to fetch a user by email
router.get("/users/:email", authJWT, userController.getUserByEmail);

// Route to fetch all trainers
router.get("/getAllTrainers", authJWT, userController.getAllTrainers);

// Route to fetch a user by ID in firestore
router.get("/fetchUserById", authJWT, userController.fetchUserById);

// Route to fetch all clients
router.get("/getAllClients", authJWT, userController.getAllClients);

// Route to list all clients for a specific trainer
router.get('/listAllClientsForTrainer/:trainerId', authJWT, userController.listAllClientsForTrainer);

module.exports = router;