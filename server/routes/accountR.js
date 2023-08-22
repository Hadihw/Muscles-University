const express = require("express");
const accountC = require("../controllers/accountC.js");

const router = express.Router();

/**
 * @desc Register a new user
 * @route POST /api/account/register
 * @access Public
 */
router.post("/register", accountC.registerUser);

/**
 * @desc Authenticate user
 * @route POST /api/account/login
 * @access Public
 */
router.post("/login", accountC.login);

/**
 * @desc Get all users
 * @route GET /api/account/users
 * @access Public
 */
router.get("/users", accountC.getAllUsers);

/**
 * @desc Get user details by ID
 * @route GET /api/account/getUser
 * @access Public
 */
router.get("/getUser", accountC.getUserDetailsById);

/**
 * @desc Get user details by email
 * @route GET /api/account/userByMail
 * @access Public
 */
router.get("/userByMail", accountC.getUserByMail);

/**
 * @desc Update user details by ID
 * @route PUT /api/account/updateUser
 * @access Public
 */
router.put("/updateUser", accountC.updateUser);

/**
 * @desc Update user password by ID
 * @route PUT /api/account/updatePassword
 * @access Public
 */
router.put("/updatePassword", accountC.updatePassword);

/**
 * @desc Add profile image for user
 * @route POST /api/account/addProfileImage
 * @access Public
 */
router.post("/addProfileImage", accountC.addProfileImage);

/**
 * @desc Delete user by ID
 * @route DELETE /api/account/deleteUser
 * @access Public
 */
router.delete("/deleteUser", accountC.deleteUser);

/**
@desc Update user profile information
@route PUT /api/account/updateProfile
@access Public
*/
router.put("/updateProfile", accountC.updateProfile);

/**
@desc Match the entered password with the current user's password
@route POST /api/account/matchPassword
@access Public
*/
router.post("/matchPassword", accountC.matchCurrentPassword);


module.exports = router;
