// account controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Feb 20, 2023
// Description: This file contains the methods for handling the various account related HTTP requests. These include user registration, authentication, getting all users, getting user details by id or email, updating user details and password, adding a profile image, deleting a user, matching current password, and updating the user profile.
require('dotenv').config();

const accountM = require("../models/accountM.js");
const asyncHandler = require("express-async-handler");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, subscriptionPlan, paymentMethodId } = req.body;
  const existingUser = await accountM.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    try {
      // 1. Create a new Stripe customer
      const customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // 2. Create a subscription for the customer
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: subscriptionPlan, // Use the price ID corresponding to the selected subscription plan
          },
        ],
        expand: ["latest_invoice.payment_intent"],
      });

      // 3. Save the user's information and subscription in your database
      const newUser = await accountM.create({
        firstName,
        lastName,
        email,
        password,
        subscription: subscription.id,
      });

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      // Handle errors and send an appropriate response to the front-end
      console.log("Error:", error);
      res.status(400).json({ message: error.message });
    }
  }
});


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await accountM.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found");
  }
});

const getUserDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const selectFields = req.query.select; // retrieve the select parameter from query string
  const user = await accountM.findById(id).select(selectFields);
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const getUserByMail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await accountM.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, isAdmin } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    if (await user.matchPassword(oldPassword)) {
      user.password = newPassword;
      const updatedUser = await user.save();
      res.json({
        message: "Password updated successfully",
        id: updatedUser._id,
      });
    } else {
      res.status(401);
      throw new Error("Old password is incorrect");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const addProfileImage = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.profilePic = req.body.imageURL;
    const updatedUser = await user.save();
    res.json({
      message: "Profile image updated successfully",
      profilePic: updatedUser.profilePic,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  console.log(user);
  if (user) {
    user.deleteOne();
    res.status(200);
    res.json({ message: "User deleted" });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const matchCurrentPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: 'true'
    })
  } else {
    res.json({
      message: 'false'
    })
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { id, name, email } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});


module.exports = {
  login,
  registerUser,
  getAllUsers,
  getUserDetailsById,
  getUserByMail,
  updateUser,
  deleteUser,
  updatePassword,
  addProfileImage,
  updateProfile,
  matchCurrentPassword,
};
