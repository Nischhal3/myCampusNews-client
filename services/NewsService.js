import { fetchData } from './ApiService';
import { getToken } from './UserService';
import {baseUrl} from '../utils/variables';


// Retrieving all news from backend
const getAlllNews = async (token) => {
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news`, options);
};

// Post news to the server
const postNews = async (formData, token) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  };
  return await fetchData(`${baseUrl}news`, options);
};

// get all comment of one specific news
const getAllCommentOfNews = async (newsId, token) => {
  const options = {
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token},
  };
  const result = await fetchData(`${baseUrl}news/comments/newsid/${newsId}`, options);
  return result;
};

// get all comment of one specific news
const postComment = async (comment, newsId, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  };
  const result = await fetchData(`${baseUrl}news/comments/${newsId}`, options);
  return result;
};

const postFavorite = async ( newsId, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  const result = await fetchData(`${baseUrl}news/favorite/${newsId}`, options);
  return result;
};

const removeFavorite = async ( newsId, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  const result = await fetchData(`${baseUrl}news/user/favorite/${newsId}`, options);
  return result;
};

const checkFavorite = async ( newsId, token) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  const result = await fetchData(`${baseUrl}news/user/favorite/${newsId}`, options);
  return result;
};

export { getAlllNews, postNews, getAllCommentOfNews, postComment, postFavorite, removeFavorite, checkFavorite };
