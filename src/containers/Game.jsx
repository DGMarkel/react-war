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

  componentDidMount() {
    for (let i = 0; i<=3; i++) {
      this.setState(prevState => ({
          deck: [...prevState.deck.concat(Array.from({length: 13}, (v, k) => k + 1 ))]
      }))
    }
  }

  shuffleDeck = () => {
    let deck = this.state.deck
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [deck[i], deck[j]] = [deck[j], deck[i]]; // swap elements
    }
    this.setState({
      deck: deck
    })
  }

  deal = () => {
    for(let i = 0; i <= 51; i++) {
      (i % 2 === 0)
        ? this.setState(prevState => ({ playerOne: [...prevState.playerOne.concat(this.state.deck[i])]}))
        : this.setState(prevState => ({ playerTwo: [...prevState.playerTwo.concat(this.state.deck[i])]}))
    }
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
