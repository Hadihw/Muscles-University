const { usersCollection } = require('../config/firebase');
const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = require('../config/jwt');
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
	const { idToken } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);

		if (!decodedToken.uid) {
			return res.status(400).json({ message: "UID not found in decoded token" });
		}

		const userRef = await admin.firestore().collection('users').doc(decodedToken.uid);
		const userSnapshot = await userRef.get();

		let firebaseAuthUser;
		try {
			firebaseAuthUser = await admin.auth().getUser(decodedToken.uid);
		} catch (err) {
			if (err.code !== 'PreAuth/user-not-found') {
				console.error(`Error checking Firebase Authentication: ${err.message}`);
				return res.status(500).json({ message: 'There was an issue processing your request. Please try again later.' });
			}
		}

		// User exists in Firestore but not in Firebase Authentication
		if (userSnapshot.exists && !firebaseAuthUser) {
			await userRef.delete();
			return res.status(400).json({ message: "User does not exist. Please register first." });
		}

		// User does not exist in Firestore but exists in Firebase Authentication
		if (!userSnapshot.exists && firebaseAuthUser) {
			await admin.auth().deleteUser(firebaseAuthUser.uid);
			return res.status(400).json({ message: "User does not exist. Please register first." });
		}

		// If user doesn't exist in both
		if (!userSnapshot.exists && !firebaseAuthUser) {
			return res.status(400).json({ message: "User does not exist. Please register first!" });
		}

		const userRole = userSnapshot.data().userRole;

		const accessToken = jwt.sign({ id: decodedToken.uid, email: decodedToken.email, userRole: userRole }, JWT_SECRET_KEY, {
			expiresIn: '1h'
		});

		const refreshToken = jwt.sign({ id: decodedToken.uid, email: decodedToken.email }, JWT_REFRESH_SECRET_KEY, {
			expiresIn: '7d'
		});

		// Set the JWTs as cookies
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
		});
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		});// Issue JWTs for Google Login


		res.status(200).json({ accessToken, refreshToken, message: "User logged in with Google", uid: decodedToken.uid });

	} catch (error) {
		console.error("Error verifying ID token:", error);
		res.status(401).json({ message: "There was an issue logging in with Google. Please ensure your token is valid or try again later." });
	}
};

const googleRegister = async (req, res) => {
	const { idToken } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);

		if (!decodedToken.uid) {
			return res.status(400).json({ message: "UID not found in decoded token" });
		}

		const userRef = admin.firestore().collection('users').doc(decodedToken.uid);
		const userSnapshot = await userRef.get();

		let firebaseAuthUserExists = true;
		try {
			await admin.auth().getUser(decodedToken.uid);
		} catch (err) {
			if (err.code === 'PreAuth/user-not-found') {
				firebaseAuthUserExists = false;
			} else {
				console.error(`Error checking Firebase Authentication: ${err.message}`);
				return res.status(500).json({ message: 'There was an issue processing your registration. Please try again later.' });
			}
		}

		// If user exists in both Firestore and Firebase Auth
		if (userSnapshot.exists && firebaseAuthUserExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		// If user does not exist in Firestore, create a document for them.
		if (!userSnapshot.exists) {
			const [firstName, ...lastNameParts] = decodedToken.name.split(' ');
			const lastName = lastNameParts.join(' ');

			const userData = {
				uid: decodedToken.uid,
				email: decodedToken.email,
				profilePic: decodedToken.picture,
				firstName,
				lastName,
				userRole: "client",
				age: null,
				calories: null,
				currentWeight: null,
				dailyActivities: null,
				fat: null,
				carbs: null,
				fitnessGoal: null,
				gender: null,
				goalWeight: null,
				height: null,
				protein: null,
				workoutLocation: null,
				createdAt:admin.firestore.Timestamp.fromDate(new Date()),
				subscription: {
					id: null,
					type: null,
					startDate: null,
					endDate: null, // Infinite end date for Free plan
					autoRenewal: true
				}
			};

			await userRef.set(userData);
		}

		res.status(200).json({ message: "User registered with Google"});

	} catch (error) {
		console.error("Error verifying ID token:", error);
		res.status(401).json({ message: "There was an issue registering with Google. Please ensure your token is valid or try again later." });
	}
};

module.exports = {
	googleLogin,
	googleRegister
};