import React, { Component } from 'react'
import Card from '../components/Card'
import StatusMessages from '../components/StatusMessages'

class War extends Component {
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
    this.baseState = this.state // used to reset empty state when players start a new game after a win
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
      gameIsInPlay: true,
      deck: []
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
      let playerOneCard = this.state.playerOne[0]; // selects card from top of player's deck
      let playerTwoCard = this.state.playerTwo[0]; // selects card from top of player's deck
      this.setState({
        cardsInPlay: [playerOneCard, playerTwoCard] // sets cards in player from above
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
        playerOne: this.wonCards(prevState.playerOne).concat(prevState.cardsInPlay[1]), // adds lost card to bottom of winner's deck
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
        playerTwo: this.wonCards(prevState.playerTwo).concat(prevState.cardsInPlay[0]), // adds lost card to bottom of winner's deck
        playerOne: prevState.playerOne.slice(1),  // removes losing card from loser's deck
        gameState: "player two wins the turn"
      }
    ))
    this.displayCard()
  }

  // moves winning card to bottom of winner's deck
  wonCards = deck => {
    let winningDeck = deck.slice(1)
    winningDeck.push(deck[0])
    return winningDeck
  }

  wonCardsInWar = (winningDeck, losingDeck, i) => {
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
        // if either player has < 3 cards for war, plays last card in deck; otherwise, plays 3rd card in deck
        this.state.playerOne[i] === undefined ? playerOne = this.state.playerOne.length - 1 : playerOne =  this.state.playerOne[i]
        this.state.playerTwo[i] === undefined ? playerTwo = this.state.playerTwo.length - 1 : playerTwo =  this.state.playerTwo[i]


        if (playerOne > playerTwo) {
          this.setState( prevState => ({
            playerOne: this.wonCardsInWar(prevState.playerOne, prevState.playerTwo, i),
            playerTwo: prevState.playerTwo.slice(i + 1) // add one to index to i to slice appropriate number of cards from deck
          }))
          return console.log(`playerOne won ${i + 1} cards!`)
        }
        else if (playerTwo > playerOne) {
          this.setState( prevState => ({
            playerOne: prevState.playerOne.slice(i + 1), // add one to index to i to slice appropriate number of cards from deck
            playerTwo: this.wonCardsInWar(prevState.playerTwo, prevState.playerOne, i)
          }))
          return console.log(`playerTwo won ${i + 1} cards!`)
        }
      }
  }

  winner = () => {
    if (this.state.playerOne.length === 0 && this.state.gameIsInPlay) {
      this.setState({
        winner: true,
        gameState: "Player Two Wins!"
      })
    }
    if (this.state.playerTwo.length === 0 && this.state.gameIsInPlay) {
      this.setState({
        winner: true,
        gameState: "Player One Wins!"
      })
    }
  }

  displayCard = () => {
    return (
      <div className="cards-display">
        <div>
          {this.state.cardsInPlay.map( card => <Card rank={card} />)}
        </div>
        <div>
          <button onClick={()=>{this.playCard()}}>Play a turn</button>
        </div>
      </div>
    )
  }

  displayNewGameOptions = () => {
    return (
      <div className="menu">
        <h1>New Game!</h1>
        <button onClick={()=>{this.shuffleCards()}}>Shuffle!</button>
        <button onClick={()=>{this.dealCards()}}>Deal Cards!</button>
      </div>
    )
  }

  render() {
    return (
      <div className="board">
        <div className="game">
          {
            // if the game is in play, display cards in play; otherwise, display new game options
            this.state.gameIsInPlay ? this.displayCard() : this.displayNewGameOptions()
          }
          {
            // if the game is won, render "Play again" button
            this.state.winner
              ? <button onClick={()=>{
                  this.setState(this.baseState);
                  this.displayNewGameOptions();
                }}>
                  Play Again?
                </button>
              : <p></p>
          }
        </div>
        <div className="messages">
          <StatusMessages gameState={this.state.gameState}/>
        </div>
      </div>
    )
  }
}

export default War
