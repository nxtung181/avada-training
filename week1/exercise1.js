const [users, posts, comments] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json()),
]);
// BÀI 3
const postToUserMap = {};
const postsByUserId = posts.reduce((acc, post) => {
    if (!acc[post.userId]) acc[post.userId] = []
    acc[post.userId].push(post)
    postToUserMap[post.id] = post.userId;
    return acc
}, {})

const commentsByUser = comments.reduce((acc, comment) => {
    const userId = postToUserMap[comment.postId]
    if (!acc[userId]) acc[userId] = []
    acc[userId].push(comment)
    return acc
}, {})

const userWithData = users.map(user => ({
    ...user,
    posts: postsByUserId[user.id],
    comments: commentsByUser[user.id]
}))

//4: Filter only users with more than 3 comments.

const getUsersHaveMoreThan3Comments = userWithData.filter(user => {
    const totalComments = user.comments.length
    return totalComments > 3
})


//5: Reformat the data with the count of comments and posts
const getUserWithTotalPostsAndComments = userWithData.map(user => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        commentCount: user.comments.length,
        postsCount: user.posts.length
    }
})

//6: Who is the user with the most comments/posts?
const maxPosts = Math.max(...getUserWithTotalPostsAndComments.map(user => user.postsCount))
const getUsersWithMostPost = getUserWithTotalPostsAndComments.filter(user => user.postsCount === maxPosts)
console.log(getUsersWithMostPost)


//7: Sort the list of users by the postsCount value descending
const getUserWithDescendingPost = [...getUserWithTotalPostsAndComments].sort((a, b) => b.postsCount - a.postsCount)

//8 
const [post, postComments] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then(res => res.json()),
]);
const postWithComments = { ...post, comments: postComments };