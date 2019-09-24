import React, { Component } from 'react'
import War from './War'

export default class Board extends Component {

  selectedGame = () => {

    switch(this.props.game) {
      case 'War':
        return < War/>
      }
    }

  render () {
    return (
      <div>
        {
          this.selectedGame()
        }
      </div>
    )
  }

}
