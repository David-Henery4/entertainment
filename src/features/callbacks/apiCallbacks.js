import axios from "axios";

//**************ALL**API**CABACK**FUNCTIONS**********//
// https://hill-spot-philodendron.glitch.me/

// ALL CONTENT (WITH BOOKMARKS)
export const allContentWithBookmarks = async (userInfo) => {
  try {
    const promises = [];
    const allContentPromise = axios.get(
      "http://localhost:3006/content",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userBookmarksPromise = axios.get(
      `http://localhost:3006/users?id=${userInfo.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    promises.push(allContentPromise);
    promises.push(userBookmarksPromise);
    const res = await Promise.all(promises);
    const data = res.map((res) => res.data);
    return data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// ALL MOVIES (WITH BOOKMARKS)
export const allMoviesWithBookmarks = async (userInfo) => {
  try {
    const promises = [];
    const allContentPromise = axios.get(
      "http://localhost:3006/content?category=Movie",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userBookmarksPromise = axios.get(
      `http://localhost:3006/users?id=${userInfo.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    promises.push(allContentPromise);
    promises.push(userBookmarksPromise);
    const res = await Promise.all(promises);
    const data = res.map((res) => res.data);
    return data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// ALL TV-SERIES (WITH BOOKMARKS)
export const allTvAndBookmarks = async (userInfo) => {
  try {
    const promises = [];
    const allContentPromise = axios.get(
      "http://localhost:3006/content?category=TV+Series",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userBookmarksPromise = axios.get(
      `http://localhost:3006/users?id=${userInfo.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    promises.push(allContentPromise);
    promises.push(userBookmarksPromise);
    const res = await Promise.all(promises);
    const data = res.map((res) => res.data);
    return data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// ALL USER BOOKMARKS
export const allUserBookmarks = async (_, { getState }) => {
  try {
    const { userInfo} = getState().content;
    const res = await axios.get(
      `http://localhost:3006/users?id=${userInfo.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// SIGNUP USER
export const signup = async (signUpInfo) => {
  try {
    const res = await axios.post(
      "http://localhost:3006/users",
      signUpInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// LOGIN USER
export const login = async (loginInfo) => {
  try {
    const res = await axios.post(
      "http://localhost:3006/login",
      loginInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// UPDATE USERS BOOKMARKS ON THE SERVER
export const updateBookmarks = async (id, { getState }) => {
  try {
    const { allContentData, userInfo} = getState().content;
    const choosenBookmarkItems = allContentData.filter(
      (item) => item.isBookmarked
    );
    const res = await axios.patch(
      `http://localhost:3006/users/${userInfo.id}`,
      {
        bookmarks: choosenBookmarkItems,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
