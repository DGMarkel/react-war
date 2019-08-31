import React, { Component } from 'react'
import Card from '../components/Card'

class Game extends Component {
  constructor() {
    super();
    this.state={
      deck: [],
      playerOne: [], // hands are dealt after user hits deal button
      playerTwo: [],
      gameIsInPlay: false,
      cardsInPlay: [], // contains current cards in play only
      gameState: "", // string indicating winner of hand
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
      this.setState({
        cardsInPlay: [playerOneCard, playerTwoCard]
      })

      // playerOne wins the turn
      if (playerOneCard > playerTwoCard) {
        this.playerOneWins()
      }
      // playerTwo wins the turn
      else if (playerTwoCard > playerOneCard) {
        this.playerTwoWins()
      }
      // players draw the same card
      else if (playerOneCard === playerTwoCard) {
        this.setState({gameState: "war!"})
        this.war();
      }
    }
  }

  playerOneWins = () => {
    this.setState( prevState => (
      {
        // moves winner's take to bottom of their deck
        playerOne: this.winningCard(prevState.playerOne).concat(prevState.cardsInPlay[1]),
        playerTwo: prevState.playerTwo.slice(1),  // removes losing card from loser's deck
        gameState: "player one wins the turn"
      }
    ))
    this.displayCard()
  }

  playerTwoWins = () => {
    this.setState( prevState => (
      {
        // moves winner's take to bottom of their deck
        playerTwo: this.winningCard(prevState.playerTwo).concat(prevState.cardsInPlay[0]),
        playerOne: prevState.playerOne.slice(1),  // removes losing card from loser's deck
        gameState: "player two wins the turn"
      }
    ))
    this.displayCard()
  }

  // moves winning card to bottom of winner's deck
  winningCard = deck => {
    let winningDeck = deck.slice(1)
    winningDeck.push(deck[0])
    return winningDeck
  }

  warWinner = (winningDeck, losingDeck, i) => {
    // moves winner's played cards and take to bottom of winner's deck
    console.log(i)
    return winningDeck.slice(i + 1).concat(winningDeck.slice(0, i + 1), losingDeck.slice(0, i + 1))
  }

  war = () => {
    console.log("war!")
      // iterates through a 52 card deck by three cards per increment
      for (let i = 2; i < 17 ; i += 3) {
        let playerOne;
        let playerTwo;
        this.state.playerOne[i] === undefined ? playerOne = this.state.playerOne.length - 1 : playerOne =  this.state.playerOne[i]
        this.state.playerTwo[i] === undefined ? playerTwo = this.state.playerTwo.length - 1 : playerTwo =  this.state.playerTwo[i]


        if (playerOne > playerTwo) {
          this.setState( prevState => ({
            playerOne: this.warWinner(prevState.playerOne, prevState.playerTwo, i),
            playerTwo: prevState.playerTwo.slice(i + 1) // add one to index to i to slice appropriate number of cards from deck
          }))
          return console.log(`playerOne won ${i + 1} cards!`)
        }
        else if (playerTwo > playerOne) {
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

  displayCard = () => {
    return (
      <div>
        <button onClick={()=>{this.playCard()}}>Play a turn</button>
        {this.state.cardsInPlay.map( card => <Card rank={card} />)}
        <h1>{this.state.gameState}</h1>
      </div>
    )
  }

  displayNewGameOptions = () => {
    return (
      <div className="new-game">
        <h1>New Game!</h1>
        <button onClick={()=>{this.shuffleCards()}}>Shuffle!</button>
        <button onClick={()=>{this.dealCards()}}>Deal Cards!</button>
        <button onClick={()=>{this.playCard()}}>Play a turn</button>
      </div>
    )
  }

  render() {
    console.log(this.state)
    return (
      <div className="game">
        {this.state.gameIsInPlay ? this.displayCard() : this.displayNewGameOptions()}
      </div>
    )
  }
}

export default Game
