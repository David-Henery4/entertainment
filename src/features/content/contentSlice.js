import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//  http://localhost:3006/content (JSON SERVER CALL)

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
  isError: null,
  isSuccess: false,
};

export const getContent = createAsyncThunk("content/getContent", async () => {
  try {
    const res = await axios.get("http://localhost:3006/content");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});
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
//
export const getMovies = createAsyncThunk("content/getMovies", async () => {
  try {
    const res = await axios.get("http://localhost:3006/content?category=Movie");
    return res.data;
  } catch (error) {
    return error;
  }
});
//
export const getTV = createAsyncThunk("content/getTV", async () => {
  try {
    const res = await axios.get(
      "http://localhost:3006/content?category=TV+Series"
    );
    return res.data;
  } catch (error) {
    return error;
  }
});

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
      console.log(res.data)
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
      const res = await axios.post("http://localhost:3006/login");
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

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
  extraReducers: (builder) => {
    // GET ALL DATA
    builder.addCase(getContent.fulfilled, (state, { payload }) => {
      state.allContentData = payload;
      const trendingData = payload.filter((item) => item.isTrending);
      state.trendingContent = trendingData;
      state.isLoading = false;
    });
    builder.addCase(getContent.rejected, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
    });
    builder.addCase(getContent.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    // GET MOVIE DATA
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.moviesData = payload;
    });
    builder.addCase(getMovies.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    });
    // GET TV DATA
    builder.addCase(getTV.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tvSeriesData = payload;
    });
    builder.addCase(getTV.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getTV.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    });
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
    // AUTH USER LOGIN
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      console.log(payload);
    });
    // AUTH USER SIGNUP
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(signUpUser.pending, (state, { payload }) => {
      console.log(payload);
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
} = contentSlice.actions;

export default contentSlice.reducer;
