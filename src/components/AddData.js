import React, { Component } from 'react';
import uuid from 'uuid';
import {Link} from 'react-router';

import ToAPIActions from '../actions/ToAPIActions';
import BoardActions from '../actions/BoardActions';
import Store from '../stores/Store';

export default class AddData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: false,
    }

    this._onChange = this._onChange.bind(this);
    this._submitBoard = this._submitBoard.bind(this);
    this._chooseBoard = this._chooseBoard.bind(this);
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

  _chooseBoard () {
    let { boards } = this.state
    console.log('boards: ', boards)
    let { boardChoice } = this.refs
    let boardName = boardChoice.value
    let selectedBoard
    console.log('boardChoice: ', boardChoice.value)
    selectedBoard = boards.filter((board) => {
      return board.name === boardName
    })
    let finalBoard = {
      name: selectedBoard[0].name,
      image: selectedBoard[0].image,
      description: selectedBoard[0].description
    }
    console.log('finalBoard: ', finalBoard)
    ToAPIActions.chooseBoard(finalBoard)
  }


  render () {

    let { boards } = this.state;
    let boardDropdown
    let boardList
    if (!boards) {
      console.log('no boards');
      boardDropdown =
        <select className="form-control">
          <option disabled selected value> Choose a blog</option>
        </select>
    } else {
      console.log('about to map dropdown')
      console.log('boards: ', boards)
      boardList = boards.map(board => {
        return (
          <option key={board._id}>{board.name}</option>
        )
      })
      console.log('boardList: ', boardList)
      boardDropdown =
        <select ref="boardChoice" className="form-control">
          <option disabled selected value> Choose a blog</option>
          {boardList}
        </select>
      }


    return (
      <div className="container">
        <h1>Choose a blog or make a new one</h1>
        <br/>
        {boardDropdown}
        <br/>
        <Link to='/viewdata'>
          <button onClick={this._chooseBoard} className="btn">Go To Blog</button>
        </Link>
        <br/>
        <br/>
        <div className="input-group input-group-lg">
          <span className="input-group-addon addDataSpan" id="sizing-addon1">Name|Description|Image</span>
          <input ref='boardName'type="text" className="form-control" defaultValue="MrPeanutbutter's Blog" aria-describedby="sizing-addon1"/>
          <input ref='boardDescription'type="text" className="form-control" defaultValue="A cool place to blog about Bojack and pals" aria-describedby="sizing-addon1"/>
          <input ref='boardImage'type="text" className="form-control" defaultValue="http://cdn0.dailydot.com/cache/0f/99/0f99c5beb826a1cb3c155d700b7b628b.jpg" aria-describedby="sizing-addon1"/>
        </div>
        <br/>
        <button onClick={this._submitBoard} className="btn">Add New Blog</button>
      </div>
    );
  }
}
