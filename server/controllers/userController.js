const { usersCollection } = require('../config/firebase');

// Fetch a user by email
async function getUserByEmail(email) {
	const snapshot = await usersCollection.where('email', '==', email).get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	return { id: doc.id, ...doc.data() };
}

async function getAllUsers(req, res) {
	try {
		const snapshot = await usersCollection.get();
		const users = [];

		snapshot.forEach(doc => {
			users.push({ id: doc.id, ...doc.data() });
		});

		res.json(users);
	} catch (error) {
		console.error("Error fetching all users:", error);
		res.status(500).send("Error fetching all users");
	}
}

// Fetch a user by ID from Firestore
async function fetchUserById(id) {
	const userRef = usersCollection.doc(id);
	const doc = await userRef.get();

	if (!doc.exists) {
		return null;
	}
	return doc.data();
}

async function getUserById(req, res) {
	const { id } = req.params;
	const userData = await fetchUserById(id);

	if (!userData) {
		return res.status(404).send('User not found');
	}

	res.status(200).json(userData);
}

// Update user details by ID
async function updateUser(req, res) {
	const { id } = req.params;
	const {
		firstName,
		lastName,
		age,
		calories,
		currentWeight,
		dailyActivities,
		fat,
		carbs,
		fitnessGoal,
		gender,
		goalWeight,
		height,
		protein,
		workoutLocation
	} = req.body;

	const userRef = usersCollection.doc(id);
	await userRef.update({
		firstName,
		lastName,
		age,
		calories,
		currentWeight,
		dailyActivities,
		fat,
		carbs,
		fitnessGoal,
		gender,
		goalWeight,
		height,
		protein,
		workoutLocation
	});

	const updatedDoc = await userRef.get();
	if (!updatedDoc.exists) {
		return res.status(404).send('Updated user not found');
	}

	res.status(200).json(updatedDoc.data());
}


async function checkEmailExists(req, res) {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ error: "Email is required" });
	}

	try {
		const snapshot = await usersCollection.where('email', '==', email).get();

		if (!snapshot.empty) {
			return res.status(400).json({ error: "Email already exists" });
		} else {
			return res.status(200).json({ message: "Email does not exist" });
		}
	} catch (error) {
		console.error("Error checking email existence:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

// Data Validation Function
const isValidUserData = (userData) => {
	if (userData.age !== null && (typeof userData.age !== 'number' || userData.age < 0 || userData.age > 120)) {
		return false;
	}
	if (userData.height !== null && (typeof userData.height !== 'number' || userData.height < 0)) {
		return false;
	}
	if (userData.currentWeight !== null && (typeof userData.currentWeight !== 'number' || userData.currentWeight < 0)) {
		return false;
	}
	if (userData.goalWeight !== null && (typeof userData.goalWeight !== 'number' || userData.goalWeight < 0)) {
		return false;
	}
	if (userData.calories !== null && (typeof userData.calories !== 'number' || userData.calories < 0)) {
		return false;
	}
	// Add more validation logic here
	return true;
};

async function getAllTrainers(req, res) {
	try {
		const snapshot = await usersCollection.where('userRole', '==', 'trainer').get();
		const trainers = [];

		snapshot.forEach(doc => {
			trainers.push({ id: doc.id, ...doc.data() });
		});

		res.json(trainers);
	} catch (error) {
		console.error("Error fetching all trainers:", error);
		res.status(500).send("Error fetching all trainers");
	}
}

module.exports = {
	getUserByEmail,
	getAllUsers,
	getUserById,
	updateUser,
	checkEmailExists,
	isValidUserData,
	getAllTrainers,
	fetchUserById
};
