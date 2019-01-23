/// Style
import './App.css';
/// Components
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
/// Librairies
import React, { Component } from 'react';
import Particles from 'react-particles-js';

import { serverBaseUrl } from './Constants.js';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}
// https://samples.clarifai.com/face-det.jpg
const initialState = {
  input:'',
  imgUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id : '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (newUser) => {
    this.setState({
      user: {
        id : newUser.id,
        name: newUser.name,
        email: newUser.email,
        entries: newUser.entries,
        joined: newUser.joined
      }
    })
  }

  computeFaceLocation = (regions) => {
    const clarifaiFaces = regions[0].region_info.bounding_box;
    return {
      leftCol: clarifaiFaces.left_col * 100,
      rightCol: 100 - clarifaiFaces.right_col * 100,
      topRow: clarifaiFaces.top_row * 100,
      bottomRow: 100 - clarifaiFaces.bottom_row * 100,
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonDetect = () => {
    this.setState({imgUrl: this.state.input});
    fetch(serverBaseUrl +'/imageurl/', {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input:this.state.input
      })
    }).then(response => response.json())
      .then((response) => {
        if (response) {
          fetch(serverBaseUrl + '/image/' + this.state.user.id, {
              method:'put'
          })
            .then(res => res.json())
            .then(newEntries => {
              this.setState(
                Object.assign(this.state.user, {entries: newEntries})
              );
            })
            .catch(console.log);
          // do something with response
          this.displayFaceBox(
            this.computeFaceLocation(response.outputs[0].data.regions)
          )
        }
      })
      .catch(console.log);
  }

  onRouteChange = (newRoute) => {
    if (newRoute === 'home') {
      this.setState({isSignedIn:true})
    }
    else {
      this.setState(initialState);
    }
    this.setState({route:newRoute});
  }

  render() {
    const {name, entries} = this.state.user;
    return (
      <div className="App">
        <Particles 
          className='particules'
          params={particlesOptions}
        />
        <Logo />
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {
          this.state.route === 'home' ?
            <div>
              <Rank 
                username={name}
                entries={entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonDetect={this.onButtonDetect}
              />
              <FaceRecognition 
                box={this.state.box}
                imgSrc={this.state.imgUrl}
              />
            </div>
            :
            (
              this.state.route === 'signin' ?
                <SignIn 
                  onRouteChange={this.onRouteChange} 
                  loadUser={this.loadUser} 
                />
                :
                <Register 
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser} 
                />
            )
        }
      </div>
    );
  }
}

export default App;
