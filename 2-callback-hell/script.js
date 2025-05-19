const btn = document.getElementById('start');
const out = document.getElementById('output');

function getUser(id, cb) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => r.json())
    .then(data => cb(null, data))
    .catch(err => cb(err));
}

function getPosts(userId, cb) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(r => r.json())
    .then(data => cb(null, data))
    .catch(err => cb(err));
}

function getComments(postId, cb) {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(r => r.json())
    .then(data => cb(null, data))
    .catch(err => cb(err));
}

btn.addEventListener('click', () => {
  out.textContent = 'Loading user...\n';

  getUser(2, (err, user) => {
    if (err) return out.textContent += 'User error\n';
    out.textContent += `User: ${user.name}\nFetching posts...\n`;

    getPosts(user.id, (err2, posts) => {
      if (err2) return out.textContent += 'Posts error\n';
      out.textContent += `Found ${posts.length} posts. Fetching comments for first post...\n`;

      getComments(posts[0].id, (err3, comments) => {
        if (err3) return out.textContent += 'Comments error\n';
        out.textContent += `Post ${posts[0].id} has ${comments.length} comments:\n`;
        comments.slice(0, 3).forEach(c =>
          out.textContent += `- ${c.name}: ${c.body}\n`
        );
      });
    });
  });
});
