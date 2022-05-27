import React from 'react';
import { useDrop } from 'react-dnd';

interface IDropwrapperParams {
  children: JSX.Element;
}

const DropWrapper = ({ children }: IDropwrapperParams) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return <div ref={drop}>{React.cloneElement(children, { isOver })}</div>;
};

export default DropWrapper;
