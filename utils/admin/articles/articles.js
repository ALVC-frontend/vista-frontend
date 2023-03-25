import axios from 'axios';

const API_URL = 'https://vista-testing.herokuapp.com/api/admin/articles';

function getArticles() {
  return axios.get(API_URL)
    .then(response => {
      console.log(response.data); // you can do whatever you want with the data here
      return response.data;
    })
    .catch(error => console.error(error));
}

export default getArticles;
