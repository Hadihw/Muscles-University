const { exercisesCollection } = require('../config/firebase');

async function getAllExercises(req, res) {
    try {
        const snapshot = await exercisesCollection.get();
        const exercises = [];

        snapshot.forEach(doc => {
            exercises.push({ id: doc.id, ...doc.data() });
        });

        res.json(exercises);
    } catch (error) {
        console.error("Error fetching all exercises:", error);
        res.status(500).send("Error fetching all exercises");
    }
}

async function getExerciseById(req, res) {
    const { id } = req.params;
    const exerciseRef = exercisesCollection.doc(id);
    const doc = await exerciseRef.get();

    if (!doc.exists) {
        return res.status(404).send('Exercise not found');
    }

    res.status(200).json(doc.data());
}

async function addExercise(req, res) {
    const { title, imageUrl, steps } = req.body;
    const newExercise = { title, imageUrl, steps };
    const exerciseRef = await exercisesCollection.add(newExercise);
    const exercise = await exerciseRef.get();

    res.status(201).json({ id: exercise.id, ...exercise.data() });
}

module.exports = {
    getAllExercises,
    getExerciseById,
    addExercise
};
