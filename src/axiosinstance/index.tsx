import axios from 'axios';

// MOCK API
const baseURL: string = 'http://www.mocky.io/v2/5c6e7c573400005500892ce8';

const instance = axios.create({
  baseURL
});

export default instance;
