import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

import Store from '../stores/Store';
import ToAPIActions from '../actions/ToAPIActions';

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: Store.getAnimals(),
      clients: Store.getClients(),
    };
    this._onChange = this._onChange.bind(this);
    this._seeNames = this._seeNames.bind(this);
    this._getDetails = this._getDetails.bind(this);
  }

  componentWillMount () {
    Store.startListening(this._onChange);
    ToAPIActions.getBoth()
  }

  componentWillUnmount () {
    Store.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      animals: Store.getAnimals(),
      clients: Store.getClients(),
    });
  }

  _seeNames () {
    ToAPIActions.seeNames()
  }

  _getDetails (id) {
    console.log('id: ', id)
    ToAPIActions.getDetails(id)
  }


  render () {

    let { animals, clients } = this.state

    let clientDropdown
    let clientsList
    console.log('clients: ', clients)
    if (!clients) {
      console.log('no clients');
      clientDropdown =
        <select className="form-control">
          <option>None</option>
        </select>
    } else {
      clientsList = clients.map(client => {
        console.log('client: ', client)
        return (
          <option key={client.clientId}>{client.name}</option>
        )
      })
      console.log('clientList: ', clientList)
      clientDropdown =
        <select ref="existingClient" className="form-control">
          <option disabled selected value> Choose a client</option>
          {clientsList}
        </select>
      }

    let isData
    if (!animals || !clients) {
      isData = <div><h1>No Data</h1></div>
    } else {
      isData =
          <div>
            <div className="col-sm-12"><button onClick={this._seeNames} className="btn btn-block">See Client Names</button></div>
          </div>
      }

    let animalList
    if (!animals){
        animalList = <div className="container">No Animals</div>
    } else {
        animalList =
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Age</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>

            {animals.map((animal) => {
              if (!animal.clientId){
                return(
                  <tr key={animal.animalId}>
                    <td>{animal.type}</td>
                    <td>{animal.name}</td>
                    <td>{animal.age}</td>
                    <td>{clientDropdown}</td>
                  </tr>
                )
              } else {
                return(
                  <tr key={animal.animalId}>
                    <td>{animal.type}</td>
                    <td>{animal.name}</td>
                    <td>{animal.age}</td>
                    <td>{animal.clientId}</td>
                  </tr>
                )
              }
            })}

          </tbody>
        </table>
    }

    let clientList
    if (!clients){
        clientList = <div className="container">No Clients</div>
    } else {
        clientList =
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Client ID</th>
                </tr>
              </thead>
              <tbody>

                {clients.map((client) => {
                  console.log('client: ', client)
                  return(
                    <tr key={client.clientId}>
                      <td>{client.name}</td>
                      <td>{client.clientId}</td>
                      <Link to='/details'><td><button onClick={() => this._getDetails(client.clientId)} className="btn">See All Pets</button></td></Link>
                    </tr>
                  )
                })}

              </tbody>
            </table>
    }

    console.log('animals: ', animals)
    console.log('clients: ', clients)

      return(
        <div className="container">
          {isData}
          <br/>
          {animalList}
          <br/>
          {clientList}
          <br/>
        </div>
      )
    }
}
