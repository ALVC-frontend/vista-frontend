import axios from 'axios';

const BASE_URL = 'https://localhost:4000/api/admin/articles';

function getArticles() {
  return axios.get(BASE_URL)
    .then(response => {
      console.log(response.data); // you can do whatever you want with the data here
      return response.data;
    })
    .catch(error => console.error(error));
}

function createArticle(article) {
  return axios.post(BASE_URL, article)
    .then(response => {
      console.log(response.data); // you can do whatever you want with the data here
      return response.data;
    })
    .catch(error => console.error(error));
}

export { getArticles, createArticle };