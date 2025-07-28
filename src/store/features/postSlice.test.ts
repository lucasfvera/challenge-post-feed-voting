import { describe, expect, test } from "vitest";
import reducer, { downvote, initialState, upvote } from "./postSlice";

describe("Post entity reducers", () => {
    test("Loads the initial state", () => {
        const newState = reducer(undefined, { type: "unknown" });

        expect(newState).toEqual(initialState);
    });

    test("Handles down voting a post", () => {
        const prevState: typeof initialState = {
            posts: [
                {
                    id: "test-1",
                    likes: 1,
                    title: "test post",
                },
            ],
            status: "succeeded",
            error: null,
        };

        const newState = reducer(prevState, downvote({ id: "test-1" }));
        const expectedState: typeof initialState = {
            posts: [
                {
                    id: "test-1",
                    likes: 0,
                    title: "test post",
                },
            ],
            status: "succeeded",
            error: null,
        };

        expect(newState).toEqual(expectedState);
    });

    test("Handles up voting a post", () => {
        const prevState: typeof initialState = {
            posts: [
                {
                    id: "test-1",
                    likes: 1,
                    title: "test post",
                },
            ],
            status: "succeeded",
            error: null,
        };

        const newState = reducer(prevState, upvote({ id: "test-1" }));
        const expectedState: typeof initialState = {
            posts: [
                {
                    id: "test-1",
                    likes: 2,
                    title: "test post",
                },
            ],
            status: "succeeded",
            error: null,
        };

        expect(newState).toEqual(expectedState);
    });
});
