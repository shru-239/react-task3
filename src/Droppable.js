import React from 'react';
import { Droppable as BeautifulDroppable } from 'react-beautiful-dnd';

const Droppable = ({ children, droppableId, ...props }) => (
  <BeautifulDroppable droppableId={droppableId} {...props}>
    {(provided, snapshot) => children(provided, snapshot)}
  </BeautifulDroppable>
);

export default Droppable;
