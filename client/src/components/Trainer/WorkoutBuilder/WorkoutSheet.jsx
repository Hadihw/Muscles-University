import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import WorkoutItem from './WorkoutItem';

const WorkoutSheet = ({ workout, exercises }) => {
    const getExerciseById = (id) => exercises.find(ex => ex.id === id);

    return (
        <Droppable droppableId="workoutSheet" type="exercise">
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="h-full bg-base-100 border p-4 overflow-x-auto overflow-y-auto"
                >
                    {workout.map((exerciseId, index) => {
                        const exercise = getExerciseById(exerciseId);
                        return (
                            <WorkoutItem
                                key={index}
                                index={index}
                                exercise={exercise}
                            />
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default WorkoutSheet;