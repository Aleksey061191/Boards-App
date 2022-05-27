import React, { ReactNode } from 'react';

interface IColParams {
  isOver?: boolean;
  children: ReactNode;
}

const Col = ({ isOver, children }: IColParams) => {
  const style = {
    minHeight: '100px',
    backgroundColor: isOver ? '#e7e7e7' : '',
  };

  return <div style={style}>{children}</div>;
};

export default Col;
