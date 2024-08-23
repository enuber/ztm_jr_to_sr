import React from 'react';

//props
//state
//children. CardList is the child of Scroll. children is everything within what Scroll is wrapping

const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: 'scroll',
        height: '800px',
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
