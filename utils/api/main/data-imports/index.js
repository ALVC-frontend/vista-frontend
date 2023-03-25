import axios from 'axios';
const BASE_URL = 'https://localhost:3000/api/admin/articles';
function getdataImports() {
  return axios.get(BASE_URL)
    .then(response => {
      console.log(response.data); // you can do whatever you want with the data here
      return response.data;
    })
    .catch(error => console.error(error));
}
export default getdataImports;
