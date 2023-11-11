/// ExerciseItem.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ExerciseItem = ({ exercise, isDropped, index }) => {
    if (isDropped) return null;

    return (
        <Draggable draggableId={exercise.id.toString()} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="card w-48 h-36 bg-base-100 shadow-xl p-1 cursor-pointer"
                >
            <div className="card-body p-3">
                <h2 className="font-axiom text-sm mb-1">{exercise.title}</h2>
            </div>
            <figure>
                <img
                    className="w-24 h-24 p-2 object-contain mx-auto"
                    src={exercise.imageUrl || 'placeholder.png'}
                    alt={exercise.title}
                />
            </figure>
                </div>
            )}
        </Draggable>
    );
};
export default ExerciseItem;