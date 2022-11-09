import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from './ApiService';

const baseUrl = 'http://10.0.2.2:3000/';

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

export { getAllUsers, register, login, getToken };
