import axios from "axios";

//**************ALL**API**CABACK**FUNCTIONS**********//
// https://hill-spot-philodendron.glitch.me/

// ALL CONTENT (WITH BOOKMARKS)
export const allContentWithBookmarks = async (userInfo) => {
  try {
    const promises = [];
    const allContentPromise = axios.get(
      "https://somber-hill-structure.glitch.me/content"
    );
    const userBookmarksPromise = axios.get(
      `https://somber-hill-structure.glitch.me/users?id=${userInfo.id}`
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
      "https://somber-hill-structure.glitch.me/content?category=Movie"
    );
    const userBookmarksPromise = axios.get(
      `https://somber-hill-structure.glitch.me/users?id=${userInfo.id}`
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
      "https://somber-hill-structure.glitch.me/content?category=TV+Series"
    );
    const userBookmarksPromise = axios.get(
      `https://somber-hill-structure.glitch.me/users?id=${userInfo.id}`
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
    const { userInfo } = getState().content;
    const res = await axios.get(
      `https://somber-hill-structure.glitch.me/users?id=${userInfo.id}`
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
    const res = await axios.post("https://somber-hill-structure.glitch.me/users", signUpInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// LOGIN USER
export const login = async (loginInfo) => {
  try {
    const res = await axios.post("https://somber-hill-structure.glitch.me/login", loginInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

// UPDATE USERS BOOKMARKS ON THE SERVER
export const updateBookmarks = async (id, { getState }) => {
  try {
    const { allContentData, userInfo } = getState().content;
    const choosenBookmarkItems = allContentData.filter(
      (item) => item.isBookmarked
    );
    const res = await axios.patch(
      `https://somber-hill-structure.glitch.me/users/${userInfo.id}`,
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
