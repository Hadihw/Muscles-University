const admin = require('firebase-admin');
const firestore = admin.firestore();

const usersCollection = firestore.collection('users');
const messagesCollection = firestore.collection('messages');
const workoutPlansCollection = firestore.collection('WorkoutPlans');
const exercisesCollection = firestore.collection('exercises');

const subscriptionHistory = userId => usersCollection.doc(userId).collection('subscriptionHistory');

module.exports = { firestore, usersCollection, messagesCollection,subscriptionHistory, workoutPlansCollection, exercisesCollection};