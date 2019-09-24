import React, { Component } from 'react'
import StatusMessages from '../components/StatusMessages'
import Board from './Board'

export default class Menu extends Component {

  constructor() {
    super();
    this.state={
      gameType: ''
    }
  }

  gameMenu = () => {
    return (
      <div className="menu">
        <button onClick={() => {this.setState({gameType:'War'})}}>War!</button>
        <button onClick={() => {this.setState({gameType: 'Solitaire'})}}>Solitaire!</button>
        { // second game to be developed later
        }
      </div>
    )
  }

  render () {
    console.log(this.state.gameType)
    return (
      <div>
        {
          this.state.gameType === "War"
            ? <Board game={this.state.gameType} />
            : this.gameMenu()
        }
      </div>
    )
  }

}
