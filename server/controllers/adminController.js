const { usersCollection } = require('../config/firebase');
const admin = require("firebase-admin");
const {getUserByEmail} = require("./userController");

const registerTrainer = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    const existingUser = await getUserByEmail(email);

    let firebaseAuthUser;
    try {
        firebaseAuthUser = await admin.auth().getUserByEmail(email);
    } catch (err) {
        if (err.code !== 'auth/user-not-found') {
            console.error(`Error checking Firebase Authentication: ${err.message}`);
            return res.status(500).json({ message: 'There was an issue processing your request. Please try again later.' });
        }
    }

    if (existingUser && firebaseAuthUser) {
        return res.status(400).json({ error: "Trainer already exists" });
    }

    if (!existingUser && firebaseAuthUser) {
        await admin.auth().deleteUser(firebaseAuthUser.uid);
    }

    if (existingUser && !firebaseAuthUser) {
        const userRef = usersCollection.doc(existingUser.id);
        await userRef.delete();
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Your password should be at least 6 characters long. Please choose a longer password.' });
    }

    let uid;
    try {
        const userCredential = await admin.auth().createUser({ email, password });
        uid = userCredential.uid;

        const trainerData = {
            uid,
            email,
            firstName,
            lastName,
            userRole: "trainer",
            certifications:null,
            yearsOfExperience:null,
            specialization:null,
            assignedClients: [],
            workoutPlans: [],
            availability: null,
            profilePic: null,
            createdAt: admin.firestore.Timestamp.fromDate(new Date())
        };

        const userRef = usersCollection.doc(uid);
        await userRef.set(trainerData);

        res.status(201).json({ message: 'Trainer Successfully registered'});

    } catch (error) {
        console.log('Error creating trainer:', error);
        res.status(500).json({ message: 'There was an issue registering the trainer. Please try again later.' });
    }
}



const assignClientToTrainer = async (req, res) => {
    const { trainerId, clientId } = req.body;
    try {
        const db = admin.firestore(); // assuming you are using firebase admin SDK

        // Update the client with the trainerId
        const clientRef = db.collection('users').doc(clientId);
        await clientRef.update({assignedTrainer: trainerId}); // Set the assignedTrainer field to trainerId

        // Update the trainer's assignedClients array
        const trainerRef = db.collection('users').doc(trainerId);
        await trainerRef.update({
            assignedClients: admin.firestore.FieldValue.arrayUnion(clientId) // this will add clientId to the assignedClients array without duplicates
        });

        res.status(200).send('Client assigned successfully');
    } catch (error) {
        console.error("Error assigning client:", error);
        res.status(500).send('Error assigning client');
    }
};



const removeClientFromTrainer = async (req, res) => {
    const { trainerId, clientId } = req.body;
    try {
        const trainerRef = usersCollection.doc(trainerId);
        const clientRef = usersCollection.doc(clientId);

        // Remove clientId from trainer's assignedClients array
        await trainerRef.update({
            assignedClients: admin.firestore.FieldValue.arrayRemove(clientId)
        });

        // Remove trainerId from client's document
        await clientRef.update({
            assignedTrainer: admin.firestore.FieldValue.delete()
        });

        res.status(200).json({ message: 'Client removed from trainer successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove client from trainer.', error: error.message });
    }
};

const listAllClientsForTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const trainerDoc = await usersCollection.doc(trainerId).get();
        const trainerData = trainerDoc.data();

        // Check if assignedClients exists and is an array, else return an empty array
        if (!Array.isArray(trainerData.assignedClients) || trainerData.assignedClients.length === 0) {
            return res.status(200).json([]);
        }

        const clientIds = trainerData.assignedClients;
        const clientDocs = await usersCollection.where('userRole', '==', 'client').where('uid', 'in', clientIds).get();

        const clients = [];
        clientDocs.forEach(doc => {
            clients.push(doc.data());
        });

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch clients for trainer.', error: error.message });
    }
};



module.exports = {
    registerTrainer,
    assignClientToTrainer,
    removeClientFromTrainer,
    listAllClientsForTrainer
};