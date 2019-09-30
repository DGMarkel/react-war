import React, { Component } from 'react'
import StatusMessages from '../components/StatusMessages'
import War from './War'

export default class Board extends Component {

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

  display = () => {
    switch (this.state.gameType) {
      case '':
        return this.gameMenu()
      case 'War':
        return <War />
    }
  }

  render () {
    return (
      <div>
        {
          this.display()
        }
      </div>
    )
  }

}
