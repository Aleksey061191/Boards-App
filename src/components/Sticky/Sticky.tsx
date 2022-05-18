import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cl from './Sticky.module.scss';

interface StickyProps {
  children: ReactNode;
}

function Sticky({ children }: StickyProps): JSX.Element {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);

  const handleScroll = () => {
    if (ref.current) {
      setIsSticky(-(ref.current as HTMLElement).getBoundingClientRect().top > 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <div className={`${cl.stickyWrapper} ${isSticky && cl.sticky}`} ref={ref}>
      <div className={cl.stickyInner}>{children}</div>
    </div>
  );
}

export default Sticky;
