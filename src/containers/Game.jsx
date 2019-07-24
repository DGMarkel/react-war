import React, { Component } from 'react'

class Game extends Component {
  constructor() {
    super();
    this.state={
      deck: Array.from({length: 52}, (v, k) => k + 1 ),
      playerOne: [],
      playerTwo: [],
    }
  }

  shuffleDeck = () => {
    this.setState(
      {
        deck: Array.from({length: 52}, (v, k) => k + 1 )
      }
    )
  }

  deal = () => {
    for(let i = 1; i <= 52; i++) {
      (i % 2 == 0)
        ? this.setState(prevState => ({ playerOne: [...prevState.playerOne.concat(i)]}))
        : this.setState(prevState => ({ playerTwo: [...prevState.playerTwo.concat(i)]}))
    }
    this.setState({
      deck: []
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="game">
        <h1>New Game!</h1>
        <button onClick={()=>{this.shuffleDeck()}}>Shuffle!</button>
        <button onClick={()=>{this.deal()}}>Deal Cards!</button>
      </div>
    )
  }
}

export default Game
