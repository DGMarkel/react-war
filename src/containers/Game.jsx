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
    this.setState({
      gameIsInPlay: true
    })
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
      let losingHand
      let winningHand

      if (playerOneCard > playerTwoCard && playerOneCard !== playerTwoCard) {
        losingHand = this.state.playerTwo.slice(1)

        this.setState(prevState => (
          {
            playerOne: this.winningHand(this.state.playerOne).concat(this.state.playerTwo[0]),
            playerTwo: losingHand
          }
        ))
        console.log("player one wins the turn")
      }
      else if (playerTwoCard > playerOneCard && playerTwoCard !== playerOneCard) {
        losingHand = this.state.playerOne.slice(1)
        this.winningHand(this.state.playerTwo)
        this.setState(prevState => (
          {
            playerTwo: this.winningHand(this.state.playerTwo).concat(this.state.playerOne[0]),
            playerOne: losingHand
          }
        ))
        console.log("player two wins the turn")

      }
      else if (playerOneCard === playerTwoCard) {
        this.war();
      }
    }
  }

  winningHand = hand => {
    let winning = hand.slice(1)
    winning.push(hand[0])
    return winning
  }

  war = () => {
    console.log("war!")
    let playerOne = this.state.playerOne.slice(0,3)
    let playerTwo = this.state.playerTwo.slice(0,3)
    let warCounter = 1
    let losingHand

    if (playerOne[2] > playerTwo[2]) {
      losingHand = this.state.playerTwo.slice(3 * warCounter)
      console.log(losingHand)
      console.log("player one wins the turn")
      this.setState(prevState => ({
        playerOne: [...prevState.playerOne.concat(playerTwo)],
        playerTwo: losingHand
      }))
    }
    else if (playerOne[2] < playerTwo[2]) {
      losingHand = this.state.playerOne.slice(3 * warCounter)
      console.log(losingHand)
      console.log("player two wins the turn")
      this.setState(prevState => ({
        playerOne: losingHand,
        playerTwo: [...prevState.playerTwo.concat(playerOne)]
      }))
    }
    else {
      warCounter++
      this.war();
    }
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
        <button onClick={()=>{this.turn()}}>Play a turn</button>
      </div>
    )
  }
}

export default Game
