import React, { ReactNode } from 'react';

// ReactNode: The children prop can be more than just a single JSX.Element. It can be a string, number, or array of elements. ReactNode is a more comprehensive type for this.
type Props = {
  // children?: JSX.Element;
  children?: ReactNode;
};

//props
//state
//children. CardList is the child of Scroll. children is everything within what Scroll is wrapping

const Scroll: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        overflowY: 'scroll',
        height: '800px',
      }}
    >
      {children}
    </div>
  );
};

export default Scroll;
