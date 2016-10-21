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
        ServerActions.gotBoards(res.data)
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

}

export default API;
