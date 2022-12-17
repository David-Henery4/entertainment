import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import checkingBookmarks from "../../checkingForUserBookmarks/checkingBookmarks";
//  http://localhost:3006/content (JSON SERVER CALL)

const initialState = {
  userBookmarks: [],
  userAllContent: [],
  //
  userInfo: null,
  userToken: null,
  allContentData: [],
  moviesData: [],
  tvSeriesData: [],
  bookmarkedContent: [],
  trendingContent: [],
  searchQueryAndLocation: {},
  searchQuery: "",
  isLoading: false,
  isError: null,
  isSuccess: false,
};

export const getContentWithUpdatedBookmarks = createAsyncThunk(
  "content/getContentWithUpdatedBookmarks",
  async (userInfo) => {
    try {
      const promises = [];
      const allContentPromise = axios.get("http://localhost:3006/content");
      const userBookmarksPromise = axios.get(
        `http://localhost:3006/users?id=${userInfo.id}`
      );
      promises.push(allContentPromise);
      promises.push(userBookmarksPromise);
      const res = await Promise.all(promises);
      const data = res.map((res) => res.data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const getMoviesWithUpdatedBookmarks = createAsyncThunk(
  "content/getMoviesWithUpdatedBookmarks",
  async (userInfo) => {
    try {
      const promises = [];
      const allContentPromise = axios.get(
        "http://localhost:3006/content?category=Movie"
      );
      const userBookmarksPromise = axios.get(
        `http://localhost:3006/users?id=${userInfo.id}`
      );
      promises.push(allContentPromise);
      promises.push(userBookmarksPromise);
      const res = await Promise.all(promises);
      const data = res.map((res) => res.data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const getTvWithUpdatedBookmarks = createAsyncThunk(
  "content/getTvWithUpdatedBookmarks",
  async (userInfo) => {
    try {
      const promises = [];
      const allContentPromise = axios.get(
        "http://localhost:3006/content?category=TV+Series"
      );
      const userBookmarksPromise = axios.get(
        `http://localhost:3006/users?id=${userInfo.id}`
      );
      promises.push(allContentPromise);
      promises.push(userBookmarksPromise);
      const res = await Promise.all(promises);
      const data = res.map((res) => res.data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getUserBookmarks = createAsyncThunk(
  "content/getUserBookmarks",
  async (_, { getState }) => {
    try {
      const { userInfo } = getState().content;
      const res = await axios.get(
        `http://localhost:3006/users?id=${userInfo.id}`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

//////*******************************************//////
// SIGN UP & LOGIN AUTH

export const signUpUser = createAsyncThunk(
  "content/signUpUser",
  async (signUpInfo) => {
    try {
      const res = await axios.post("http://localhost:3006/users", signUpInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
//
export const loginUser = createAsyncThunk(
  "content/loginUser",
  async (loginInfo) => {
    try {
      const res = await axios.post("http://localhost:3006/login", loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);



export const updateUserBookmarks = createAsyncThunk(
  "content/updateUserBookmarks",
  async (id, { getState }) => {
    try {
      const { allContentData, userInfo } = getState().content;
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
      return error;
    }
  }
);

//******************CREATED**SLICE***************************************//
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    bookmarkContent: (state, { payload }) => {
      const markedItem = state.allContentData.find(
        (item) => item.id === payload
      );
      markedItem.isBookmarked = !markedItem.isBookmarked;
      if (markedItem.isBookmarked) {
        state.bookmarkedContent = [...state.bookmarkedContent, markedItem];
      }
      if (!markedItem.isBookmarked) {
        const newBookmarks = state.bookmarkedContent.filter(
          (marked) => marked.id !== payload
        );
        state.bookmarkedContent = newBookmarks;
      }
    },
    updateTrending: (state, { payload }) => {
      const markedItem = state.trendingContent.find(
        (item) => item.id === payload
      );
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
      // state.trendingContent = [state.trendingContent, markedItem]
    },
    updateTvSeries: (state, { payload }) => {
      const markedItem = state.tvSeriesData.find((item) => item.id === payload);
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
    },
    updateMovies: (state, { payload }) => {
      const markedItem = state.moviesData.find((item) => item.id === payload);
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
    },
    renderCurrentBookmarks: (state, { payload }) => {
      const markedItems = state.allContentData.filter(
        (item) => item.isBookmarked
      );
      state.bookmarkedContent = markedItems;
    },
    searchQuery: (state, { payload }) => {
      const { query } = payload;
      state.searchQueryAndLocation = payload;
      state.searchQuery = query;
    },
    signoutUser: (state, {payload}) => {
      state.userInfo = null
      state.userToken = null
    }
  },

  //
  // EXTRA REDUCERS / API THUNK REDUCERS
  extraReducers: (builder) => {
    //
    // AUTH USER LOGIN
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.userToken = accessToken;
      state.userInfo = user;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    // AUTH USER SIGNUP
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.userToken = accessToken;
      state.userInfo = user;
      state.isLoading = false;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(signUpUser.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    // TESTING PUT BOOKMARKS TO USER (MIGHT REMOVE)
    builder.addCase(updateUserBookmarks.fulfilled, (state, { payload }) => {
      // console.log(payload);
    });
    builder.addCase(updateUserBookmarks.pending, (state, { payload }) => {
      // console.log(payload);
    });
    builder.addCase(updateUserBookmarks.rejected, (state, { payload }) => {
      console.log(payload);
    });
    // TESING INITIAL FETCH TO GET ALL CONTENT & USER BOOKMARKS
    builder.addCase(
      getContentWithUpdatedBookmarks.fulfilled,
      (state, { payload }) => {
        const checkingForBookmarks = checkingBookmarks(payload);
        state.allContentData = checkingForBookmarks;
        const trendingData = checkingForBookmarks.filter(
          (item) => item.isTrending
        );
        state.trendingContent = trendingData;
        state.isLoading = false;
      }
    );
    builder.addCase(
      getContentWithUpdatedBookmarks.pending,
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      getContentWithUpdatedBookmarks.rejected,
      (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      }
    );
    // TESING INITIAL FETCH TO GET ALL MOVIES & USER BOOKMARKS
    builder.addCase(
      getMoviesWithUpdatedBookmarks.fulfilled,
      (state, { payload }) => {
        // REFACTOR TO FUNCTION
        const content = payload[0];
        const bookmarks = payload[1];
        const userBookmarks = bookmarks[0].bookmarks;
        const checkingForBookmarks = content.map((item) => {
          userBookmarks.forEach((bookmarkedItem) => {
            if (item.id === bookmarkedItem.id) {
              item.isBookmarked = true;
            }
          });
          return item;
        });
        state.moviesData = checkingForBookmarks;
        state.isLoading = false;
      }
    );
    builder.addCase(
      getMoviesWithUpdatedBookmarks.pending,
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      getMoviesWithUpdatedBookmarks.rejected,
      (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      }
    );
    // TESING INITIAL FETCH TO GET ALL TV SERIES & USER BOOKMARKS
    builder.addCase(
      getTvWithUpdatedBookmarks.fulfilled,
      (state, { payload }) => {
        const checkingForBookmarks = checkingBookmarks(payload);
        state.tvSeriesData = checkingForBookmarks;
        state.isLoading = false;
      }
    );
    builder.addCase(getTvWithUpdatedBookmarks.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTvWithUpdatedBookmarks.rejected,
      (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      }
    );
    // TESING INITIAL FETCH TO GET ALL USER BOOKMARKS
    builder.addCase(getUserBookmarks.fulfilled, (state, { payload }) => {
      state.bookmarkedContent = payload[0].bookmarks;
      state.isLoading = false;
    });
    builder.addCase(getUserBookmarks.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getUserBookmarks.rejected, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
    });
  },
});

// FOR WHEN WE HAVE ACTIONS
export const {
  bookmarkContent,
  updateTrending,
  updateMovies,
  updateTvSeries,
  renderCurrentBookmarks,
  searchQuery,
  settingInitialUserBookmarks,
  signoutUser,
} = contentSlice.actions;

export default contentSlice.reducer;
