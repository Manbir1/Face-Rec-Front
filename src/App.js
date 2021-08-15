import './App.css';
import Navigation from './Components/Navigations/Navigation';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import Rank from './Components/Rank/Rank.js';
import React from 'react';
import Clarifai from 'clarifai'
import SignIn from './Components/Sign In/SignIn';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '3205a361e9df455a9d05f0bc70350a09'
});

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict({
      id: "a403429f2ddf4b49b307e318f00e528b",
      version: "34ce21a40cc24b6b96ffee54aabff139",
    }, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response))
        if(response){
          return fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          });
        }
      }).then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
    const {isSignedIn, box, imageUrl, route} = this.state;
    return (
      <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          {route === 'home'
          ? <><Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
          <FaceRecognition box = {box} imageUrl={imageUrl}/></>
          :(
            route === 'signin'
            ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser ={this.loadUser}/>
          )
          }
      </div>  );
    }
}

export default App;
