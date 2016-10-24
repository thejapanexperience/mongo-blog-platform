import API from '../API';
import AppDispatcher from '../AppDispatcher';

const ToAPIActions = {
  submitBoard: API.submitBoard,
  getBoards: API.getBoards,
  chooseBoard: API.chooseBoard,
  getSelectedBoard: API.getSelectedBoard,
  addMessage: API.addMessage,
};

export default ToAPIActions;
