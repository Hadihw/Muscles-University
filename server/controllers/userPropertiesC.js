// User Properties controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Feb 19, 2023
// Description: This file contains the methods for handling the various user related HTTP requests. These include adding/deleting skills, adding/deleting languages, adding/editing/deleting education, adding/deleting/editing projects, adding/updating location, and managing experience.



const accountM = require("../models/accountM");
const asyncHandler = require("express-async-handler");


//add skill
const addSkill = asyncHandler(async (req, res) => {
  const { id, skill } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.skills.push(skill);
    await user.save();
    res.json({
      message: "Skill added successfully",
      userSkillList: user.skills,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete Skill
const deleteSkill = asyncHandler(async (req, res) => {
  const { id, skill } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.skills = user.skills.filter((item) => item !== skill);
    await user.save();
    res.json({
      message: "Skill deleted successfully",
      userSkillList: user.skills,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add language
const addLanguage = asyncHandler(async (req, res) => {
  const { id, language } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.languages.push(language);
    await user.save();
    res.json({
      message: "Language added successfully",
      userLanguageList: user.languages,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//delete education
const deleteLanguage = asyncHandler(async (req, res) => {
  const { id, language } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.languages = user.languages.filter((item) => item !== language);
    await user.save();
    res.json({
      message: "Language deleted successfully",
      userLanguageList: user.languages,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});
 
//edit education 
const editExperience = asyncHandler(async (req, res) => {
  const { id, experience } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.experience.push(experience);
    await user.save();
    res.json({
      message: "Experience added successfully",
      userExperience: user.experience,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete experience
const deleteExperience = asyncHandler(async (req, res) => {
  const { id, experience } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.experience = user.experience.filter((item) => item !== experience);
    await user.save();
    res.json({
      message: "Experience deleted successfully",
      userExperience: user.experience,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add education
const addEducation = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { school, degree, fieldOfStudy, from, to } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    const newEducation = { school, degree, fieldOfStudy, from, to };
    user.education.push(newEducation);
    await user.save();
    res.json({
      message: "Education added successfully",
      userEducation: user.education,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});


// delete education
const deleteEducation = asyncHandler(async (req, res) => {
  const { id, educationId } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.education = user.education.filter(
      (item) => item._id.toString() !== educationId
    );
    await user.save();
    res.json({
      message: "Education deleted successfully",
      userEducation: user.education,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// edit education
const editEducation = asyncHandler(async (req, res) => {
  const { id, educationId } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    const educationIndex = user.education.findIndex(
      (education) => education._id.toString() === educationId
    );
    if (educationIndex !== -1) {
      const { school, degree, fieldOfStudy, from, to } = req.body;
      user.education[educationIndex].school = school;
      user.education[educationIndex].degree = degree;
      user.education[educationIndex].fieldOfStudy = fieldOfStudy;
      user.education[educationIndex].from = from;
      user.education[educationIndex].to = to;
      await user.save();
      res.json({
        message: "Education updated successfully",
        userEducationList: user.education,
      });
    } else {
      res.status(401);
      throw new Error("Education not found");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



// add location
const addLocation = asyncHandler(async (req, res) => {
  const { id, location } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.location = location;
    await user.save();
    res.json({
      message: "Location added successfully",
      userLocation: user.location,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add project
const addProject = asyncHandler(async (req, res) => {
  const { id, project } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.projects.push(project);
    await user.save();
    res.json({
      message: "Project added successfully",
      userProjects: user.projects,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete project
const deleteProject = asyncHandler(async (req, res) => {
  const { id, project } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.projects = user.projects.filter((item) => item !== project);
    await user.save();
    res.json({
      message: "Project deleted successfully",
      userProjects: user.projects,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  addSkill,
  deleteSkill,
  addLanguage,
  deleteLanguage,
  editExperience,
  deleteExperience,
  addEducation,
  editEducation,
  deleteEducation,
  addProject,
  deleteProject,
  addLocation,
};