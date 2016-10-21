import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

import Store from '../stores/Store';
import ToAPIActions from '../actions/ToAPIActions';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: Store.getDetails()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    Store.startListening(this._onChange);
  }

  componentWillUnmount () {
    Store.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      details: Store.getDetails()
    });
  }


  render () {

    let { details } = this.state

    console.log('details: ', details)

    if(!details) {
      return(
        <div className='container'><h1>No Details</h1></div>
      )
    } if (details.length === 0) {
      return(
        <div className="container">
          <h1>There are no animals attached to this user</h1>
        </div>
      )
    } else if (details.length > 0) {
      return(
        <div className="container">
          <h1>{details[0].clientName}</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Animal Type</th>
                <th>Animal Name</th>
                <th>Animal Age</th>
              </tr>
            </thead>
            <tbody>
              {details.map((animal) => {
                return(
                  <tr key={animal.animalId}>
                    <td>{animal.type}</td>
                    <td>{animal.name}</td>
                    <td>{animal.age}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
    }
}
