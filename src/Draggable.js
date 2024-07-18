import React from 'react';
import { Draggable as BeautifulDraggable } from 'react-beautiful-dnd';

const Draggable = ({ children, draggableId, index, ...props }) => (
  <BeautifulDraggable draggableId={draggableId} index={index} {...props}>
    {(provided, snapshot) => children(provided, snapshot)}
  </BeautifulDraggable>
);

export default Draggable;
