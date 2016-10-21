import API from '../API';
import AppDispatcher from '../AppDispatcher';

const ToAPIActions = {
  submitBoard: API.submitBoard,
  getBoards: API.getBoards,
};

export default ToAPIActions;
