const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Subscription = require('./subscriptionModel');


// Define the Account schema
const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'invalid email']
  },
  password: {
    type: String,
    required: [true,'Please enter your password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isTrainer: {
    type: Boolean,
    required: true,
    default: false,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  goalWeight: {
    type: Number,
    required: true,
  },
  fitnessGoal: {
    type: String,
    required: true,
  },
  dailyActivities: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: false,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to encrypt password before saving
accountSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to decode password before comparing
accountSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const accountM = mongoose.model("Account", accountSchema);

module.exports = accountM;
