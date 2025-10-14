function getPostsCB(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        const posts = JSON.parse(xhr.responseText);
        const sorted = posts.sort((a, b) => b.title.length - a.title.length);
        callback(null, sorted);
      } catch (error) {
        callback(error, null);
      }
    } else {
      callback(new Error('Request failed'), null);
    }
  };
  xhr.onerror = function() {
    callback(new Error('Request error'), null);
  };
  xhr.send();
}

function getCommentsCB(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments');
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        const comments = JSON.parse(xhr.responseText);
        const sorted = comments.sort((a, b) => a.name.localeCompare(b.name));
        callback(null, sorted);
      } catch (error) {
        callback(error, null);
      }
    } else {
      callback(new Error('Request failed'), null);
    }
  };
  xhr.onerror = function() {
    callback(new Error('Request error'), null);
  };
  xhr.send();
}

function getUsersPromise() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          const users = JSON.parse(xhr.responseText);
          const result = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
          }));
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Request failed'));
      }
    };
    xhr.onerror = function() {
      reject(new Error('Request error'));
    };
    xhr.send();
  });
}

function getTodosPromise() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          const todos = JSON.parse(xhr.responseText);
          const result = todos.filter(todo => !todo.completed);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Request failed'));
      }
    };
    xhr.onerror = function() {
      reject(new Error('Request error'));
    };
    xhr.send();
  });
}

async function getPostsAsync() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.sort((a, b) => b.title.length - a.title.length);
}

async function getCommentsAsync() {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data = await response.json();
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

async function getUsersAsync() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone
  }));
}

async function getTodosAsync() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  return todos.filter(todo => !todo.completed);
}