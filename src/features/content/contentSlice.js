import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//  http://localhost:3006/content (JSON SERVER CALL)

const initialState = {
  contentData: [],
  isLoading: false,
};

const getData = async () => {
  const res = await axios.get("http://localhost:3006/content");
  console.log(res.data);
};
// getData()

export const getContent = createAsyncThunk("content/getContent", async () => {
  const res = await axios.get("http://localhost:3006/content");
  console.log(res.data);
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: {
    [getContent.pending]: (state) => {},
    [getContent.rejected]: (state) => {},
    [getContent.fulfilled]: (state) => {},
  },
});

// FOR WHEN WE HAVE ACTIONS
// export const {} = contentSlice.actions

export default contentSlice.reducer;
