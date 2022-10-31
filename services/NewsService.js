const url = 'http://10.0.2.2:3000/';

/**
 * Retrieving all news from backend
 * @param {*} setNews
 */
const getAlllNews = async (setNews) => {
  try {
    const response = await fetch(`${url}news`);
    const json = await response.json();
    setNews(json);
  } catch (error) {
    console.log(error);
  }
};

export { getAlllNews };
