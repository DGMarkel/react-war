import React, { Component } from 'react'
import '../index.css'

export default class Card extends Component {
   render() {
     return (
       <div className={this.props.className}>
        <p>{this.props.rank}</p>
       </div>
     )
   }
}
