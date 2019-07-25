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
    // builds deck of cards with 4 suits of 13 cards
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

  playCard = () => {
    this.winner(); // checks to see if either player has won
    if (!this.state.winner) {
      let playerOneCard = this.state.playerOne[0];
      let playerTwoCard = this.state.playerTwo[0];
      let losingHand

      // playerOne wins the turn
      if (playerOneCard > playerTwoCard && playerOneCard !== playerTwoCard) {
        // removes losing card from loser's deck
        losingHand = this.state.playerTwo.slice(1)

        this.setState(
          {
            // moves winner's take to bottom of their deck
            playerOne: this.winningCard(this.state.playerOne).concat(this.state.playerTwo[0]),
            playerTwo: losingHand
          }
        )
        console.log("player one wins the turn")
      }

      // playerTwo wins the turn
      else if (playerTwoCard > playerOneCard && playerTwoCard !== playerOneCard) {
        // removes losing card from loser's deck
        losingHand = this.state.playerOne.slice(1)

        this.setState(
          {
            // moves winner's take to bottom of their deck
            playerTwo: this.winningCard(this.state.playerTwo).concat(this.state.playerOne[0]),
            playerOne: losingHand
          }
        )
        console.log("player two wins the turn")

      }
      // players draw the same card
      else if (playerOneCard === playerTwoCard) {
        this.war();
      }
    }
  }

  // moves winning card to bottom of winner's deck
  winningCard = deck => {
    let winning = deck.slice(1)
    winning.push(deck[0])
    return winning
  }

  warWinner = (winningDeck, losingDeck, warCounter) => {
    // moves winning cards to bottom of winner's deck
    return winningDeck.slice(3 * warCounter).concat(winningDeck.slice(0, 3 * warCounter), losingDeck.slice(0, 3 * warCounter))
  }

  war = () => {
    console.log("war!")
    let playerOne = this.state.playerOne.slice(0,3)
    let playerTwo = this.state.playerTwo.slice(0,3)
    let warCounter = 1
    let losingHand

    if (playerOne[2] > playerTwo[2]) {
      losingHand = this.state.playerTwo.slice(3 * warCounter)
      console.log("player one wins the turn")

      this.setState({
          playerOne: this.warWinner(this.state.playerOne, this.state.playerTwo, warCounter),
          playerTwo: losingHand
        })
    }

    else if (playerOne[2] < playerTwo[2]) {
      losingHand = this.state.playerOne.slice(3 * warCounter)
      console.log("player two wins the turn")

      this.setState({
        playerOne: losingHand,
        playerTwo: this.warWinner(this.state.playerTwo, this.state.playerOne, warCounter)
      })
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
        <button onClick={()=>{this.playCard()}}>Play a turn</button>
      </div>
    )
  }
}

export default Game
