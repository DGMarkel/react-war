import React, { Component } from 'react';

import War from './containers/War'

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
            ? <War />
            : <button onClick={() => {this.setState({startGame: true})}}>Let's Play!</button>
        }
      </div>
    );
  }

}

export default App;
