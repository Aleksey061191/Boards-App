import React, { ReactNode, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

interface IColParams {
  isOver?: boolean;
  children: ReactNode;
  indexColumn: number;
  columnId: string;
  moveItem: (
    dragIndex: number,
    hoverIndex: number,
    draggedColumnIndex: number,
    targetColumnIndex: number,
    draggedColumnId: string,
    targetColumnId: string,
    taskId: string
  ) => void;
}

interface IItems {
  boardId: string;
  columnId: string;
  description: string;
  id: string;
  index: number;
  order: number;
  title: string;
  userId: string;
  indexColumn: number;
}

const Col = (props: IColParams) => {
  const ref = useRef<HTMLInputElement>(null);

  // const [, drop] = useDrop({
  //   accept: 'task',
  //   hover(item: IItems, monitor) {
  //     console.log(123);
  //     const draggedColumnIndex = item.indexColumn;
  //     const targetColumnIndex = props.indexColumn;

  //     if (!ref.current) {
  //       return;
  //     }

  //     const dragIndex = item.index;
  //     // const hoverIndex = props.index;

  //     // if (dragIndex === hoverIndex && draggedColumnIndex === targetColumnIndex) {
  //     //   return;
  //     // }

  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  //     // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //     //   return;
  //     // }

  //     // if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
  //     //   return;
  //     // }

  //     const draggedColumnId = item.columnId;
  //     const targetColumnId = props.columnId;
  //     const taskId = item.id;
  //     props.moveItem(
  //       dragIndex,
  //       0,
  //       draggedColumnIndex,
  //       targetColumnIndex,
  //       draggedColumnId,
  //       targetColumnId,
  //       taskId
  //     );

  //     // item.index = hoverIndex;
  //     item.indexColumn = targetColumnIndex;
  //   },
  // });
  const style = {
    minHeight: '100px',
    height: '250px',
    overflow: 'auto',
    backgroundColor: props.isOver ? 'yellow' : '',
  };

  return (
    <div ref={ref} style={style}>
      {props.children}
    </div>
  );
};

export default Col;
