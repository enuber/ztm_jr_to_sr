import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';

import './App.css';

// const returnClarafiaRequestOptions = (imgURL) => {
//   const PAT = 'dca58c86145443cb840b66346e8cbc7b';
//   const USER_ID = 'enuber';
//   const APP_ID = 'face-recognition-24';
//   const IMAGE_URL = imgURL;

//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//           },
//         },
//       },
//     ],
//   });
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Key ' + PAT,
//     },
//     body: raw,
//   };
//   return requestOptions;
// };

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    email: '',
    id: '',
    name: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  state = {
    input: '',
    imageURL: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      email: '',
      id: '',
      name: '',
      entries: 0,
      joined: '',
    },
  };

  //may give you a CORS error, in order to run localhost and do this need ot install CORS into the node/expres server
  // this is just showing it connects the server and we get back some data. This is based on both the server running as well as this app running.
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (evt) => {
    this.setState({ input: evt.target.value });
  };

  calculateFaceLocations = (data) => {
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    const list = data.outputs[0].data.regions;
    const bounding_boxes = [];
    list.forEach((item) => {
      const faceLoc = item.region_info.bounding_box;
      bounding_boxes.push({
        leftCol: faceLoc.left_col * width,
        topRow: faceLoc.top_row * height,
        rightCol: width - faceLoc.right_col * width,
        bottomRow: height - faceLoc.bottom_row * height,
      });
    });
    return bounding_boxes;
  };

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onBtnSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch(`http://localhost:3000/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id }),
          })
            .then((res) => res.json())
            .then((count) => {
              this.setState((prevState) => ({
                user: {
                  ...prevState.user,
                  entries: count,
                },
              }));
            })
            .catch((error) => console.log('error', error));
        }
        this.displayFaceBoxes(this.calculateFaceLocations(data));
      })
      .catch((error) => console.log('error', error));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, boxes, input } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="polygon" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              input={input}
              onBtnSubmit={this.onBtnSubmit}
            />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </>
        ) : route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
