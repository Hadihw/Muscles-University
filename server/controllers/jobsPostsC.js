// jobposts controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Mar 1, 2023
// Description: This file contains the methods for handling the various job post related HTTP requests. These include getting all job posts, getting a job post by id, creating a job post, deleting a job post, updating a job post, getting all job posts by a user, and applying to a job post.

const jobPostM = require("../models/jobPostM.js");
const asyncHandler = require("express-async-handler");

// @desc    Get all job posts
const getJobPosts = asyncHandler(async (req, res) => {
  const jobPosts = await jobPostM.find({});
  res.json(jobPosts);
});

// @desc    Get a job post by id
const getJobPostById = asyncHandler(async (req, res) => {
  const jobPost = await jobPostM.findById(req.params.id);
  if (jobPost) {
    res.json(jobPost);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc    Create a job post
// @body    title, company, location, salary, description, skills, postedBy, postedOn, applicants, isExternal, externalLink ,status
// @return  created job post
const createJobPost = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    description,
    skills,
    postedBy,
    postedOn,
    applicants,
    isExternal,
    externalLink,
    status,
  } = req.body;
  const jobPost = new jobPostM({
    title,
    company,
    location,
    salary,
    description,
    skills,
    postedBy,
    postedOn,
    applicants,
    isExternal,
    externalLink,
    status,
  });
  const createdJobPost = await jobPost.save();
  res.status(201).json(createdJobPost);
});

// @desc    Delete a job post
// @return  deleted job post
const deleteJobPost = asyncHandler(async (req, res) => {
  const jobPost = await jobPostM.findById(req.params.id);
  if (jobPost) {
    await jobPost.remove();
    res.json({ message: "Job post removed" });
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc    Update a job post
// @body    title, company, location, salary, description, skills, postedBy, postedOn, applicants, isExternal, externalLink ,status
// @return  updated job post

const updateJobPost = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    description,
    skills,
    postedBy,
    postedOn,
    applicants,
    isExternal,
    externalLink,
    status,
  } = req.body;
  const jobPost = await jobPostM.findById(req.params.id);
  if (jobPost) {
    jobPost.title = title;
    jobPost.company = company;
    jobPost.location = location;
    jobPost.salary = salary;
    jobPost.description = description;
    jobPost.skills = skills;
    jobPost.postedBy = postedBy;
    jobPost.postedOn = postedOn;
    jobPost.applicants = applicants;
    jobPost.isExternal = isExternal;
    jobPost.externalLink = externalLink;
    jobPost.status = status;
    const updatedJobPost = await jobPost.save();
    res.json(updatedJobPost);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc   Get all job posts by a user
// @param  id: user id
// @return  job posts
const getJobPostsByUser = asyncHandler(async (req, res) => {
  const jobPosts = await jobPostM.find({ postedBy: req.params.id });
  if (jobPosts) {
    res.json(jobPosts);
  } else {
    res.status(404);
    throw new Error("Job posts not found");
  }
});

// @desc apply to a job post
// @param id: job post id
// @body applicant: user id of the applicant and link to the resume
// @return updated job post
const applyToJobPost = asyncHandler(async (req, res) => {
  const jobPost = await jobPostM.findById(req.params.id);
  if (jobPost) {
    jobPost.applicants.push(req.body.applicant);
    const updatedJobPost = await jobPost.save();
    res.json(updatedJobPost);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

module.exports = {
  getJobPosts,
  getJobPostById,
  createJobPost,
  deleteJobPost,
  updateJobPost,
  getJobPostsByUser,
  applyToJobPost,
};