const btn = document.getElementById('start');
const out = document.getElementById('output');

function getUser(id, cb) {
  console.log('Calling getUser with id:', id);
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => {
      console.log('getUser response status:', r.status);
      return r.json();
    })
    .then(data => {
      console.log('getUser data:', data);
      cb(null, data);
    })
    .catch(err => {
      console.error('getUser error:', err);
      cb(err);
    });
}

function getPosts(userId, cb) {
  console.log('Calling getPosts for userId:', userId);
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(r => {
      console.log('getPosts response status:', r.status);
      return r.json();
    })
    .then(data => {
      console.log('getPosts data:', data);
      cb(null, data);
    })
    .catch(err => {
      console.error('getPosts error:', err);
      cb(err);
    });
}

function getComments(postId, cb) {
  console.log('Calling getComments for postId:', postId);
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(r => {
      console.log('getComments response status:', r.status);
      return r.json();
    })
    .then(data => {
      console.log('getComments data:', data);
      cb(null, data);
    })
    .catch(err => {
      console.error('getComments error:', err);
      cb(err);
    });
}

btn.addEventListener('click', () => {
  console.log('Start button clicked');
  out.textContent = 'Loading user...\n';

  getUser(1, (err, user) => {
    if (err) {
      console.log('Error in getUser');
      out.textContent += 'Error loading user\n';
      return;
    }
    console.log('User loaded:', user);
    out.textContent += `User: ${user.name}\nFetching posts...\n`;

    getPosts(user.id, (err2, posts) => {
      if (err2) {
        console.log('Error in getPosts');
        out.textContent += 'Error loading posts\n';
        return;
      }
      console.log('Posts loaded:', posts);
      out.textContent += `Found ${posts.length} posts. Fetching comments for first post...\n`;

      getComments(posts[0].id, (err3, comments) => {
        if (err3) {
          console.log('Error in getComments');
          out.textContent += 'Error loading comments\n';
          return;
        }
        console.log('Comments loaded:', comments);
        out.textContent += `Post ${posts[0].id} has ${comments.length} comments:\n`;
        comments.slice(0, 3).forEach(c => {
          console.log('Rendering comment:', c);
          out.textContent += `- ${c.name}: ${c.body}\n`;
        });
      });
    });
  });
});
