import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contentData: []
}

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {

  }
})

// FOR WHEN WE HAVE ACTIONS
// export const {} = contentSlice.actions

export default contentSlice.reducer

