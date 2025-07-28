import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/postSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
