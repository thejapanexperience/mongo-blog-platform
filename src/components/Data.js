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
    let { messageBody } = this.refs
    let message = {
      message: messageBody.value,
      displayTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      time: Date.now()
    }
    selectedBoard.messages.push(message)
    console.log('messageBody.value: ', messageBody.value)
    console.log('selectedBoard: ', selectedBoard)
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
            <div className="col-sm-4">
              <h1>{selectedBoard.name}</h1>
              <img src={selectedBoard.image} alt="" className="boardImage"/>
            </div>
            <div className="col-sm-8"></div>
            <div className="col-sm-4">
            </div>
          </div>

      messageInput =
          <div className="container">
            <form>
              <div className="form-group">
                <label htmlFor="messageToBeInput">Add Message</label>
                <textarea ref='messageBody' id="messageToBeInput" defaultValue="That was worse than 100 September 11s" className="form-control" rows="3"></textarea>
              </div>
            </form>
            <button onClick={this._submitMessage} className="btn">Add Message</button>
          </div>

          if (selectedBoard.messages.length > 0){
            let forwardMessages = selectedBoard.messages
            let reverseMessages = forwardMessages.sort((a,b) => {
              return a.time - b.time
            })
            console.log('forwardMessages: ', forwardMessages)
            console.log('reverseMessages: ', reverseMessages)
            messages =
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>

                  {reverseMessages.map((message) => {
                    return(
                      <tr key={message.time}>
                        <td>{message.displayTime}</td>
                        <td>{message.message}</td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          }
      }


      return(
        <div className="container">
          {boardChoice}
          <br/>
          {messageInput}
          <br/>
          {messages}
          <br/>
        </div>
      )
    }
}
