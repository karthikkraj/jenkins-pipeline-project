// app.js
const http = require('http');

const hostname = 'localhost';
const port = 9090;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, I am Karthik Raj, and my roll number is 2022BCD0041\n' +
          'I have completed the DevOps pipeline assignment, which includes integrating Git, SonarQube, Docker, and deployment.');
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
