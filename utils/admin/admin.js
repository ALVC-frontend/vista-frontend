import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/admin/';

export async function fetchNewArticle() {
  try {
    const response = await axios.get(`${BASE_URL}/articles/new.json.jbuilder`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchEditArticle() {
  try {
    const response = await axios.get(`${BASE_URL}/articles/new.json.jbuilder`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetcIndexArticle() {
  try {
    const response = await axios.get(`${BASE_URL}/articles/new.json.jbuilder`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
