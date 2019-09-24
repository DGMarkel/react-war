import React, { Component } from 'react'
import Menu from '../components/Menu'
import StatusMessages from '../components/StatusMessages'
import War from './War'

export default class Menu extends Component {

  constructor() {
    super();
    this.state={
      gameType: ''
    }
  }

  displayMenuOrGame = () => {
    // super simplified version of what this container will eventually function like
    return (
      <div className="menu">
      {
        this.state.gameType
          ? <War />
          : <button onClick={() => {this.setState({gameType: 'war'})}}>Let's Play!</button>
      }
      </div>
    )
  }



  // render() {
  //   return (
  //     <div className="board">
  //       {
  //         // this is the "table" where games will be played
  //       }
  //       <StatusMessages />
  //       { // component will display messages like "player one wins," etc.
  //         // <GameInPlay /> component will display cards being played
  //         // <PlayerDeck /> component will display each deck and number of cards in deck
  //       }
  //       <Menu />
  //       {
  //         // component will display buttons like "Play game" "Play again" etc
  //       }
  //     </div>
  //   )
  // }

  render () {
    return (
      <div>
        { this.displayMenuOrGame() }
      </div>
    )
  }

}
