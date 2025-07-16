import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { POSTS } from "../../sampleData";
import type { RootState } from "../store";

// We should set this async with thunk

interface PostsState {
  posts: {
    id: number;
    title: string;
    votes: number;
  }[];
}

const initialState: PostsState = {
  posts: POSTS,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    upvote: (state, action: PayloadAction<{ id: number }>) => {
      const targetPost = state.posts.find((el) => el.id === action.payload.id);
      if (!targetPost) return state;

      targetPost.votes += 1;
      // return {
      //   posts: [...state.posts, targetPost],
      // };
    },
    downvote: (state, action: PayloadAction<{ id: number }>) => {
      const targetPost = state.posts.find((el) => el.id === action.payload.id);
      if (!targetPost) return state;

      targetPost.votes -= 1;
      // return {
      //   posts: [...state.posts, targetPost],
      // };
    },
    createPost: (state, action: PayloadAction<{ title: string }>) => {
      const nextId = state.posts.length + 1;
      state.posts.push({ id: nextId, title: action.payload.title, votes: 0 });
    },
  },
});

export const { downvote, upvote, createPost } = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
