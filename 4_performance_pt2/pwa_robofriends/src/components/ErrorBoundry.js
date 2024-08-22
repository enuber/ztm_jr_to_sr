import React from 'react';

class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  // kind of like try catch, gets error and info as params
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops...that is not good.</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundry;
