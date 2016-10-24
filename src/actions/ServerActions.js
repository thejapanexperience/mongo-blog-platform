import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  gotBoards (data) {
    AppDispatcher.dispatch({
      type: 'GOT_BOARDS',
      payload: {data}
    });
  },

  chooseBoard (data) {
    AppDispatcher.dispatch({
      type: 'SELECTED_BOARD',
      payload: {data}
    });
  },

  gotSelected (data) {
    AppDispatcher.dispatch({
      type: 'GOT_SELECTED',
      payload: {data}
    });
  },
}
export default ServerActions;
