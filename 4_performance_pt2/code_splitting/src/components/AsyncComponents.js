import React, { Component } from 'react';

// HOC = a function that returns another component/function

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    state = {
      component: null,
    };

    async componentDidMount() {
      // note just destructuring default off and changing the name to component
      const { default: component } = await importComponent();
      this.setState({ component: component });
    }

    render() {
      const { component: Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
