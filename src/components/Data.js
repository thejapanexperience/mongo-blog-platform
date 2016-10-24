import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import moment from 'moment'

import Store from '../stores/Store';
import ToAPIActions from '../actions/ToAPIActions';

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: Store.getBoards(),
      selectedBoard: Store.getSelectedBoard(),
    };
    this._onChange = this._onChange.bind(this);
    this._submitMessage = this._submitMessage.bind(this);
    this._editPost1 = this._editPost1.bind(this);
    this._editPost2 = this._editPost2.bind(this);
    this._deletePost = this._deletePost.bind(this);
  }

  componentWillMount () {
    Store.startListening(this._onChange);
    ToAPIActions.getSelectedBoard()
  }

  componentWillUnmount () {
    Store.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      boards: Store.getBoards(),
      selectedBoard: Store.getSelectedBoard(),
    });
  }

  _submitMessage () {
    let { selectedBoard } = this.state
    let { messageBody, messageTitle, messageAuthor } = this.refs
    let message = {
      message: messageBody.value,
      displayTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      title: messageTitle.value,
      author: messageAuthor.value,
      edit: false,
      time: Date.now()
    }
    selectedBoard.messages.unshift(message)
    console.log('messageBody.value: ', messageBody.value)
    console.log('selectedBoard: ', selectedBoard)
    ToAPIActions.addMessage(selectedBoard)
  }

  _editPost1 (message) {
    let { selectedBoard } = this.state
    message.edit = true
    selectedBoard.messages.map((post) => {
      if (post.time === message.time){
        post.edit = true
      }
    })
    ToAPIActions.addMessage(selectedBoard)
  }

  _editPost2 (message) {
    let { selectedBoard } = this.state
    let { editMessageBody, editMessageTitle } = this.refs
    selectedBoard.messages.map((post) => {
      if (post.time === message.time){
        post.edit = false
        post.message = editMessageBody.value
        post.title = editMessageTitle.value
      }
    })
    ToAPIActions.addMessage(selectedBoard)
  }

  _deletePost (message) {
    let { selectedBoard } = this.state
    console.log('in _deletePost');
    console.log('message: ', message)
    selectedBoard.messages.forEach((post, index) => {
      if (post.time === message.time){
        selectedBoard.messages.splice(index,1)
      }
    })
    console.log('selectedBoard.messages: ', selectedBoard.messages)
    ToAPIActions.addMessage(selectedBoard)
  }

  render () {

    let { boards, selectedBoard } = this.state

    let boardChoice
    let messageInput
    let messages

    if (!selectedBoard) {
      boardChoice = <div><h1>No Board Selected</h1></div>
    } else {
      boardChoice =
          <div className='container'>
            <h1>{selectedBoard.name}</h1>
            <img src={selectedBoard.image} alt="" id="blogImage"/>
            {/* <div className="col-sm-8"></div>
            <div className="col-sm-4"></div> */}
          </div>

      messageInput =
          <div className="container col-sm-12">
            <form>
              <div className="form-group">
                <label htmlFor="messageToBeInput">Add Blog Post</label>
                <br/>
                <input type="text" ref="messageAuthor" className="form-control" defaultValue="Richard Mands" aria-describedby="sizing-addon1"/>
                <input type="text" ref="messageTitle" className="form-control" defaultValue="Bojack's Line" aria-describedby="sizing-addon1"/>
                <textarea ref='messageBody' id="messageToBeInput" defaultValue="That was worse than 100 September 11s" className="form-control" rows="15"></textarea>
              </div>
            </form>
            <button onClick={this._submitMessage} className="btn">Add Post</button>
            <br/>
            <br/>
            <br/>
          </div>

          if (selectedBoard.messages.length > 0){

            let theBlogs = selectedBoard.messages

            messages =
            <div className="container">
              <hr/>
              <br/>
              {theBlogs.map((message) => {

                if (message.edit === false) {

                  return(
                    <div key={message.time}>
                      <br/>
                      <h2>{message.title}</h2>
                      <h3>{message.author}</h3>
                      <h4>{message.displayTime}</h4>
                      <h3>{message.message}</h3>
                      <button onClick={() => this._editPost1(message)} className="btn">Edit</button>
                      <span>  </span>
                      <button onClick={() => this._deletePost(message)} className="btn">Delete</button>
                    </div>
                  )

                } else if (message.edit === true) {

                  return(
                    <div key={message.time}>
                      <br/>
                      <input ref='editMessageTitle' defaultValue={message.title}/>
                      <textarea ref='editMessageBody' id="messageToBeInput" defaultValue={message.message} className="form-control" rows="15"></textarea>
                      <button onClick={() => this._editPost2(message)} className="btn">confirm</button>
                      <span>  </span>
                    </div>
                  )
                }

                })}
              <hr/>
            </div>

            {/* <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Blog Posts</th>
                  </tr>
                </thead>
                <tbody>

                  {theBlogs.map((message) => {
                    return(
                      <div key={message.time}>
                        <tr >
                          <td>{message.displayTime}</td>
                        </tr>
                        <tr>
                          <td>{message.message}</td>
                        </tr>
                        <tr>
                          <td> <br/> </td>
                        </tr>
                      </div>
                    )
                  })}

                </tbody>
              </table>
            </div> */}
          }
      }


      return(
        <div className="container">
          {boardChoice}
          <br/>
          {messageInput}
          <br/>
          <hr/>
          {messages}
          <br/>
        </div>
      )
    }
}
