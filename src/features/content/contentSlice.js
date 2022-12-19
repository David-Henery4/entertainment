import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import checkingBookmarks from "../../checkingForUserBookmarks/checkingBookmarks";
import {allContentWithBookmarks, allMoviesWithBookmarks, allTvAndBookmarks, allUserBookmarks, login, signup, updateBookmarks} from "../callbacks";


const initialState = {
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
  isError: false,
  isLoginError: false,
  isSignupError: false,
  isSuccess: false,
};

//***API**CALLS****//

// All Content with bookmarks 
export const getContentWithUpdatedBookmarks = createAsyncThunk(
  "content/getContentWithUpdatedBookmarks", allContentWithBookmarks
);

// All movies with bookmarks
export const getMoviesWithUpdatedBookmarks = createAsyncThunk(
  "content/getMoviesWithUpdatedBookmarks", allMoviesWithBookmarks
);

// ALL TV with bookmarks
export const getTvWithUpdatedBookmarks = createAsyncThunk(
  "content/getTvWithUpdatedBookmarks", allTvAndBookmarks
);

// Get users bookmarks
export const getUserBookmarks = createAsyncThunk(
  "content/getUserBookmarks", allUserBookmarks
);

// SIGNUP USERS
export const signUpUser = createAsyncThunk(
  "content/signUpUser", signup
);

// LOGIN USERS
export const loginUser = createAsyncThunk(
  "content/loginUser", login
);

// UPDATE USERS BOOKMARK INFO
export const updateUserBookmarks = createAsyncThunk(
  "content/updateUserBookmarks", updateBookmarks
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
    signoutUser: (state, { payload }) => {
      state.userInfo = null;
      state.userToken = null;
    },
    resetIsError: (state, { payload }) => {
      state.isError = false;
    },
  },
  // EXTRA REDUCERS / API THUNK REDUCERS
  extraReducers: (builder) => {

    // AUTH USER LOGIN
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.userToken = accessToken;
      state.userInfo = user;
      state.isLoading = false;
      state.isLoginError = false;
      state.isSignupError = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isLoginError = true;
      state.isSignupError = false;
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isLoginError = false;
      state.isSignupError = false;
    });
    
    // AUTH USER SIGNUP
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.userToken = accessToken;
      state.userInfo = user;
      state.isLoading = false;
      state.isSignupError = false;
      state.isLoginError = false;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSignupError = true;
      state.isLoginError = false;
    });
    builder.addCase(signUpUser.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSignupError = false;
      state.isLoginError = false;
    });

    // UPDATE USER BOOKMARKS
    builder.addCase(updateUserBookmarks.rejected, (state, { payload }) => {
      state.isError = true;
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
        state.isError = false
      }
    );
    builder.addCase(
      getContentWithUpdatedBookmarks.pending,
      (state, { payload }) => {
        state.isLoading = true;
        state.isError = false
      }
    );
    builder.addCase(
      getContentWithUpdatedBookmarks.rejected,
      (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      }
    );

    // TESING INITIAL FETCH TO GET ALL MOVIES & USER BOOKMARKS
    builder.addCase(
      getMoviesWithUpdatedBookmarks.fulfilled,
      (state, { payload }) => {
        const checkingForBookmarks = checkingBookmarks(payload);
        state.moviesData = checkingForBookmarks;
        state.isLoading = false;
        state.isError = false
      }
    );
    builder.addCase(
      getMoviesWithUpdatedBookmarks.pending,
      (state, { payload }) => {
        state.isLoading = true;
        state.isError = false
      }
    );
    builder.addCase(
      getMoviesWithUpdatedBookmarks.rejected,
      (state, { payload }) => {
        state.isError = true;
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
        state.isError = false
      }
    );
    builder.addCase(getTvWithUpdatedBookmarks.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getTvWithUpdatedBookmarks.rejected,
      (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
      }
    );
    
    // TESING INITIAL FETCH TO GET ALL USER BOOKMARKS
    builder.addCase(getUserBookmarks.fulfilled, (state, { payload }) => {
      state.bookmarkedContent = payload[0].bookmarks;
    });
    builder.addCase(getUserBookmarks.rejected, (state, { payload }) => {
      state.isError = true;
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
  resetIsError,
} = contentSlice.actions;

export default contentSlice.reducer;
