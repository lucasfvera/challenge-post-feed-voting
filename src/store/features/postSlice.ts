import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { POSTS } from "../../sampleData";
import type { RootState } from "../store";

// We should set this async with thunk

interface PostsState {
    posts: Post[];
}

interface Post {
    id: string;
    title: string;
    votes: number;
}

const initialState: PostsState = {
    posts: POSTS,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        upvote: (state, action: PayloadAction<Pick<Post, "id">>) => {
            const targetPost = state.posts.find(
                (el) => el.id === action.payload.id
            );
            if (!targetPost) return state;

            targetPost.votes += 1;
            // return {
            //   posts: [...state.posts, targetPost],
            // };
        },
        downvote: (state, action: PayloadAction<Pick<Post, "id">>) => {
            const targetPost = state.posts.find(
                (el) => el.id === action.payload.id
            );
            if (!targetPost) return state;

            targetPost.votes -= 1;
            // return {
            //   posts: [...state.posts, targetPost],
            // };
        },
        createPost: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts.push(action.payload);
            },
            prepare: (payload: Pick<Post, "title">) => {
                const postId = nanoid();
                return {
                    payload: {
                        id: postId,
                        title: payload.title,
                        votes: 0,
                    },
                };
            },
        },
    },
});

export const { downvote, upvote, createPost } = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
