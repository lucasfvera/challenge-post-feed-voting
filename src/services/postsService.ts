import type { Post } from "../store/features/postSlice";

const BASE_URL = "http://localhost:8080/";

export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const response = await fetch(`${BASE_URL}posts`);
        if (!response.ok) {
            throw new Error("Error fetching all posts");
        }
        const data = await response.json();
        return data.data;
    } catch (e) {
        console.error(e);
        throw new Error("Error fetching");
    }
};

// TODO: Work on this service
class _PostsService {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    get allPosts() {
        return getAllPosts();
    }
}
