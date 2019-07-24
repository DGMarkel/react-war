import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state={
      startGame: false,
    }
  }

  render() {
    return (
      <div className="War!">
        {
          this.state.startGame
            ? <Game />
            : <button>Let's Play!</button>
        }
      </div>
    );
  }

}

export default App;
