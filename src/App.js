import React, { Component } from 'react';

import Game from './containers/Game'

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
            : <button onClick={() => {this.setState({startGame: true})}}>Let's Play!</button>
        }
      </div>
    );
  }

}

export default App;
