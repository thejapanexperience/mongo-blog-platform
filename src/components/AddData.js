import React, { Component } from 'react';
import uuid from 'uuid';
import {Link} from 'react-router';

import ToAPIActions from '../actions/ToAPIActions';
import Store from '../stores/Store';

export default class AddData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: false,
    }

    this._onChange = this._onChange.bind(this);
    this._submitBoard = this._submitBoard.bind(this);
  }

  componentWillMount(){
    ToAPIActions.getBoards()
    Store.startListening(this._onChange)

  }

  componentWillUnmount(){
    Store.stopListening(this._onChange)
  }

  _onChange () {
    this.setState({
      boards: Store.getBoards(),
    });
  }

  _submitBoard () {
    let { boardName, boardDescription, boardImage } = this.refs
    let board = {
      name: boardName.value,
      description: boardDescription.value,
      image: boardImage.value,
      messages: []
    }
    console.log(board);
    ToAPIActions.submitBoard(board)
  }


  render () {

    console.log('in AddData render');
    const { boards } = this.state;
    let boardDropdown
    let boardList
    if (!boards) {
      console.log('no clients');
      boardDropdown =
        <select className="form-control">
          <option disabled selected value> Choose a board</option>
        </select>
    } else {
      boardList = clients.map(client => {
        console.log('client: ', client)
        return (
          <option key={client.clientId}>{client.name}</option>
        )
      })
      console.log('boardList: ', boardList)
      boardDropdown =
        <select ref="boardChoice" className="form-control">
          <option disabled selected value> Choose a board</option>
          {boardList}
        </select>
      }


    return (
      <div className="container">
        <h1>Choose a board or make a new one</h1>
        <br/>
        {boardDropdown}
        <br/>
        <Link to='/viewdata'><button onClick={this._submitAnimal} className="btn">Choose Board</button></Link>
        <br/>
        <br/>
        <div className="input-group input-group-lg">
          <span className="input-group-addon addDataSpan" id="sizing-addon1">Name|Description|Image</span>
          <input ref='boardName'type="text" className="form-control" defaultValue="MrPeanutbutter" aria-describedby="sizing-addon1"/>
          <input ref='boardDescription'type="text" className="form-control" defaultValue="A cool place to chat about Bojack and pals" aria-describedby="sizing-addon1"/>
          <input ref='boardImage'type="text" className="form-control" defaultValue="http://cdn0.dailydot.com/cache/0f/99/0f99c5beb826a1cb3c155d700b7b628b.jpg" aria-describedby="sizing-addon1"/>
        </div>
        <br/>
        <button onClick={this._submitBoard} className="btn">Add New Board</button>
      </div>
    );
  }
}
