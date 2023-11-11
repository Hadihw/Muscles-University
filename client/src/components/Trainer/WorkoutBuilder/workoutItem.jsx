// WorkoutItem.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const WorkoutItem = ({ exercise, index }) => {
    return (
        <Draggable draggableId={exercise.id.toString()} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="w-full mb-4 flex-none"
                    style={{ ...provided.draggableProps.style }}
                >
                    <h2 className="text-left font-axiom font-bold mb-1">{exercise.title}</h2>
                    <figure className="flex flex-row items-start">
                        <div className="flex-none w-48">
                            <img
                                draggable={"false"}
                                className="w-full h-24 object-contain hover:border-red-500 cursor-pointer"
                                src={exercise.imageUrl || 'placeholder.png'}
                                alt={exercise.title}
                            />
                        </div>
                        <div className="min-w-0 flex-grow p-1 ml-4">
                            <ul className="list-decimal list-inside mt-2">
                                {exercise.steps.map((step, stepIndex) => (
                                    <li key={stepIndex}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    </figure>
                </div>
            )}
        </Draggable>
    );
};

export default WorkoutItem;