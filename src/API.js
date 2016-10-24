import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {

  getBoards(){
    axios.get(`http://localhost:8000/api/boards`)
    .then((res) => {
      ServerActions.gotBoards(res.data)
    })
    .catch((err) => {
      console.error('SEARCH:', err);
    });
  },

  submitBoard (board) {
    console.log('in API');
    console.log('board: ', board)
    axios.post(`http://localhost:8000/api/boards`,{board})
      .then((res) => {
        console.log('res.data: ', res.data)
        ServerActions.gotBoards(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  addMessage (board) {
    console.log('in API');
    console.log('board: ', board)
    axios.put(`http://localhost:8000/api/boards`,{board})
      .then((res) => {
        ServerActions.gotBoards(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  chooseBoard (board) {
    console.log('in API');
    console.log('board: ', board)
    axios.post(`http://localhost:8000/api/chosenboards`,{board})
      .then((res) => {
        console.log('in API chooseBoard after call');
        console.log('res.data: ', res.data)
        // ServerActions.gotSelected(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  getSelectedBoard () {
    console.log('in API get SelectedBoard');
    axios.get(`http://localhost:8000/api/chosenboards`)
      .then((res) => {
        console.log('res: ', res)
        let index = res.data.length - 1
        console.log('index: ', index)
        let board = res.data[index]
        console.log('board: ', board)
        return axios.get(`http://localhost:8000/api/boards/${board.name}`)
      })
      .then((res) => {
        console.log('in API getSelectedBoard after call');
        ServerActions.gotSelected(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

}

export default API;
