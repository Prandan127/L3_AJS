const https = require('https');

function getPostsCB(callback) {
  https.get('https://jsonplaceholder.typicode.com/posts', (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    response.on('end', () => {
      try {
        const posts = JSON.parse(data);
        const sorted = posts.sort((a, b) => b.title.length - a.title.length);
        callback(null, sorted);
      } catch (error) {
        callback(error, null);
      }
    });
    
  }).on('error', (error) => {
    callback(error, null);
  });
}

function getCommentsCB(callback) {
  https.get('https://jsonplaceholder.typicode.com/comments', (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    response.on('end', () => {
      try {
        const comments = JSON.parse(data);
        const sorted = comments.sort((a, b) => a.name.localeCompare(b.name));
        callback(null, sorted);
      } catch (error) {
        callback(error, null);
      }
    });
    
  }).on('error', (error) => {
    callback(error, null);
  });
}

function getUsersPromise() {
  return new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/users', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const users = JSON.parse(data);
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
      });
      
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function getTodosPromise() {
  return new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/todos', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const todos = JSON.parse(data);
          const result = todos.filter(todo => !todo.completed);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function getPostsAsync() {
  const data = await new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/posts', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
      
    }).on('error', reject);
  });
  
  return data.sort((a, b) => b.title.length - a.title.length);
}

async function getCommentsAsync() {
  const data = await new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/comments', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
      
    }).on('error', reject);
  });
  
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

async function getUsersAsync() {
  const users = await new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/users', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
      
    }).on('error', reject);
  });
  
  return users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone
  }));
}

async function getTodosAsync() {
  const todos = await new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/todos', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
      
    }).on('error', reject);
  });
  
  return todos.filter(todo => !todo.completed);
}