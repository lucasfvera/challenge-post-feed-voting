import { useState, type FormEvent } from "react";
import "./App.css";
import {
    createPost,
    downvote,
    selectPosts,
    upvote,
} from "./store/features/postSlice";
import { useTypedDispatch, useTypedSelector } from "./store/hooks";

function App() {
    const dispatch = useTypedDispatch();
    const { posts } = useTypedSelector(selectPosts);
    const [newPostTitle, setNewPostTitle] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newPostTitle) return;

        dispatch(createPost({ title: newPostTitle }));
    };

    return (
        <div className="app">
            {posts.map((post) => (
                <div className={"post-card"} key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.votes}</p>
                    <div className="actions">
                        <button
                            onClick={() => dispatch(upvote({ id: post.id }))}
                            className="btn-primary"
                        >
                            + upvote
                        </button>
                        <button
                            onClick={() => dispatch(downvote({ id: post.id }))}
                            className="btn-primary"
                        >
                            - downvote
                        </button>
                    </div>
                </div>
            ))}

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
