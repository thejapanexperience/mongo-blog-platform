import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';

let _boards

class Store extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {

        case 'GOT_BOARDS':
          _boards = action.payload.data
          console.log('_boards: ', _boards)
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

}

export default new Store();
