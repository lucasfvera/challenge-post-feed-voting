import { downvote, upvote, type Post } from "../store/features/postSlice";
import { useTypedDispatch } from "../store/hooks";

interface PostListProps {
    posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
    const dispatch = useTypedDispatch();

    return posts.map((post) => (
        <div className={"post-card"} key={post.id}>
            <p>{post.title}</p>
            <p>{post.likes}</p>
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
    ));
};
