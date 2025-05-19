const btn = document.getElementById('load');
const out = document.getElementById('output');

function getUser(id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => r.json());
}

function getUserPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(r => r.json());
}

function getPostComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(r => r.json());
}

async function loadUserFeed(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getUserPosts(userId);
    const comments = await getPostComments(posts[0].id);
    return { user, posts, comments };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

btn.addEventListener('click', () => {
  out.textContent = 'Loading feed...\n';
  loadUserFeed(1)
    .then(data => {
      out.textContent += `User: ${data.user.name}\n`;
      out.textContent += `Total posts: ${data.posts.length}\n`;
      out.textContent += `Comments on first post: ${data.comments.length}\n`;
    })
    .catch(() => out.textContent += 'Error loading feed\n');
});
