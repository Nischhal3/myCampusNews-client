import { fetchData } from './ApiService';
import { getToken } from './UserService';
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

const useNews = () => {
  const [news, setNews] = useState([]);
  const [paragraph, setParagraph] = useState([]);
  const [newsInterval, setNewsInterval] = useState([]);
  const { token } = useContext(Context);

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

  const postParagraphToNews = async (formData,newsId) => {
    try{
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };
      return await fetchData(`${baseUrl}news/paragraph/${newsId}`, options);
    }catch (error) {
      console.error(error);
    }
  };

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
      response && setParagraph(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAlllNews,
    getAlllNewsIninterval,
    postParagraphToNews,
    getAllParagraphOfNews,
    newsInterval,
    news,
    paragraph
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

const deleteNews = async (token, newsId) => {
  const options = {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news/${newsId}`, options);
};
const useComment = () => {
  const { token, updateComment, setUpdateComment } = useContext(Context);
  const [comments, setComments] = useState([]);

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

const userFavorite = () => {
  const [favorite, setFavorite] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const { token, updateFavorite, setUpdateFavorite } = useContext(Context);

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

const useLike = () => {
  const [likedNumber, setLikedNumber] = useState(0);
  const [liked, setLiked] = useState(false);
  const { token, updateComment, setUpdateComment, updateLike, setUpdateLike } =
    useContext(Context);

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

const getAllNewsView = async (token, newsId) => {
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  return await fetchData(`${baseUrl}news/all/newsViews/${newsId}`, options);
};

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
