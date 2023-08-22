const express = require("express");
const router = express.Router();
const userPropertyC = require("../controllers/userPropertiesC.js");

// @desc Add a new skill to user profile
// @route POST /api/user/property/addSkill
// @access Public
router.post("/addSkill", userPropertyC.addSkill);

// @desc Delete an existing skill from user profile
// @route DELETE /api/user/property/deleteSkill
// @access Public
router.delete("/deleteSkill", userPropertyC.deleteSkill);

// @desc Add a new language to user profile
// @route POST /api/user/property/addLanguage
// @access Public
router.post("/addLanguage", userPropertyC.addLanguage);

// @desc Delete an existing language from user profile
// @route DELETE /api/user/property/deleteLanguage
// @access Public
router.delete("/deleteLanguage", userPropertyC.deleteLanguage);

// @desc Add new experience to user profile
// @route POST /api/user/property/addExperience
// @access Public
router.post("/addExperience", userPropertyC.editExperience);

// @desc Add new education to user profile
// @route POST /api/user/property/addEducation
// @access Public
router.post("/addEducation", userPropertyC.addEducation);

// @desc Delete an existing education from user profile
// @route DELETE /api/user/property/deleteEducation
// @access Public
router.delete("/deleteEducation", userPropertyC.deleteEducation);

// @desc Add user location to user profile
// @route POST /api/user/property/addLocation
// @access Public
router.post("/addLocation", userPropertyC.addLocation);

// @desc Edit an existing education from user profile
// @route PUT /api/user/property/editEducation
// @access Public
router.put("/editEducation", userPropertyC.editEducation);

// @desc Delete an existing education from user profile
// @route DELETE /api/user/property/deleteEducation
// @access Public
router.delete("/deleteEducation", userPropertyC.deleteEducation);

// @desc Add a new project to user profile
// @route POST /api/user/property/addProject
// @access Public
router.post("/addProject", userPropertyC.addProject);

// @desc Delete an existing project from user profile
// @route DELETE /api/user/property/deleteProject
// @access Public
router.delete("/deleteProject", userPropertyC.deleteProject);


module.exports = router;
