import { fetchData } from './ApiService';
import { getToken } from './UserService';

const baseUrl = 'http://10.0.2.2:3000/';

// Retrieving all news from backend
const getAlllNews = async () => {
  const token = await getToken();
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news`, options);
};

export { getAlllNews };
