import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../utils/variables';
import { fetchData } from './ApiService';

const getAllUsers = async (setUser) => {
  try {
    const response = await fetch(`${baseUrl}user`);
    const json = await response.json();
    setUser(json);
  } catch (error) {
    console.log(error);
  }
};

// Function for user registration
const register = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return await fetchData(`${baseUrl}auth/register`, options);
};

// Function for user login
const login = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return await fetchData(`${baseUrl}auth/login`, options);
};

// Fetching user token from async storage
const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

//get user info by token
const getUserByToken = async (token) => {
  const options = {
    // get method is default,not necessary to put it.
    method: 'GET',
    // if there is - like x-access-token  use {}
    headers: { Authorization: 'Bearer ' + token },
  };
  return await fetchData(`${baseUrl}user/token`, options);
};

//get user info by id
const getUserById = async (userId, token) => {
  const options = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  };
  return await fetchData(`${baseUrl}user/userid/${userId}`, options);
};

//update user info
const putUser = async (formData, token) => {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  };
  const result = await fetchData(`${baseUrl}user/update`, options);
  return result;
};

const putUserPassword = async (data, token) => {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const result = await fetchData(`${baseUrl}user/password`, options);
  return result;
};
export {
  getAllUsers,
  register,
  login,
  getToken,
  getUserByToken,
  putUser,
  getUserById,
  putUserPassword,
};
