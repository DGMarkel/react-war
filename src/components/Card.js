import React, { Component } from 'react'
import '../index.css'

export default class Card extends Component {
   render() {
     return (
       <div>
        <p>{this.props.rank}</p>
       </div>
     )
   }
}
