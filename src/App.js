import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataService from './services/Data';
import TypeAlong from './games/TypeAlong';

class App extends Component {
  dataService = new DataService();
  current = "";
  constructor() {
    super();
    this.current = this.dataService.chooseCharacter();
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <TypeAlong/>
        </div>
      </div>
    );
  }
}

export default App;
