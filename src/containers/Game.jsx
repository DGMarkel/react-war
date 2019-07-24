import React, { Component } from 'react'

class Game extends Component {
  constructor() {
    super();
    this.state={
      deck: [],
      playerOne: [],
      playerTwo: [],
      gameIsInPlay: false,
      winner: false,
    }
  }

  componentDidMount() {
    for (let i = 0; i<=3; i++) {
      this.setState(prevState => ({
          deck: [...prevState.deck.concat(Array.from({length: 13}, (v, k) => k + 1 ))]
      }))
    }
  }

  shuffleCards = () => {
    let deck = this.state.deck
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [deck[i], deck[j]] = [deck[j], deck[i]]; // swap elements
    }
    this.setState({
      deck: deck
    })
  }

  dealCards = () => {
    for(let i = 0; i <= 51; i++) {
      (i % 2 === 0)
        ? this.setState(prevState => ({ playerOne: [...prevState.playerOne.concat(this.state.deck[i])]}))
        : this.setState(prevState => ({ playerTwo: [...prevState.playerTwo.concat(this.state.deck[i])]}))
    }
  }

  turn = () => {
    this.winner();
    if (!this.state.winner) {
      let playerOneCard = this.state.playerOne[0];
      let playerTwoCard = this.state.playerTwo[0];

      if (playerOneCard > playerTwoCard && playerOneCard !== playerTwoCard) {
        this.setState(prevState => (
          {
            playerOne: [...prevState.playerOne.concat(this.state.playerTwo[0])],
            playerTwo: [...prevState.playerTwo.shift()]
          }
        ))
      }
      if (playerTwoCard > playerOneCard && playerTwoCard !== playerOneCard) {
        this.setState(prevState => (
          {
            playerTwo: [...prevState.playerTwo.concat(this.state.playerOne[0])],
            playerOne: [...prevState.playerOne.shift()]
          }
        ))
      }
      else if (playerOneCard === playerTwoCard) {
        this.war();
      }
    }
  }

  war = () => {

  }

  winner = () => {
    let winner = "The game is still in play";
    if (this.state.playerOne.length === 0 && this.state.gameIsInPlay) {
      this.setState({
        winner: true
      })
      winner = "Player One"
    }
    if (this.state.playerTwo.length === 0 && this.state.gameIsInPlay) {
      this.setState({
        winner: true
      })
      winner = "Player Two"
    }
    console.log(winner)
  }

  render() {
    console.log(this.state)
    return (
      <div className="game">
        <h1>New Game!</h1>
        <button onClick={()=>{this.shuffleCards()}}>Shuffle!</button>
        <button onClick={()=>{this.dealCards()}}>Deal Cards!</button>
      </div>
    )
  }
}

export default Game
