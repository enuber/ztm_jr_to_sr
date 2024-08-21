import React, { Component } from 'react';
import './App.css';
import Page1 from './components/Page1';
import AsyncComponent from './components/AsyncComponents';

class App extends Component {
  state = {
    route: 'page1',
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  render() {
    const { route } = this.state;

    let RenderedComponent;
    if (route === 'page1') {
      RenderedComponent = Page1;
    } else if (route === 'page2') {
      RenderedComponent = AsyncComponent(() => import('./components/Page2'));
    } else if (route === 'page3') {
      RenderedComponent = AsyncComponent(() => import('./components/Page3'));
    } else {
      return <div>Loading...</div>;
    }

    return <RenderedComponent onRouteChange={this.onRouteChange} />;
  }
}

export default App;

///------------------------------------------------- revised code splitting

// import React, { Component } from 'react';
// import './App.css';
// import Page1 from './components/Page1';
// // remove for code splitting
// // import Page2 from './components/Page2';
// // import Page3 from './components/Page3';

// class App extends Component {
//   state = {
//     route: 'page1',
//     component: null,
//   };

//   onRouteChange = (route) => {
//     //no codesplitting...
//     // this.setState({ route: route });
//     //with code splitting
//     //note that you have to add the .default, recall that we are exporting the pages as defalt, so this is just the dynamic way to access them. when importing a module the result is an object that has the default property which holds the default export of that module.
//     if (route === 'page1') {
//       this.setState({ route: route });
//     } else if (route === 'page2') {
//       import('./components/Page2').then((Page2) =>
//         this.setState({ route: route, component: Page2.default })
//       );
//     } else if (route === 'page3') {
//       import('./components/Page3').then((Page3) =>
//         this.setState({ route: route, component: Page3.default })
//       );
//     }
//   };

//   render() {
//     // code-splitting - we start on page 1, if it's page 1 we do what is expected, else do something different that is new for us
//     if (this.state.route === 'page1') {
//       return <Page1 onRouteChange={this.onRouteChange} />;
//     } else {
//       // because of onRouteChange setting the state to Page2 or Page3 it's basically same as above just a bit different looking.
//       return <this.state.component onRouteChange={this.onRouteChange} />;
//     }
//   }
// }

// export default App;

///---------------------------------------------------original version

// import { useState } from 'react';
// import './App.css';
// import Page1 from './components/Page1';
// import Page2 from './components/Page2';
// import Page3 from './components/Page3';

// const App = () => {
//   const [route, setRoute] = useState('page1');

//   const onRouteChange = (route) => {
//     setRoute(route);
//   };

//   return (
//     <>
//       {route === 'page1' && <Page1 onRouteChange={onRouteChange} />}
//       {route === 'page2' && <Page2 onRouteChange={onRouteChange} />}
//       {route === 'page3' && <Page3 onRouteChange={onRouteChange} />}
//     </>
//   );
// };

// export default App;
