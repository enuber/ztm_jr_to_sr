import React, { Component, ReactNode } from 'react';

interface ErrorBoundryState {
  hasError: boolean;
}

class ErrorBoundry extends Component<
  { children: ReactNode },
  ErrorBoundryState
> {
  state: ErrorBoundryState = {
    hasError: false,
  };

  // kind of like try catch, gets error and info as params
  // Error is built in JS type
  // React.ErrorInfo - provided by React type definitions so is called with React before.
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ hasError: true });
    // You could also log the error to an error reporting service here
    console.error('Error caught in ErrorBoundry:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops...that is not good.</h1>;
    } else {
      return <>{this.props.children}</>;
    }
  }
}

export default ErrorBoundry;
