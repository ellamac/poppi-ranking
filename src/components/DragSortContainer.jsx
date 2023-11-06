import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../styles/dragSortContainer.css';
import '../styles/tracks.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragSortContainer = ({ children }) => {
  const [items, setItems] = useState(children);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setItems((prev) =>
      reorder(items, result.source.index, result.destination.index)
    );
  };
  if (!items || items.length <= 0) return <p>loading...</p>;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable-1'>
        {(provided, snapshot) => (
          <section
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              snapshot.isDraggingOver
                ? 'droppable draggingOver tracks'
                : 'droppable tracks'
            }
          >
            {items.map((item, index) => (
              <Draggable
                key={`draggable-${index}`}
                draggableId={`draggable-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <section
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                      snapshot.isDragging
                        ? 'draggable isDragging'
                        : 'draggable '
                    }
                  >
                    {React.cloneElement(item, {
                      order: index + 1,
                    })}
                  </section>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragSortContainer;
