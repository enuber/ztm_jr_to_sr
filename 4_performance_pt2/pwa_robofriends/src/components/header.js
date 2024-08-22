import React, { Component } from 'react';

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return <h1 className="f1">RoboFriends</h1>;
  }
}

export default Header;

// Below is better code.
// import React from 'react';

// // React.memo is used to prevent unnecessary re-renders
// const Header = React.memo(() => {
//   return <h1 className="f1">RoboFriends</h1>;
// });

// export default Header;
