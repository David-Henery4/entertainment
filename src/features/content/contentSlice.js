import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//  http://localhost:3006/content (JSON SERVER CALL)

const initialState = {
  allContentData: [],
  moviesData: [],
  tvSeriesData: [],
  bookmarkedContent: [],
  trendingContent: [],
  isLoading: false,
};

// const getData = async () => {
//   const res = await axios.get("http://localhost:3006/content");
//   console.log(res.data);
// };
// getData()

export const getContent = createAsyncThunk("content/getContent", async () => {
  try {
    const res = await axios.get("http://localhost:3006/content");
    // console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
});

export const getMovies = createAsyncThunk("content/getMovies", async () => {
  try {
    const res = await axios.get("http://localhost:3006/content?category=Movie");
    return res.data
  } catch (error) {
    return error
  }
})

export const getTV = createAsyncThunk("content/getTV", async () => {
  try {
    const res = await axios.get(
      "http://localhost:3006/content?category=TV+Series"
    );
    return res.data
  } catch (error) {
    return error
  }
})

// getContent()

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL DATA
    builder.addCase(getContent.fulfilled, (state, {payload}) => {
      state.allContentData = payload
      const trendingData = payload.filter(item => item.isTrending)
      state.trendingContent = trendingData
      state.isLoading = false
    })
    builder.addCase(getContent.rejected, (state, {payload}) => {
      console.log(payload)
      state.isLoading = false
    })
    builder.addCase(getContent.pending, (state, {payload}) => {
      state.isLoading = true
    })
    // GET MOVIE DATA
    builder.addCase(getMovies.fulfilled, (state, {payload}) => {
      state.isLoading = false
      state.moviesData = payload
    })
    builder.addCase(getMovies.pending, (state, { payload }) => {
      state.isLoading = true
    });
    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
    });
    // GET TV DATA
    builder.addCase(getTV.fulfilled, (state, {payload}) => {
      state.isLoading = false
      state.tvSeriesData = payload
      console.log(payload)
    })
    builder.addCase(getTV.pending, (state, {payload}) => {
      state.isLoading = true
    })
    builder.addCase(getTV.rejected, (state, {payload}) => {
      state.isLoading = false
      console.log(payload)
    })
  }
});

// FOR WHEN WE HAVE ACTIONS
export const {} = contentSlice.actions

export default contentSlice.reducer;
