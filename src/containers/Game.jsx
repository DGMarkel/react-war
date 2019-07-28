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

      // playerOne wins the turn
      if (playerOneCard > playerTwoCard && playerOneCard !== playerTwoCard) {

        this.setState( prevState => (
          {
            // moves winner's take to bottom of their deck
            playerOne: this.winningCard(prevState.playerOne).concat(prevState.playerTwo[0]),
            playerTwo: prevState.playerTwo.slice(1)  // removes losing card from loser's deck
          }
        ))
        console.log("player one wins the turn")
      }

      // playerTwo wins the turn
      else if (playerTwoCard > playerOneCard && playerTwoCard !== playerOneCard) {

        this.setState( prevState => (
          {
            // moves winner's take to bottom of their deck
            playerTwo: this.winningCard(prevState.playerTwo).concat(prevState.playerOne[0]),
            playerOne: prevState.playerOne.slice(1)  // removes losing card from loser's deck
          }
        ))
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
    let winningDeck = deck.slice(1)
    winningDeck.push(deck[0])
    return winningDeck
  }

  warWinner = (winningDeck, losingDeck, i) => {
    // moves winning cards to bottom of winner's deck
    return winningDeck.slice(i + 1).concat(winningDeck.slice(0, i + 1), losingDeck.slice(0, i + 1))
  }

  war = () => {
    console.log("war!")
    for (let i = 2; i < 17 ; i += 3) {
      if (this.state.playerOne[i] > this.state.playerTwo[i]) {
        this.setState( prevState => ({
          playerOne: this.warWinner(prevState.playerOne, prevState.playerTwo, i),
          playerTwo: prevState.playerTwo.slice(i + 1)
        }))
        return console.log("playerOne Wins!")
      }
      else if (this.state.playerTwo[i] > this.state.playerOne[i]) {
        this.setState( prevState => ({
          playerOne: prevState.playerOne.slice(i + 1),
          playerTwo: this.warWinner(prevState.playerTwo, prevState.playerOne, i)
        }))
        return console.log("playerTwo Wins!")
      }
      else if (this.state.playerTwo[i + 3] === this.state.playerOne[i + 3]) {
        return this.war()
      }
    }
    // let warCounter = 1 // consecutive number of times war has is played in a single turn
    // let playerOne = this.state.playerOne.slice(0,3 * warCounter) // cards player one puts in play -- warCounter determines number of cards in play
    // let playerTwo = this.state.playerTwo.slice(0,3 * warCounter) // cards player two puts in play
    // let losingHand
    //
    // if (playerOne[playerOne.length - 1] > playerTwo[playerTwo.length - 1]) {
    //   losingHand = this.state.playerTwo.slice(3 * warCounter) // cards remaining in losing deck after war is played
    //   console.log("player one wins the turn")
    //
    //   this.setState({
    //       playerOne: this.warWinner(this.state.playerOne, this.state.playerTwo, warCounter),
    //       playerTwo: losingHand
    //     })
    // }
    //
    // else if (playerOne[playerOne.length - 1] < playerTwo[playerTwo.length - 1]) {
    //   losingHand = this.state.playerOne.slice(3 * warCounter) // cards remaining in losing deck after war is played
    //   console.log("player two wins the turn")
    //
    //   this.setState({
    //     playerOne: losingHand,
    //     playerTwo: this.warWinner(this.state.playerTwo, this.state.playerOne, warCounter)
    //   })
    // }
    //
    // else if (playerOne[playerOne.length - 1] === playerTwo[playerTwo.length -1]) {
    //   // if war must be played again, add 1 to warCounter and call war method
    //   // buggy...war gets called in infinite loop...probably issue with warCounter
    //   warCounter++
    //   this.war();
    // }
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
