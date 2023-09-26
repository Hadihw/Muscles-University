const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, jwt } = require('../config/jwt');
const { usersCollection } = require('../config/firebase');
const { getUserByEmail } = require('../helpers/userHelper');
const admin = require("firebase-admin");

const registerUser = async (req, res) => {
	const {
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
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
		return res.status(400).json({ error: "User already exists" });
	}

	if (!existingUser && firebaseAuthUser) {
		await admin.auth().deleteUser(firebaseAuthUser.uid);
	}

	if (existingUser && !firebaseAuthUser) {
		const userRef = usersCollection.doc(existingUser.id);
		await userRef.delete();
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ message: 'The passwords you entered do not match. Please try again.' });
	}

	if (password.length < 6) {
		return res.status(400).json({ message: 'Your password should be at least 6 characters long. Please choose a longer password.' });
	}

	let uid;
	try {
		const userCredential = await admin.auth().createUser({ email, password });
		uid = userCredential.uid;


		const userData = {
			uid,
			email,
			firstName,
			lastName,
			userRole: "client",
			age:null,
			calories:null,
			currentWeight:null,
			dailyActivities:null,
			fat:null,
			fitnessGoal:null,
			gender:null,
			goalWeight:null,
			height:null,
			protein:null,
			carbs:null,
			workoutLocation:null,
			profilePic: null,
			createdAt:admin.firestore.Timestamp.fromDate(new Date()),
			assignedTrainer: null, // New field to store the UID of the assigned trainer
			assignedWorkoutPlans: [], // New field to store assigned workout plans
			dietPlan: null, // New field to store diet plans
			booking: null, // New field to store booking information
			healthInformation: null, // New field to store health information
			subscription: {
				id: null,
				type: null,
				startDate: null,
				endDate: null,
				autoRenewal: true
			}
		};


		const userRef = usersCollection.doc(uid);
		await userRef.set(userData);

		res.status(201).json({ message: 'User Successfully registered'});

	} catch (error) {
		console.log('Error creating user:', error);
		res.status(500).json({ message: 'There was an issue registering your account. Please try again later.' });
	}
};

const login = async (req, res) => {
	const { firebaseToken } = req.body;

	try {

		// Verify the token sent from the frontend
		const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
		const uid = decodedToken.uid;

		const user = await getUserByEmail(decodedToken.email);


		if (!user) {
			return res.status(401).json({ message: 'The email address you entered does not correspond to any account. Make sure you’ve entered it correctly.' });
		}

		const accessToken = jwt.sign({ id: user.id, email: user.email,userRole: user.userRole}, JWT_SECRET_KEY, {
			expiresIn: '1h'
		});

		const refreshToken = jwt.sign({ id: user.id, email: user.email,userRole: user.userRole }, JWT_REFRESH_SECRET_KEY, {
			expiresIn: '7d'
		});

		res.cookie('accessToken', accessToken, { httpOnly: true });
		res.cookie('refreshToken', refreshToken, { httpOnly: true });
		res.status(200).json({ message: 'Logged in', accessToken, refreshToken, uid: user.id });

	} catch (error) {
		res.status(401).json({ message: 'There was an issue logging in. Please ensure your token is valid or try again later.' });
	}
};

const refreshToken = async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).send('Refresh token is missing');
	}

	try {
		const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);

		const accessToken = jwt.sign({ id: payload.id, email: payload.email }, JWT_SECRET_KEY, {
			expiresIn: '1h'
		});

		res.status(200).json({ accessToken });

	} catch (error) {
		console.log('Error refreshing token:', error);
		res.status(401).json({ message: 'There was an issue refreshing your session. Please log in again.' });
	}
};

const checkAuth = async (req, res) => {
	console.log("Inside checkAuth function");

	const { accessToken, refreshToken } = req.cookies;

	if (!accessToken && !refreshToken) {
		console.log("No access and refresh tokens provided");
		return res.status(401).json({ message: "Not authenticated" });
	}

	try {
		const decoded = jwt.decode(accessToken);  // Just decode, don't verify
		if (decoded.exp * 1000 > Date.now()) {
			console.log("Access token still valid");
			return res.status(200).json({ message: "Authenticated" });
		} else {
			console.log("Access token has expired");
		}
	} catch (error) {
		console.log("Error decoding access token:", error);
	}

	// If we're here, the access token is either invalid or expired
	try {
		const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
		const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET_KEY, {
			expiresIn: '1h'
		});
		console.log("Refresh token verified and new access token generated");
		res.cookie('accessToken', newAccessToken, { httpOnly: true });
		return res.status(200).json({ message: "Authenticated", accessToken: newAccessToken });
	} catch (error) {
		console.log("Refresh token verification failed:", error);

		if (error instanceof jwt.TokenExpiredError) {
			console.log("Refresh token has expired");
		} else if (error instanceof jwt.JsonWebTokenError) {
			console.log("Invalid refresh token");
		}

		return res.status(401).json({ message: "You're not currently logged in. Please sign in to continue." });
	}
};

const logout = async (req, res) => {
	// Invalidate the refresh token here (e.g., remove it from your database)
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');
	res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = {
	registerUser,
	login,
	logout,
	refreshToken,
	checkAuth
};