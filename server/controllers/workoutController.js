const { workoutPlansCollection } = require('../config/firebase');

async function getAllWorkouts(req, res) {
    try {
        const snapshot = await workoutPlansCollection.get();
        const workouts = [];

        snapshot.forEach(doc => {
            workouts.push({ id: doc.id, ...doc.data() });
        });

        res.json(workouts);
    } catch (error) {
        console.error("Error fetching all workouts:", error);
        res.status(500).send("Error fetching all workouts");
    }
}

async function getWorkoutById(req, res) {
    const { id } = req.params;
    const workoutRef = workoutPlansCollection.doc(id);
    const doc = await workoutRef.get();

    if (!doc.exists) {
        return res.status(404).send('Workout not found');
    }

    res.status(200).json(doc.data());
}

async function addWorkout(req, res) {
    const { title, exercises } = req.body;
    const newWorkout = { title, exercises };
    const workoutRef = await workoutPlansCollection.add(newWorkout);
    const workout = await workoutRef.get();

    res.status(201).json({ id: workout.id, ...workout.data() });
}

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    addWorkout
};