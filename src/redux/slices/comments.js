import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils";

export const fetchComment = createAsyncThunk(
    "comments/fetchComment",

    async (params) => {
        const { data } = await axios.post("/comments", params);
                
        return data
    }

);


export const fetchAllComments = createAsyncThunk(
    "comments/fetchAllComments",
  
    async () => {
      const { data } = await axios.get("/comments");
  
      return data;
    }
  );


const initialState = {
    comment: [],
    status: "loading",
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComment.pending, (state) => {
            state.comment = null;
            state.status = "loading";
        });
        builder.addCase(fetchComment.fulfilled, (state, action) => {
            state.comment = action.meta.arg;
            state.status = "load";
        });
        builder.addCase(fetchComment.rejected, (state) => {
            state.comment= null;
            state.status = "error";
        });

        builder.addCase(fetchAllComments.pending, (state) => {
            state.comment = null;
            state.status = "loading";
        });
        builder.addCase(fetchAllComments.fulfilled, (state, action) => {
            state.comment = action.payload;
            state.status = "load";
        });
        builder.addCase(fetchAllComments.rejected, (state) => {
            state.comment= null;
            state.status = "error";
        });
    },
});

export const { } = commentSlice.actions;

export default commentSlice.reducer;
