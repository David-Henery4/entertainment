import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//  http://localhost:3006/content (JSON SERVER CALL)

const initialState = {
  allContentData: [],
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

// getContent()

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContent.fulfilled, (state, {payload}) => {
      state.allContentData = payload
      state.isLoading = false
    })
    builder.addCase(getContent.rejected, (state, {payload}) => {
      console.log(payload)
      state.isLoading = false
    })
    builder.addCase(getContent.pending, (state, {payload}) => {
      state.isLoading = true
    })
  }
});

// FOR WHEN WE HAVE ACTIONS
export const {} = contentSlice.actions

export default contentSlice.reducer;
