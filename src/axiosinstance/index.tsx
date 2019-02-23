import axios from 'axios';

// MOCK API
const baseURL: string = 'https://www.mocky.io/v2/5c7185d03500007000e9e869';

// Create axios instance
const instance = axios.create({
  baseURL
});

export default instance;
