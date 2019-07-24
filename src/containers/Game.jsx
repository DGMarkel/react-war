import React, { Component } from 'react'

class Game extends Component {
  constructor() {
    super();
    this.state={
      deck: [],
      playerOne: [],
      playerTwo: [],
    }
  }

  render() {
    return (
      <div className="game">
        <h1>New Game!</h1>
      </div>
    )
  }
}

export default Game
