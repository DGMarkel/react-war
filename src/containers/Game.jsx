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

  shuffleDeck = () => {
    this.setState(
      {}
    )
  }

  deal = () => {
    for(let i = 0; i <= 52; i++) {
      i % 2 == 0
      ? this.setState({ ...this.state, playerOne: [...this.state.playerOne, i]})
      : this.setState({ ...this.state, playerTwo: [...this.state.playerTwo, i]})
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
