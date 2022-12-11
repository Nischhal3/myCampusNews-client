import { fetchData } from './ApiService';
import { baseUrl } from '../utils/variables';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../contexts/Context';

// Retrieving all news from backend
const getAlllNewsByDraft = async (token, draft) => {
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news/draft/${draft}`, options);
};

// News functionality
const useNews = () => {
  const [news, setNews] = useState([]);
  const [paragraph, setParagraph] = useState([]);
  const [newsInterval, setNewsInterval] = useState([]);
  const {
    token,
    newsByCategory,
    setNewsByCategory,
    newsUpdate,
    setNewsUpdate,
  } = useContext(Context);

  // Fetching news by draft number
  const getAlllNews = async (draft) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const response = await fetchData(
        `${baseUrl}news/draft/${draft}`,
        options
      );
      response && setNews(response.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  // Deleting news
  const deleteNews = async (newsId) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetchData(`${baseUrl}news/${newsId}`, options);
      response && setNewsUpdate(newsUpdate + 1);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching news by category
  const getAlllNewsByCategory = async (category) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const response = await fetchData(
        `${baseUrl}news/search/category/${category}`,
        options
      );
      response && setNewsByCategory(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching news by draft number in certain interval
  const getAlllNewsIninterval = async (draft) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const response = await fetchData(
        `${baseUrl}news/draft/${draft}`,
        options
      );
      response && setNewsInterval(response.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  // Posting section news
  const postParagraphToNews = async (formData, newsId) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };
      return await fetchData(`${baseUrl}news/paragraph/${newsId}`, options);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching all sections of news
  const getAllParagraphOfNews = async (newsId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const response = await fetchData(
        `${baseUrl}news/paragraph/${newsId}`,
        options
      );
      setParagraph(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Updating news high-light
  const updateNewsHighlight = async (highlight, newsId) => {
    try {
      const newsHighlight = {
        highlighted: highlight,
      };
      const options = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsHighlight),
      };
      const response = await fetchData(
        `${baseUrl}news/highlighted/${newsId}`,
        options
      );
      response && setNewsUpdate(newsUpdate + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAlllNews,
    deleteNews,
    getAlllNewsByCategory,
    getAlllNewsIninterval,
    postParagraphToNews,
    getAllParagraphOfNews,
    updateNewsHighlight,
    setNewsByCategory,
    newsByCategory,
    newsInterval,
    news,
    paragraph,
  };
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

// Deleting news by news id
const deleteNews = async (token, newsId) => {
  const options = {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news/${newsId}`, options);
};

// News comment functionality
const useComment = () => {
  const { token, updateComment, setUpdateComment } = useContext(Context);
  const [comments, setComments] = useState([]);

  // Fetching all the news comment by news id
  const getAllCommentOfNews = async (newsId) => {
    try {
      const options = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      };
      const response = await fetchData(
        `${baseUrl}news/comments/newsid/${newsId}`,
        options
      );
      response.message != 'comment not found' &&
        setComments(response.reverse());
    } catch (error) {
      setComments([]);
    }
  };

  // Posting comment to the  news by news id
  const postComment = async (comment, newsId) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      };
      const response = await fetchData(
        `${baseUrl}news/comments/${newsId}`,
        options
      );
      response && setUpdateComment(updateComment + 1);
    } catch (error) {
      console.error(error);
    }
  };

  // Deleting commment if the news by comment id
  const deleteComment = async (commentId) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetchData(
        `${baseUrl}news/comments/commentid/${commentId}`,
        options
      );
      response && setUpdateComment(updateComment + 1);
    } catch (error) {
      console.error(error);
    }
  };

  // Updating comment of the news by comment id
  const putComment = async (comment, commentId) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      };
      const response = await fetchData(
        `${baseUrl}news/comments/commentid/${commentId}`,
        options
      );
      response && setUpdateComment(updateComment + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAllCommentOfNews,
    postComment,
    deleteComment,
    putComment,
    comments,
  };
};

// News bookmark functionality
const userFavorite = () => {
  const [favorite, setFavorite] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const { token, updateFavorite, setUpdateFavorite } = useContext(Context);

  // Adding news to book mark or removing bookmarked news
  const postAndRemoveFavorite = async (newsId) => {
    try {
      if (!favorite) {
        const options = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const response = await fetchData(
          `${baseUrl}news/favorite/${newsId}`,
          options
        );
        response && (setFavorite(true), setUpdateFavorite(updateFavorite + 1));
      } else {
        const options = {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const response = await fetchData(
          `${baseUrl}news/user/favorite/${newsId}`,
          options
        );
        response && (setFavorite(false), setUpdateFavorite(updateFavorite + 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFavorite = async (newsId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetchData(
        `${baseUrl}news/user/favorite/${newsId}`,
        options
      );
      response.status == 409 ? setFavorite(false) : setFavorite(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching book marked news
  const getFavoriteList = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetchData(`${baseUrl}news/user/favorite`, options);
      var result = [];
      if (response.status != 409) {
        for (const news of response) {
          const contents = await fetchData(
            `${baseUrl}news/${news.favorite_news_id}`,
            options
          );
          result.push(contents);
        }
      }
      setFavoriteList(result.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setFavoriteList([]);
  }, [updateFavorite]);

  return {
    checkFavorite,
    postAndRemoveFavorite,
    getFavoriteList,
    favorite,
    favoriteList,
  };
};

// User like functionality
const useLike = () => {
  const [likedNumber, setLikedNumber] = useState(0);
  const [liked, setLiked] = useState(false);
  const { token, updateComment, setUpdateComment, updateLike, setUpdateLike } =
    useContext(Context);

  // Adding or Removing user like from news by news id
  const postAndRemoveLike = async (newsId) => {
    try {
      if (!liked) {
        const options = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const response = await fetchData(
          `${baseUrl}news/user/like/${newsId}`,
          options
        );
        response && (setLiked(true), setUpdateLike(updateLike + 1));
      } else {
        const options = {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const response = await fetchData(
          `${baseUrl}news/user/like/${newsId}`,
          options
        );
        response && (setLiked(false), setUpdateLike(updateLike + 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fecthing total number of likes by news id
  const getNumberOfLike = async (newsId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetchData(
        `${baseUrl}news/user/like/${newsId}`,
        options
      );
      response && setLikedNumber(response.like);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserLike = async (newsId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetchData(
        `${baseUrl}news/like/${newsId}`,
        options
      );
      response.status == 409 ? setLiked(false) : setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    postAndRemoveLike,
    getNumberOfLike,
    getUserLike,
    liked,
    likedNumber,
  };
};

// Fetching total number of views of news by news id
const getAllNewsView = async (token, newsId) => {
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news/all/newsViews/${newsId}`, options);
};

// Posting views to the news if user clicks for the first time
const postNewsViews = async (token, user_id, news_id) => {
  const newsViewObject = {
    newsId: news_id,
    userId: user_id,
  };

  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newsViewObject),
  };
  const result = await fetchData(`${baseUrl}news/all/newsViews`, options);
  return result;
};

export {
  getAlllNewsByDraft,
  postNews,
  useComment,
  userFavorite,
  useLike,
  getAllNewsView,
  postNewsViews,
  deleteNews,
  useNews,
};
