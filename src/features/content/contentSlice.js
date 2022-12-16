import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import checkingBookmarks from "../../checkingForUserBookmarks/checkingBookmarks";
//  http://localhost:3006/content (JSON SERVER CALL)

const initialState = {
  userBookmarks: [],
  userAllContent: [],
  //
  userAuth: null,
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

//*******************ORIGINAL**FETCHES******************//

//
export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (id, { getState }) => {
    try {
      const { allContentData } = getState().content;
      // console.log(allContentData)
      // console.log(id)
      // const newData = allContentData.map(item => item.id === id ? {...item, isBookmarked: !item.isBookmarked} : item)
      const newItem = allContentData.filter((item) => item.id === id);
      const newcontent = await axios.patch(
        `http://localhost:3006/content/${id}`,
        { isBookmarked: newItem[0].isBookmarked }
      );
      return newcontent.data;
    } catch (error) {
      console.log(error);
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
      console.log(signUpInfo);
      const res = await axios.post("http://localhost:3006/users", signUpInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
//
export const loginUser = createAsyncThunk(
  "content/loginUser",
  async (loginInfo) => {
    try {
      console.log(loginInfo);
      const res = await axios.post("http://localhost:3006/login", loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getUserBookmarks = createAsyncThunk(
  "content/getUserBookmarks",
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
      console.log(res);
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
      console.log(payload);
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
      console.log(payload);
      const markedItem = state.trendingContent.find(
        (item) => item.id === payload
      );
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
      // state.trendingContent = [state.trendingContent, markedItem]
    },
    updateTvSeries: (state, { payload }) => {
      console.log(payload);
      const markedItem = state.tvSeriesData.find((item) => item.id === payload);
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
    },
    updateMovies: (state, { payload }) => {
      console.log(payload);
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
  },

  //
  // EXTRA REDUCERS / API THUNK REDUCERS
  extraReducers: (builder) => {
    // UPDATE CONTENT
    builder.addCase(updateContent.fulfilled, (state, { payload }) => {
      console.log(payload);
      // const newData = state.allContentData.find(item => item.id === payload.id)
      // newData.isBookmarked = payload.isBookmarked
    });
    builder.addCase(updateContent.rejected, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(updateContent.pending, (state, { payload }) => {});
    //
    //
    //
    // (SIGNUP & LOGIN AUTH CALLS)
    //
    // AUTH USER LOGIN
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.userToken = accessToken;
      state.userInfo = user;
      state.userAuth = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      console.log(payload);
    });
    // AUTH USER SIGNUP
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.userToken = accessToken;
      state.userInfo = user;
      state.userAuth = true;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(signUpUser.pending, (state, { payload }) => {
      console.log(payload);
    });
    // TESTING PUT BOOKMARKS TO USER
    builder.addCase(getUserBookmarks.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(getUserBookmarks.pending, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(getUserBookmarks.rejected, (state, { payload }) => {
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
        const checkingForBookmarks = checkingBookmarks(payload);
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
    // TESING INITIAL FETCH TO GET ALL MOVIES & USER BOOKMARKS
    builder.addCase(getTvWithUpdatedBookmarks.fulfilled, (state, {payload}) => {
      const checkingForBookmarks = checkingBookmarks(payload)
      state.tvSeriesData = checkingForBookmarks
      state.isLoading = false
    })
    builder.addCase(getTvWithUpdatedBookmarks.pending, (state, {payload}) => {
      state.isLoading = true
    })
    builder.addCase(getTvWithUpdatedBookmarks.rejected, (state, {payload}) => {
      console.log(payload)
      state.isLoading = false
    })
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
} = contentSlice.actions;

export default contentSlice.reducer;
