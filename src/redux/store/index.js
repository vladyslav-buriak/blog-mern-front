import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slices/posts";
import authReducer from "../slices/auth";
import commentReducer from "../slices/comments";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth:authReducer,
    comment:commentReducer
  },

});
