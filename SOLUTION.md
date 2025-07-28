# Steps

1. Show the list of posts hardcoded
2. Add the buttons to vote (+ and -)
3. Trigger actions when clicking the buttons

4. Create the store (RTK)
5. Add post slice (id, votes)
6. Action (reducer-ish) upvoting and downvoting

7. Create a thunk to load the posts async
   - Add the extraReducer depending on the request status to update the posts
   - Use the fetchPostsThunk only once to load the posts in the app

Nice to have
- Add new post feature (!!!)
- Simulate fetch an use RTK Query
- Keep the store state when refreshing
- Track users available posts (if a user create a posts, reduce the available amount)
- Order by votes feature
