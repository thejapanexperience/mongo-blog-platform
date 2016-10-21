import React, { Component } from 'react'
import {Link} from 'react-router'
import Navbar from './Navbar'
import Landing from './Landing'

export default class Layout extends Component {
  render () {
    return (

      <div>
        <br/>
        <Navbar />
        <br/>
        <div className="container">
        </div>

        <div id='main'>{this.props.children}</div>
      </div>
    );
  }
}
