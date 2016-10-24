import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';

let _boards
let _selectedBoard

class Store extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {

        case 'GOT_BOARDS':
          _boards = action.payload.data
          this.emit('CHANGE');
          break;

        case 'SELECTED_BOARD':
          _selectedBoard = action.payload.data
          this.emit('CHANGE');
          break;

        case 'GOT_SELECTED':
          // let temp = action.payload.data
          // let i = temp.length
          // console.log('temp, i: ', temp, i)
          _selectedBoard = action.payload.data
          this.emit('CHANGE');
          break;

        default:
          console.log('INVALID_ACTION_TYPE');
          break;
      }
    });
  }

  startListening (callback) {
    this.on('CHANGE', callback);
  }

  stopListening (callback) {
    this.removeListener('CHANGE', callback);
  }

  getBoards () {
    return _boards;
  }

  getSelectedBoard () {
    return _selectedBoard;
  }

}

export default new Store();
