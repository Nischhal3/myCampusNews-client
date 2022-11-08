import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Communicating with server
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetching user token from async storage
const getToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  console.log(token);
};

export { getAllUsers, register, login, getToken };
