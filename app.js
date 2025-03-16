const http = require('http');

const hostname = 'localhost'; // Change this from '192.0.0.1' to 'localhost'
const port = 9090;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, my name is Karthik Raj and my roll number is 2022BCD0041\n');
});
res.end('This is DevOps Assignment 2 with Jenkins and SonarQube Pipelining\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
