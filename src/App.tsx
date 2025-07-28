import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import {
    createPost,
    fetchPosts,
    selectPosts,
    selectPostsStatus,
} from "./store/features/postSlice";
import { useTypedDispatch, useTypedSelector } from "./store/hooks";
import { PostList } from "./components/PostList";

function App() {
    const dispatch = useTypedDispatch();
    const posts = useTypedSelector(selectPosts);
    const fetchPostsStatus = useTypedSelector(selectPostsStatus);
    const [newPostTitle, setNewPostTitle] = useState("");

    useEffect(() => {
        if (fetchPostsStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [fetchPostsStatus, dispatch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newPostTitle) return;

        dispatch(createPost({ title: newPostTitle }));
    };

    return (
        <div className="app">
            {fetchPostsStatus === "pending" ? (
                <p>Loading...</p>
            ) : (
                <PostList posts={posts} />
            )}

            <form onSubmit={handleSubmit}>
                <input
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    type="text"
                    name="title"
                />
                <button className="btn-primary">Create Post</button>
            </form>
        </div>
    );
}

export default App;
