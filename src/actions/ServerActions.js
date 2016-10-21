import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  gotBoards (data) {
    console.log('in ServerActions');
    AppDispatcher.dispatch({
      type: 'GOT_BOARDS',
      payload: {data}
    });
  },
}
export default ServerActions;
