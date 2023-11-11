// WorkoutBuilder.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseItem from './ExerciseItem';
import WorkoutSheet from './WorkoutSheet';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import LoadingIndicator from '../../UI/LoadingIndicator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkoutBuilder = () => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [workout, setWorkout] = useState([]);
    const [title, setTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/exercise/exercises')
            .then(response => {
                setExercises(response.data);
                setFilteredExercises(response.data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredExercises(
            exercises.filter(exercise =>
                exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, exercises]);

    const handleDragEnd = (result) => {
        const { destination, source } = result;

        // Dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.droppableId === "workoutSheet") {
            const reorderedWorkout = Array.from(workout);
            const [removed] = reorderedWorkout.splice(source.index, 1);
            reorderedWorkout.splice(destination.index, 0, removed);
            setWorkout(reorderedWorkout);
        } else if (source.droppableId === "exerciseList" && destination.droppableId === "workoutSheet") {
            setWorkout(prev => [...prev, result.draggableId]);
        }
    };


    const createWorkoutPlan = () => {
        axios.post('/api/workoutPlan/WorkoutPlan', { title, exercises: workout })
            .then(() => {
                toast.success('Workout Plan Created Successfully!');
            })
            .catch(() => {
                toast.error('Error creating workout plan.');
            });
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="p-5 flex flex-row h-[900px]">
                <Droppable droppableId="exerciseList" type="exercise">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="w-1/3 card bg-base-100 shadow-xl p-4 overflow-y-auto">
                            <div className="relative w-full mb-2">
                                <input
                                    type="text"
                                    placeholder="Search exercises..."
                                    className="pl-10 pr-3 py-1 w-full border rounded"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 gap-2 justify-items-center justify-content-center">
                                {filteredExercises.sort((a, b) => a.title.localeCompare(b.title)).map((exercise, index) => (
                                    <ExerciseItem
                                        key={exercise.id}
                                        exercise={exercise}
                                        isDropped={workout.includes(exercise.id)}
                                        index={index}
                                    />
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className="w-3/4 card bg-base-100 shadow-xl p-4 overflow-y-auto ml-4">
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="text"
                        placeholder="Enter workout title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <WorkoutSheet workout={workout} exercises={exercises} />
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                        onClick={createWorkoutPlan}
                    >
                        Create Workout Plan
                    </button>
                </div>
            </div>
            <ToastContainer />
        </DragDropContext>
    );
};

export default WorkoutBuilder;
