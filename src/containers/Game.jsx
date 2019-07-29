import React, { Component } from 'react'

class Game extends Component {
  constructor() {
    super();
    this.state={
      deck: [],
      playerOne: [1,2,3,5,6,9,10,11,12], // hands are dealt after user hits deal button
      playerTwo: [2,3,3,4,2,7,11,10,9],
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
      if (playerOneCard > playerTwoCard) {

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
      else if (playerTwoCard > playerOneCard) {

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
    // moves winner's played cards and take to bottom of winner's deck
    return winningDeck.slice(i + 1).concat(winningDeck.slice(0, i + 1), losingDeck.slice(0, i + 1))
  }

  war = () => {
    console.log("war!")
    // while players cards match at every third card on table, play war.
    for (let i = 2; i < 17 ; i += 3) {
      if (this.state.playerOne[i] > this.state.playerTwo[i]) {
        this.setState( prevState => ({
          playerOne: this.warWinner(prevState.playerOne, prevState.playerTwo, i),
          playerTwo: prevState.playerTwo.slice(i + 1) // add one to index to i to slice appropriate number of cards from deck
        }))
        return console.log(`playerOne won ${i + 1} cards!`)
      }
      else if (this.state.playerTwo[i] > this.state.playerOne[i]) {
        this.setState( prevState => ({
          playerOne: prevState.playerOne.slice(i + 1), // add one to index to i to slice appropriate number of cards from deck
          playerTwo: this.warWinner(prevState.playerTwo, prevState.playerOne, i)
        }))
        return console.log(`playerTwo won ${i + 1} cards!`)
      }
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
