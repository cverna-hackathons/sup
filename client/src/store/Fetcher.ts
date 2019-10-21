import axios from 'axios';

export const Fetcher = axios.create({
  baseURL: 'http://localhost:4000/api/v1/',
});
