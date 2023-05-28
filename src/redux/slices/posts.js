import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",

  async (args) => {

    const options = {
      method: "GET",
      url: "/posts",
      params: args,
    }
    const { data } = await axios.request(options);

    return data;
  }
);

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",

  async () => {
    const { data } = await axios.get("/tags");

    return data;
  }
);

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => axios.delete(`/posts/${id}`)

);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
      state.posts.items = payload;
      state.posts.status = "load";
    });
    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    });
    ///
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, { payload }) => {
      state.tags.items = payload;
      state.tags.status = "load";
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    });

    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(posts => posts._id !== action.meta.arg)

    });
  },
});

export const { } = postsSlice.actions;

export default postsSlice.reducer;
