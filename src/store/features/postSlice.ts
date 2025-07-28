import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
// import { POSTS } from "../../sampleData";
import type { RootState } from "../store";
import { createAppAsyncThunk } from "../hooks";
import { getAllPosts } from "../../services/postsService";

// We should set this async with thunk
export const fetchPosts = createAppAsyncThunk("posts/fetchPosts", async () => {
    const data = await getAllPosts();
    return data;
});

interface PostsState {
    posts: Post[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

export interface Post {
    id: string;
    title: string;
    likes: number;
}

const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: null,
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

            targetPost.likes += 1;
            // return {
            //   posts: [...state.posts, targetPost],
            // };
        },
        downvote: (state, action: PayloadAction<Pick<Post, "id">>) => {
            const targetPost = state.posts.find(
                (el) => el.id === action.payload.id
            );
            if (!targetPost) return state;

            targetPost.likes -= 1;
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
                        likes: 0,
                    },
                };
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "pending";
                // return { ...state, status: "pending" };
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts.push(...action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Unknown Error";
            });
    },
});

export const { downvote, upvote, createPost } = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postSlice.reducer;
