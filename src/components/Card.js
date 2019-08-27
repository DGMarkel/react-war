import React, { Component } from 'react'
import '../index.css'

export default class Card extends Component {
   render() {
     console.log(this.props)
     return (
       <div className="card">
        <p>{this.props.rank}</p>
       </div>
     )
   }
}
